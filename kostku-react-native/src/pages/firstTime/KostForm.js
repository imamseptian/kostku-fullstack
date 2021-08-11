import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// import ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {Permission, PERMISSION_TYPE} from '../../AppPermission';
import {CardForm, CardNoTelp, CardPicker} from '../../atoms';
import {fcmService} from '../../FCMService';
import {myAxios} from '../../function/MyAxios';
import {APIUrl, myColor} from '../../function/MyVar';
import {setUserRedux} from '../../store';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const KostForm = ({navigation}) => {
  const dispatch = useDispatch();
  const scrollRef = useRef();
  const dataRedux = useSelector((state) => state.AuthReducer);

  const [isSubmit, setIsSubmit] = useState(false);

  const [user, setUser] = useState({
    nama: '',
    provinsi: null,
    kota: null,
    alamat: '',
    jenis: 1,
    notelp: '',
    deskripsi: '',
    owner: dataRedux.user.id,
    active: true,
  });
  const [errorMsg, seterrorMsg] = useState({
    nama: null,
    provinsi: null,
    kota: null,
    alamat: null,
    jenis: null,
    notelp: null,
    deskripsi: null,
  });

  const [fotoKost, setfotoKost] = useState({
    isUploaded: false,
    base64: null,
    path: null,
  });

  const jenisKost = [
    {id: 1, nama: 'Campuran'},
    {id: 2, nama: 'Pria'},
    {id: 3, nama: 'Wanita'},
  ];

  const refNoTelp = useRef();
  const refDeskripsi = useRef();

  const hasUnsavedChanges = Boolean(user);
  React.useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        if (!hasUnsavedChanges || setIsSubmit) {
          // If we don't have unsaved changes, then we don't need to do anything
          return;
        }

        // Prevent default behavior of leaving the screen
        e.preventDefault();

        // Prompt the user before leaving the screen
        Alert.alert(
          'Yakin ingin meninggalkan halaman ini?',
          'Data yang sudah anda isi akan hilang jika anda meninggalkan halaman ini',
          [
            {text: 'Batal', style: 'cancel', onPress: () => {}},
            {
              text: 'Pergi',
              style: 'destructive',
              onPress: () => navigation.dispatch(e.data.action),
            },
          ],
        );
      }),
    [navigation, hasUnsavedChanges],
  );

  // const ProvURL = `https://dev.farizdotid.com/api/daerahindonesia/provinsi`;
  // const ProvURL = `https://x.rajaapi.com/MeP7c5neqPkLFsmfECbpnjiY69MQPqkEzRDEEsho6flCgp9kNdVa4BBFVG/m/wilayah/provinsi`;
  const [provinsi, setProvinsi] = useState([]);
  const [kota, setKota] = useState([]);

  const [dataFoto, setDataFoto] = useState({
    isUploaded: false,
    uri: '',
    type: '',
    data: '',
    base64: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  // let URLkota = `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${user.provinsi}`;

  useEffect(() => {
    setIsSubmit(true);
    axios
      .get(`${APIUrl}/api/list_provinsi`)
      .then((response) => {
        setProvinsi(response.data.provinsi);
        setIsSubmit(false);
        // console.log(response.data);
      })
      .catch((error) => {
        setIsSubmit(false);
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (user.provinsi !== null) {
      setIsSubmit(true);
      axios
        .get(`${APIUrl}/api/list_kota/${user.provinsi}`)
        .then((response) => {
          setIsSubmit(false);
          setKota(response.data.kota);
        })
        .catch((error) => {
          setIsSubmit(false);
          console.log(error);
        });
    }
  }, [user.provinsi]);

  const setForm = (inputType, value) => {
    setUser({
      ...user,
      [inputType]: value,
    });
  };

  const goToTop = () => {
    // scrollRef.current.scrollToIndex({animated: true, index: 0});
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  // const pickImage = async () => {
  //   setIsSubmit(true);
  //   await Permission.requestMultiple([
  //     PERMISSION_TYPE.photo,
  //     PERMISSION_TYPE.camera,
  //   ]);
  //   ImagePicker.launchImageLibrary(
  //     {mediaType: 'photo', base64: true, maxWidth: 720, maxHeight: 480},
  //     (response) => {
  //       // console.log('Response = ', response);

  //       if (response.didCancel) {
  //         console.log('User cancelled image picker');
  //         setIsSubmit(false);
  //       } else if (response.error) {
  //         console.log('ImagePicker Error: ', response.error);
  //         setIsSubmit(false);
  //       } else if (response.customButton) {
  //         console.log('User tapped custom button: ', response.customButton);
  //         setIsSubmit(false);
  //       } else {
  //         let image = 'data:' + response.type + ';base64,' + response.data;
  //         setDataFoto({
  //           ...dataFoto,
  //           isUploaded: true,
  //           uri: response.uri,
  //           type: response.type,
  //           data: response.data,
  //           base64: image,
  //         });
  //         setIsSubmit(false);
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
        setfotoKost({
          isUploaded: true,
          base64: base64Temporary,
          path: image.path,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const scrollRef = useRef(ScrollView);

  const goToHome = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'MainScreen'}],
    });
  };

  const addData = () => {
    const source = axios.CancelToken.source();
    myAxios.postAxios(
      APIUrl + '/api/kost',
      fotoKost.isUploaded ? {...user, foto_kost: fotoKost.base64} : user,
      dataRedux.token,
      source.token,
      onPost,
    );
    function onPost(status, data) {
      if (status == 'success') {
        if (data.success) {
          // navigation.pop(1);
          const dataPengguna = data.user;
          console.log('sukses matamu ', data);
          let topic = 'kostku-' + data.data.id;

          fcmService.subscribeToTopic(topic);
          dispatch(setUserRedux(dataPengguna));

          // console.log(data);
          goToHome();
        } else {
          goToTop();
          seterrorMsg({
            nama: data.errors.nama ? data.errors.nama : null,
            provinsi: data.errors.provinsi ? data.errors.provinsi : null,
            kota: data.errors.kota ? data.errors.kota : null,
            alamat: data.errors.alamat ? data.errors.alamat : null,
            jenis: data.errors.jenis ? data.errors.jenis : null,
            notelp: data.errors.notelp ? data.errors.notelp : null,
            deskripsi: data.errors.deskripsi ? data.errors.deskripsi : null,
          });
          setIsSubmit(false);
        }
      } else if (status == 'cancel') {
        console.log('caught cancel filter');
      } else {
        console.log('gagal');
        setIsSubmit(false);
        console.log(user);
        console.log(data);
      }
    }
  };

  return (
    <View style={styles.flyView}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <ScrollView
        style={{paddingHorizontal: 15}}
        showsVerticalScrollIndicator={false}
        ref={scrollRef}
        contentContainerStyle={{paddingBottom: 20}}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 10,
          }}>
          Formulir Kost
        </Text>

        <TouchableOpacity disabled={isSubmit} onPress={() => pickImage()}>
          <View style={{alignItems: 'center', marginBottom: 25}}>
            {!fotoKost.isUploaded ? (
              <View
                style={{
                  width: 300,
                  height: 200,
                  borderRadius: 10,
                  backgroundColor: myColor.divider,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {/* <Text style={{color: '#fff', fontSize: 14, fontWeight: 'bold'}}>
              </Text> */}
                <MaterialCommunityIcons
                  name="camera-plus"
                  size={20}
                  color={'#fff'}
                />
              </View>
            ) : (
              <Image
                source={{
                  uri: fotoKost.path,
                  width: 300,
                  height: 200,
                }}
                style={{
                  borderRadius: 10,
                }}
                resizeMode="contain"
              />
            )}
          </View>
        </TouchableOpacity>
        {/* <Text>{JSON.stringify(user)}</Text> */}

        {/* <TextFormField
          title="Nama Kost"
          placeholder="Masukan Nama Kost"
          onChangeText={(value) => {
            setForm('nama', value);
          }}
          value={user.nama}
          pesanError={errorMsg.nama}
        /> */}

        <CardForm
          title="Nama Kost"
          placeholder="Nama Kost"
          value={user.nama}
          pesanError={errorMsg.nama}
          onChangeText={(value) => {
            setForm('nama', value);
          }}>
          <Entypo name="home" size={20} color={myColor.grayGoogle} />
        </CardForm>

        <CardPicker
          pesanError={errorMsg.provinsi}
          title="Provinsi Kost"
          data={provinsi}
          itemName="name"
          selectedValue={user.provinsi}
          placeholder="Pilih Provinsi"
          onChangeFunction={(value) => setForm('provinsi', value)}
          disabled={isSubmit}>
          <MaterialCommunityIcons
            name="city"
            size={20}
            color={myColor.grayGoogle}
          />
        </CardPicker>

        <CardPicker
          title="Kota"
          pesanError={errorMsg.kota}
          selectedValue={user.kota}
          data={kota}
          itemName="name"
          placeholder="Pilih Kota"
          onChangeFunction={(value) => setForm('kota', value)}
          disabled={isSubmit}>
          <MaterialCommunityIcons
            name="city"
            size={20}
            color={myColor.grayGoogle}
          />
        </CardPicker>

        {/* <MyPicker
          title="Kota"
          pesanError={errorMsg.kota}
          selectedValue={user.kota}
          data={kota}
          itemName="nama"
          placeholder="Pilih Kota"
          onChangeFunction={(value) => setForm('kota', value)}
          disabled={isSubmit}
        /> */}

        {/* <View style={styles.formWrapper}>
          <View>
            <View style={styles.fieldForm}>
              <MaterialCommunityIcons
                name="home-city"
                size={25}
                style={{opacity: 0.5}}
              />
              <Picker
                selectedValue={user.jenis}
                style={{height: 50, flex: 1, fontSize: 3}}
                textStyle={{fontSize: 12}}
                onValueChange={(itemValue, itemIndex) => {
                  if (itemValue != null) {
                    setinvalidKota(false);
                    setForm('jenis', itemValue);
                  }
                }}>
                <Picker.Item label="Pilih Jenis" />
                <Picker.Item key={'1'} label="Kost Campuran" value={1} />
                <Picker.Item key={'2'} label="Kost Pria" value={2} />
                <Picker.Item key={'3'} label="Kost Wanita" value={3} />
              </Picker>
            </View>
            {invalidJenis && (
              <View style={styles.viewError}>
                <Text style={styles.textError}>Jenis Kost Perlu Dipilih</Text>
              </View>
            )}
          </View>
        </View> */}
        {/* <Text>{provinsi.length}</Text>
        <Text>{JSON.stringify(provinsi)}</Text> */}

        <CardForm
          title="Alamat Kost"
          placeholder="Alamat Kost"
          value={user.alamat}
          pesanError={errorMsg.alamat}
          onChangeText={(value) => {
            setForm('alamat', value);
          }}
          onSubmitEditing={() => {
            refNoTelp.current.focus();
          }}
          blurOnSubmit={false}>
          <Entypo name="address" size={20} color={myColor.grayGoogle} />
        </CardForm>

        {/* <TextFormField
          title="Alamat Kost"
          placeholder="Masukan Alamat Kost"
          onChangeText={(value) => {
            setForm('alamat', value);
          }}
          value={user.alamat}
          pesanError={errorMsg.alamat}
          onSubmitEditing={() => {
            refNoTelp.current.focus();
          }}
          blurOnSubmit={false}
        /> */}

        <CardForm
          ref={refNoTelp}
          title="Nomor HP Pengelola Kost"
          onChangeText={(value) => {
            let tempHP = value;
            let regex = /^[0-9\b]+$/;

            // if value is not blank, then test the regex
            if (tempHP === '' || regex.test(tempHP)) {
              setForm('notelp', value);
            }

            // let notelpku = value.replace('/r', '/');
            // setForm('notelp', notelpku);
          }}
          value={user.notelp}
          placeholder="Nomor HP Pengelola Kost"
          keyboardType="phone-pad"
          pesanError={errorMsg.notelp}
          // onSubmitEditing={() => {
          //   refNoTelp.current.focus();
          // }}
        >
          <Entypo
            name="phone"
            size={20}
            color={myColor.grayGoogle}
            style={{transform: [{rotateY: '180deg'}]}}
          />
        </CardForm>

        <CardPicker
          title="Jenis Kost"
          pesanError={errorMsg.jenis}
          selectedValue={user.jenis}
          data={jenisKost}
          itemName="nama"
          placeholder="Pilih Jenis"
          onChangeFunction={(value) => setForm('jenis', value)}
          disabled={isSubmit}>
          <Entypo name="home" size={20} color={myColor.grayGoogle} />
        </CardPicker>

        {/* <CardNoTelp
          ref={refNoTelp}
          title="Nomor Telepon Kost"
          onChangeText={(value) => {
            setForm('notelp', value);
          }}
          value={user.notelp}
          keyboardType="number-pad"
          pesanError={errorMsg.notelp}
          awalan="+62"
          onSubmitEditing={() => {
            refDeskripsi.current.focus();
          }}
          blurOnSubmit={false}>
          <FontAwesome name="user" size={20} color={myColor.grayGoogle} />
        </CardNoTelp> */}

        <CardForm
          ref={refDeskripsi}
          title="Deskripsi Kost"
          placeholder="Deskrips Kost"
          onChangeText={(value) => {
            setForm('deskripsi', value);
          }}
          value={user.deskripsi}
          multiline={true}
          pesanError={errorMsg.deskripsi}>
          <MaterialIcons
            name="description"
            size={20}
            color={myColor.grayGoogle}
          />
        </CardForm>

        {/* <TextFormField
          ref={refDeskripsi}
          title="Deskripsi Kost"
          placeholder="Deskrips Kost"
          onChangeText={(value) => {
            setForm('deskripsi', value);
          }}
          value={user.deskripsi}
          multiline={true}
          pesanError={errorMsg.deskripsi}
        /> */}

        <TouchableOpacity
          onPress={() => {
            setIsSubmit(true);
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
          }}
          disabled={isSubmit}>
          <View
            style={{
              height: 40,
              backgroundColor: myColor.myblue,
              marginHorizontal: 20,
              borderRadius: 10,
              marginTop: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 14}}>
              Submit
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
      <ActivityIndicator
        animating={isSubmit}
        size="large"
        color={myColor.myblue}
        style={styles.loading}
      />

      {/* <View style={{flex: 1}}></View> */}

      {/* <View
          style={{
            height: 0.5 * screenHeight,
            backgroundColor: 'red',
          }}>
          
        </View> */}
    </View>
  );
};

export default KostForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight,
    backgroundColor: myColor.colorTheme,
  },
  containerTop: {
    flex: 2,
    backgroundColor: myColor.colorTheme,
  },
  containerBot: {
    flex: 5,
  },
  flyView: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    // elevation: 5,
  },
  formWrapper: {
    marginBottom: 15,
    marginHorizontal: 0.05 * screenWidth,
  },
  fieldForm: {
    height: 40,
    borderWidth: 0.5,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  viewError: {width: 250, paddingTop: 3},
  textError: {
    color: '#d63031',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 40,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
