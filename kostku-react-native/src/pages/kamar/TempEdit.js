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
import ImagePicker from 'react-native-image-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import {Text} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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
  const [baseFoto, setBaseFoto] = useState('');
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
  const [isSubmit, setIsSubmit] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  // const [invalidFasilitas, setInvalidFasilitas] = useState(true);

  const [errorMsg, seterrorMsg] = useState({
    nama: '',
    harga: '',
    kapasitas: '',
    foto: '',
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

  const handleInputChange = (e, index, inputType) => {
    // const {name, value} = e.target;
    const list = [...inputList];
    // console.log(list[0][inputType]);
    list[index][inputType] = e;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    // setisChanged(true);
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
    reset({...getValues(), ['fasilitas' + String(index + 1)]: ''});
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, {nama: ''}]);
  };

  const pickImage = async () => {
    setIsPressed(true);
    Permission.requestMultiple([PERMISSION_TYPE.photo, PERMISSION_TYPE.camera]);
    ImagePicker.launchImageLibrary(
      {mediaType: 'photo', base64: true},
      (response) => {
        // console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
          setIsPressed(false);
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
          setIsPressed(false);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
          setIsPressed(false);
        } else {
          setDataFoto({
            ...dataFoto,
            isUploaded: true,
            uri: response.uri,
            type: response.type,
            data: response.data,
          });
          setIsPressed(false);
        }
      },
    );
  };

  const editData = () => {
    setIsSubmit(true);
    // if (!invalidFasilitas) {
    let id = kamar.id;

    axios
      .put(
        `${APIUrl}/api/class/${id}`,
        dataFoto.isUploaded
          ? {
              ...kamar,
              newImg: 'data:' + dataFoto.type + ';base64,' + dataFoto.data,
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
        // setIsSubmit(false);
        if (res.data.success) {
          navigation.popToTop();
        } else {
          seterrorMsg({
            nama: res.data.errors.nama ? res.data.errors.nama : '',
            harga: res.data.errors.harga ? res.data.errors.harga : '',
            kapasitas: res.data.errors.kapasitas
              ? res.data.errors.kapasitas
              : '',
          });
          setIsSubmit(false);
        }

        // navigation.pop(2);

        // navigation.goBack(2);
      })
      .catch((error) => {
        setIsSubmit(false);
        console.log(error);
      });
    // } else {
    //   setIsSubmit(false);
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
    scroll.scrollTo({x: 0, y: 0, animated: true});
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
      <HeaderPage title="Edit Kelas" />

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
            {kamar.foto ? (
              <Image
                source={{
                  uri: APIUrl + '/kostdata/kelas_kamar/foto/' + kamar.foto,
                }}
                style={styles.imageUploaded}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.blankImage}>
                <FontAwesome name="upload" color="#fff" size={50} />
              </View>
            )}
          </TouchableNativeFeedback>
        </View>
        {/* <Text>{JSON.stringify(kamar)}</Text> */}
        {/* <Text>{kamar.harga}</Text> */}
        {/* <Button
          title="Press Me"
          onPress={() => {
            console.log('Panjang harga', formatHarga.length);
          }}
        /> */}

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

          {/* <View style={styles.fieldWrapper}>
            <FormFieldIcon
              icon="door-closed"
              placeholder="Nama Kamar"
              onChangeText={(v) => {
                setForm('nama', v);
              }}
              onSubmitEditing={() => {
                refHarga.current.focus();
              }}
              blurOnSubmit={false}
              value={kamar.nama}
            />

            {errorMsg.nama != '' && (
              <View style={styles.viewError}>
                <Text style={styles.textError}>{errorMsg.nama}</Text>
              </View>
            )}
          </View> */}

          {/* Harga Kamar Section  */}
          {/* <View style={styles.fieldWrapper}>
            <FormFieldIcon
              icon="money-bill-alt"
              ref={refHarga}
              placeholder="Harga Kamar"
              keyboardType="numeric"
              onChangeText={(v) => {
                // setForm('harga', parseInt(v));
                // console.log(v);
                if (v.length < 1) {
                  setformatHarga(formatRupiah('0'));
                } else {
                  setformatHarga(formatRupiah(v));
                }
              }}
              onSubmitEditing={() => {
                refKapasitas.current.focus();
              }}
              blurOnSubmit={false}
              // value={kamar.harga.toString()}
              value={formatHarga}
            />

            {errorMsg.harga != '' && (
              <View style={styles.viewError}>
                <Text style={styles.textError}>{errorMsg.harga}</Text>
              </View>
              //
            )}
          </View> */}
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

          {/* Kapasitas Kamar Section  */}
          {/* <View style={styles.fieldWrapper}>
            <FormFieldIcon
            icon="users"
            ref={refKapasitas}
              placeholder="Kapasitas kamar"
              keyboardType="number-pad"
              onChangeText={(value) => {
                setForm('kapasitas', parseInt(value));
              }}
              value={kamar.kapasitas.toString()}
            />

            {errorMsg.kapasitas != '' && (
              <View style={styles.viewError}>
                <Text style={styles.textError}>{errorMsg.kapasitas}</Text>
              </View>
              //
            )}
          </View> */}
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

          {/* <View style={styles.fasilitasTitleWrapper}>
            <MaterialIcons name="room-service" color={myColor.fbtx} size={25} />

            <Text style={styles.titleFasilitas}>Fasilitas</Text>
          </View>
          {invalidFasilitas && (
            <View style={[styles.viewError, {marginBottom: 10}]}>
              <Text style={styles.textError}>
                Pastikan Semua kolom fasilitas sudah terisi
              </Text>
            </View>
          )}
           */}
          {/* 
          {inputList.map((x, i) => {
            return (
              <View style={styles.wrapperItemFasilitas} key={i}>
                <Text style={styles.normalText}>{i + 1}</Text>

                <TextInput
                  placeholder={'Fasilitas ' + String(i + 1)}
                  onChangeText={(e) => {
                    handleInputChange(e, i, 'nama');
                  }}
                  style={styles.inputItem}
                  value={x.nama}
                />

                {inputList.length !== 1 && (
                  <TouchableNativeFeedback onPress={() => handleRemoveClick(i)}>
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
            );
          })} */}

          {/* <View style={styles.wrapperAddFasilitas}>
            <TouchableNativeFeedback onPress={() => handleAddClick()}>
              <View style={styles.btAddFasilitas}>
                <Text style={styles.textAddFasilitas}>Tambah Fasilitas</Text>
              </View>
            </TouchableNativeFeedback>
          </View> */}
          <TouchableNativeFeedback
            // onPress={handleSubmit(onSubmit, onError)}
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
                  {text: 'Ya', onPress: () => editData()},
                ],
                {cancelable: false},
              );
            }}
            // onPress={() => console.log(kamar)}
          >
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
    marginHorizontal: 0.05 * screenWidth,
  },
  fasilitasIcon: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleFasilitas: {
    flex: 1,
    marginLeft: 10,
    fontWeight: 'bold',
    color: myColor.fbtx,
  },
  wrapperAddFasilitas: {marginBottom: 20, marginLeft: 20},
  btAddFasilitas: {
    height: 30,
    backgroundColor: myColor.addfacility,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 0.05 * screenWidth,
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
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 20,
    marginHorizontal: 0.05 * screenWidth,
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
    marginLeft: 10,
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
