import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableNativeFeedback,
  View,
} from 'react-native';
// import ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import {Text} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import {Permission, PERMISSION_TYPE} from '../../AppPermission';
import {HeaderPage, TextFormField} from '../../components';
import {
  APIUrl,
  formatRupiah,
  myColor,
  rupiahToInt,
  screenWidth,
} from '../../function/MyVar';

const EditKelasKamar = ({navigation, route}) => {
  const scrollRef = useRef();
  const refHarga = useRef();
  const refKapasitas = useRef();
  const dataRedux = useSelector((state) => state.AuthReducer);
  const [dataFoto, setDataFoto] = useState({
    isUploaded: false,
    uri: '',
    type: '',
    data: '',
  });

  // const [kamar, setKamar] = useState(route.params.kamar);
  // const [formatHarga, setformatHarga] = useState(
  //   formatRupiah(kamar.harga.toString()),
  // );
  const [kamar, setKamar] = useState(route.params);
  const [formatHarga, setformatHarga] = useState(
    formatRupiah(kamar.harga.toString()),
  );
  // const [inputList, setInputList] = useState(route.params.kamar.fasilitas);
  const [isLoading, setIsLoading] = useState(false);

  // const [invalidFasilitas, setInvalidFasilitas] = useState(true);

  const [errorMsg, seterrorMsg] = useState({
    nama: '',
    harga: '',
    kapasitas: '',
    deskripsi: '',
  });

  const [fotoKamar, setfotoKamar] = useState({
    isUploaded: false,
    base64: null,
    path: null,
  });

  useEffect(() => {
    // setKamar(route.params.kamar);
    // setInputList(route.params.kamar.fasilitas);

    return () => {
      console.log('tutup');
    };
  }, []);

  // useEffect(() => {
  //   console.log('myinputlist');
  //   // if (isChanged === true) {
  //   setKamar({...kamar, fasilitas: inputList});
  //   // cekFasilitas();
  //   // }
  // }, [inputList]);

  useEffect(() => {
    setForm('harga', rupiahToInt(formatHarga));
    // rupiahToInt(formatHarga);
  }, [formatHarga]);

  const pickImage = async () => {
    await Permission.requestMultiple([
      PERMISSION_TYPE.photo,
      PERMISSION_TYPE.camera,
    ]);
    ImagePicker.openPicker({
      width: 720,
      height: 480,
      cropping: true,
      includeBase64: true,
    })
      .then((image) => {
        let base64Temporary = 'data:' + image.mime + ';base64,' + image.data;
        setfotoKamar({
          isUploaded: true,
          base64: base64Temporary,
          path: image.path,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editData = () => {
    setIsLoading(true);
    // if (!invalidFasilitas) {
    let id = kamar.id;

    axios
      .put(
        `${APIUrl}/api/class/${id}`,
        fotoKamar.isUploaded
          ? {
              ...kamar,
              newImg: fotoKamar.base64,
            }
          : kamar,
        {
          headers: {
            Authorization: `Bearer ${dataRedux.token}`,
          },
        },
      )
      .then((res) => {
        console.log(res.data);
        // setIsLoading(false);
        if (res.data.success) {
          navigation.popToTop();
        } else {
          seterrorMsg({
            nama: res.data.errors.nama ? res.data.errors.nama : '',
            harga: res.data.errors.harga ? res.data.errors.harga : '',
            deskripsi: res.data.errors.deskripsi
              ? res.data.errors.deskripsi
              : '',
            kapasitas: res.data.errors.kapasitas
              ? res.data.errors.kapasitas
              : '',
          });
          goToTop();
          setIsLoading(false);
        }

        // navigation.pop(2);

        // navigation.goBack(2);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
    // } else {
    //   setIsLoading(false);
    // }
    // console.log(kamar);

    // let image = 'data:' + dataFoto.type + ';base64,' + dataFoto.data;
  };

  // const cekFasilitas = () => {
  //   let i;
  //   for (i = 0; i < inputList.length; i++) {
  //     if (inputList[i].nama == '') {
  //       return setInvalidFasilitas(true);
  //     }
  //   }
  //   return setInvalidFasilitas(false);
  //   // if (inputList.includes('')) {
  //   //   setInvalidFasilitas(true);
  //   // } else {
  //   //   setInvalidFasilitas(false);
  //   // }
  // };

  const setForm = (inputType, value) => {
    setKamar({
      ...kamar,
      [inputType]: value,
    });
  };

  const goToTop = () => {
    scrollRef.current.scrollToIndex({animated: true, index: 0});
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Spinner
        visible={isLoading}
        textContent={'Tunggu Sebentar'}
        textStyle={{color: '#FFF'}}
      />
      <HeaderPage title="Edit Kelas" />

      {/* Content Section  */}
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{paddingBottom: 25}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.buttonUpload}>
          {/* UPLOAD IMAGE SECTION */}
          <TouchableNativeFeedback
            disabled={isLoading}
            onPress={() => pickImage()}>
            {fotoKamar.isUploaded ? (
              <Image
                source={{
                  uri: fotoKamar.path,
                }}
                style={styles.imageUploaded}
                resizeMode="cover"
              />
            ) : (
              <Image
                source={{
                  uri: APIUrl + '/storage/images/kelas/' + kamar.foto,
                }}
                style={styles.imageUploaded}
                resizeMode="cover"
              />
            )}
          </TouchableNativeFeedback>
        </View>

        <View style={styles.formWrapper}>
          {/* Nama Kamar Section  */}
          <TextFormField
            title="Nama Kamar"
            placeholder="Nama Kamar"
            onChangeText={(v) => {
              setForm('nama', v);
            }}
            onSubmitEditing={() => {
              refHarga.current.focus();
            }}
            blurOnSubmit={false}
            value={kamar.nama}
            pesanError={errorMsg.nama}
          />

          <TextFormField
            title="Harga Kamar"
            ref={refHarga}
            placeholder="Harga Kamar"
            keyboardType="numeric"
            onChangeText={(v) => {
              // setForm('harga', parseInt(v));
              // console.log(v);
              if (v.length < 5) {
                setformatHarga(formatRupiah('0', 'Rp. '));
              } else {
                setformatHarga(formatRupiah(v, 'Rp. '));
              }
            }}
            onSubmitEditing={() => {
              refKapasitas.current.focus();
            }}
            blurOnSubmit={false}
            // value={kamar.harga.toString()}
            value={formatHarga}
            pesanError={errorMsg.harga}
          />

          <TextFormField
            title="Kapasitas Kamar"
            ref={refKapasitas}
            placeholder="Kapasitas kamar"
            keyboardType="number-pad"
            onChangeText={(value) => {
              setForm('kapasitas', parseInt(value));
            }}
            value={kamar.kapasitas.toString()}
            pesanError={errorMsg.kapasitas}
          />

          <TextFormField
            title="Deskripsi Kamar"
            ref={refKapasitas}
            placeholder="Deskripsi kamar"
            multiline={true}
            onChangeText={(value) => {
              setForm('deskripsi', value);
            }}
            value={kamar.deskripsi}
            pesanError={errorMsg.deskripsi}
          />

          <TouchableNativeFeedback
            onPress={() => {
              Alert.alert(
                'Konfirmasi',
                'Apakah anda yakin data yang diisi telah sesuai ?',
                [
                  {
                    text: 'Batal',
                    onPress: () => setIsLoading(false),
                    style: 'cancel',
                  },
                  {text: 'Ya', onPress: () => editData()},
                ],
                {cancelable: false},
              );
            }}>
            <View style={styles.wrapperBtSubmit}>
              <Text style={styles.textBtSubmit}>Submit</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditKelasKamar;
// STYLE SECTION
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  formWrapper: {
    flex: 1,
  },
  textInput: {
    fontSize: 14,
    backgroundColor: 'white',
    marginBottom: 20,
    flex: 1,
    height: 50,
  },
  viewError: {
    marginLeft: 40,
  },
  textError: {
    color: myColor.alert,
    fontSize: 12,
    fontFamily: 'OpenSans-SemiBold',
  },
  fieldWrapper: {marginBottom: 15},
  buttonUpload: {
    alignItems: 'center',
    marginBottom: 10,
  },
  blankImage: {
    width: 0.83 * screenWidth,
    height: (2 / 3) * 0.83 * screenWidth,
    backgroundColor: '#636e72',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 15,
  },
  imageUploaded: {
    height: (2 / 3) * 0.83 * screenWidth,
    width: 0.83 * screenWidth,
    borderRadius: 10,
    marginTop: 15,
  },
  fasilitasTitleWrapper: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 0.02 * screenWidth,
  },
  fasilitasIcon: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleFasilitas: {
    flex: 1,

    fontWeight: 'bold',
    color: myColor.fbtx,
  },
  wrapperAddFasilitas: {},
  btAddFasilitas: {
    height: 30,
    backgroundColor: myColor.addfacility,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginRight: 0.05 * screenWidth,
    marginLeft: 0.07 * screenWidth + 30,
  },
  textAddFasilitas: {color: '#fff', fontWeight: 'bold', fontSize: 14},
  wrapperBtSubmit: {
    borderRadius: 10,
    height: 40,
    width: 0.9 * screenWidth,
    backgroundColor: myColor.myblue,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBtSubmit: {fontSize: 14, fontWeight: 'bold', color: '#fff'},
  wrapperItemFasilitas: {
    marginBottom: 10,
    // marginLeft: 20,
    marginLeft: 0.07 * screenWidth,
    marginRight: 0.05 * screenWidth,
  },
  fieldFasilitas: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  normalText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: myColor.fbtx,
  },
  inputItem: {
    height: 40,
    borderWidth: 1,
    borderColor: myColor.divider,
    borderRadius: 5,
    flex: 1,
    paddingHorizontal: 10,
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
  },
  deleteItem: {
    marginLeft: 5,
    height: 40,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
