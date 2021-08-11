import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableNativeFeedback,
  View,
} from 'react-native';
// import ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import {Text} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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

const FormKelasKamar = ({navigation}) => {
  const scrollRef = useRef();
  const refHarga = useRef();
  const refKapasitas = useRef();
  const dataRedux = useSelector((state) => state.AuthReducer);

  const [inputList, setInputList] = useState([{nama: '', error: ''}]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [errorMsg, seterrorMsg] = useState({
    nama: '',
    harga: '',
    kapasitas: '',
    foto: '',
    deskripsi: '',
  });
  const [dataFoto, setDataFoto] = useState({
    isUploaded: false,
    uri: '',
    type: '',
    data: '',
  });
  const [fotoKamar, setfotoKamar] = useState({
    isUploaded: false,
    base64: null,
    path: null,
  });

  const [kamar, setKamar] = useState({
    nama: '',
    harga: 0,
    kapasitas: 1,
    fasilitas: inputList,
    id_kost: dataRedux.user.kostku,
    deskripsi: '',
  });
  const [formatHarga, setformatHarga] = useState(
    formatRupiah(kamar.harga.toString(), 'Rp. '),
  );

  // useEffect(() => {
  //   if (dataFoto.data != '') {
  //     let image = 'data:' + dataFoto.type + ';base64,' + dataFoto.data;
  //     setForm('foto', image);
  //   }
  // }, [dataFoto]);

  useEffect(() => {
    setKamar({...kamar, fasilitas: inputList});
  }, [inputList]);

  // const pickImage = async () => {
  //   setIsPressed(true);
  //   await Permission.requestMultiple([
  //     PERMISSION_TYPE.photo,
  //     PERMISSION_TYPE.camera,
  //   ]);
  //   ImagePicker.launchImageLibrary(
  //     {mediaType: 'photo', base64: true},
  //     (response) => {
  //       if (response.didCancel) {
  //         console.log('User cancelled image picker');
  //         setIsPressed(false);
  //       } else if (response.error) {
  //         console.log('ImagePicker Error: ', response.error);
  //         setIsPressed(false);
  //       } else if (response.customButton) {
  //         console.log('User tapped custom button: ', response.customButton);
  //         setIsPressed(false);
  //       } else {
  //         setDataFoto({
  //           ...dataFoto,
  //           isUploaded: true,
  //           uri: response.uri,
  //           type: response.type,
  //           data: response.data,
  //         });
  //         setIsPressed(false);
  //       }
  //     },
  //   );
  // };

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

  useEffect(() => {
    setForm('harga', rupiahToInt(formatHarga));
  }, [formatHarga]);

  const handleInputChange = (e, index, inputType) => {
    const list = [...inputList];
    list[index][inputType] = e;
    setInputList(list);
  };

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, {nama: '', error: ''}]);
  };

  const addData = () => {
    setIsSubmit(true);
    inputList.forEach((x, i) => {
      x.error = '';
    });
    axios
      .post(
        APIUrl + '/api/class',
        {...kamar, foto: fotoKamar.base64},
        {
          headers: {
            Authorization: `Bearer ${dataRedux.token}`,
          },
        },
      )
      .then((res) => {
        if (res.data.success) {
          navigation.pop(1);
        } else {
          inputList.forEach((x, i) => {
            let nameError = 'fasilitas.' + i + '.nama';
            if (res.data.errors[nameError] != undefined) {
              // handleInputChange;
              handleInputChange(res.data.errors[nameError][0], i, 'error');
            }
          });

          seterrorMsg({
            nama: res.data.errors.nama ? res.data.errors.nama : '',
            harga: res.data.errors.harga ? res.data.errors.harga : '',
            foto: res.data.errors.foto ? res.data.errors.foto : '',
            deskripsi: res.data.errors.deskripsi
              ? res.data.errors.deskripsi
              : '',
            kapasitas: res.data.errors.kapasitas
              ? res.data.errors.kapasitas
              : '',
          });
          goToTop();
          setIsSubmit(false);
        }
      })
      .catch((error) => {
        alert('errror');
        console.log(kamar);
        console.log(inputList);
        setIsSubmit(false);
        // console.log(error);
      });
  };

  const setForm = (inputType, value) => {
    setKamar({
      ...kamar,
      [inputType]: value,
    });
  };

  const goToTop = () => {
    scrollRef.current.scrollTo({x: 0, y: 0, animated: true});
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Spinner
        visible={isSubmit}
        textContent={'Tunggu Sebentar'}
        textStyle={{color: '#FFF'}}
      />
      <HeaderPage title="Tambah Kelas" />

      {/* Content Section  */}
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{paddingBottom: 25}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.buttonUpload}>
          {/* UPLOAD IMAGE SECTION */}
          <TouchableNativeFeedback
            disabled={isPressed}
            onPress={() => pickImage()}>
            {fotoKamar.isUploaded != true ? (
              <View style={styles.blankImage}>
                <MaterialCommunityIcons
                  name="camera-plus"
                  size={30}
                  color={'#fff'}
                />
              </View>
            ) : (
              <Image
                source={{
                  uri: fotoKamar.path,
                }}
                style={styles.imageUploaded}
                resizeMode="cover"
              />
            )}
          </TouchableNativeFeedback>
          {errorMsg.foto != '' && (
            <Text
              style={[styles.textError, {textAlign: 'center', marginTop: 5}]}>
              Foto Kamar Perlu Diupload
            </Text>
            //
          )}
        </View>
        {/* <Text>{JSON.stringify(kamar)}</Text> */}

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
              if (value.length < 1) {
                setForm('kapasitas', 1);
              } else {
                setForm('kapasitas', parseInt(value));
              }
              //
            }}
            value={kamar.kapasitas.toString()}
            pesanError={errorMsg.kapasitas}
          />

          <View style={styles.fasilitasTitleWrapper}>
            <View
              style={{
                width: 30,
                alignItems: 'center',
                marginLeft: 0.05 * screenWidth,
              }}>
              <MaterialIcons
                name="room-service"
                color={myColor.fbtx}
                size={20}
              />
            </View>

            <Text style={styles.titleFasilitas}>Fasilitas</Text>
          </View>

          {inputList.map((x, i) => {
            return (
              <View style={styles.wrapperItemFasilitas} key={i}>
                <View style={styles.fieldFasilitas}>
                  <View
                    style={{
                      width: 30,
                      alignItems: 'center',
                    }}>
                    <Text style={styles.normalText}>{i + 1}</Text>
                  </View>

                  <TextInput
                    placeholder={'Fasilitas ' + String(i + 1)}
                    onChangeText={(e) => {
                      handleInputChange(e, i, 'nama');
                    }}
                    style={styles.inputItem}
                    value={x.nama}
                  />

                  {inputList.length !== 1 && (
                    <TouchableNativeFeedback
                      onPress={() => handleRemoveClick(i)}>
                      <View style={styles.deleteItem}>
                        <MaterialIcons
                          name="cancel"
                          color={myColor.alert}
                          size={25}
                        />
                      </View>
                    </TouchableNativeFeedback>
                  )}
                </View>
                {x.error != '' ? (
                  <Text style={[styles.textError, {marginLeft: 30}]}>
                    {x.error}
                  </Text>
                ) : null}
              </View>
            );
          })}

          <TouchableNativeFeedback onPress={() => handleAddClick()}>
            <View style={styles.btAddFasilitas}>
              <Text style={styles.textAddFasilitas}>Tambah Fasilitas</Text>
            </View>
          </TouchableNativeFeedback>

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
                    onPress: () => setIsSubmit(false),
                    style: 'cancel',
                  },
                  {text: 'Ya', onPress: () => addData()},
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

export default FormKelasKamar;

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
    backgroundColor: myColor.divider,
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
