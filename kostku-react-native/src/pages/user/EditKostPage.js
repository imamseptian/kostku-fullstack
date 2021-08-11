import axios from 'axios';
import React, {useState, useEffect, useRef} from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {useDispatch, useSelector} from 'react-redux';
import {Permission, PERMISSION_TYPE} from '../../AppPermission';
import {CardForm, CardPicker, CardNoTelp} from '../../atoms';
import {HeaderPage} from '../../components';
import {APIUrl, myColor} from '../../function/MyVar';
import {setUserRedux} from '../../store';

const EditKostPage = ({navigation, route}) => {
  const dispatch = useDispatch();
  const item = route.params;
  const dataRedux = useSelector((state) => state.AuthReducer);
  // const [dataUser, setdataUser] = useState(dataRedux.user);
  const [dataKost, setdataKost] = useState(item);
  const [isSubmit, setIsSubmit] = useState(false);
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
  const sizefoto = 120;

  // const ProvURL = `https://x.rajaapi.com/MeP7c5neqPkLFsmfECbpnjiY69MQPqkEzRDEEsho6flCgp9kNdVa4BBFVG/m/wilayah/provinsi`;
  const [provinsi, setProvinsi] = useState([]);
  const [kota, setKota] = useState([]);

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
    axios
      .get(`${APIUrl}/api/list_kota/${dataKost.provinsi}`)
      .then((response) => {
        setIsSubmit(false);
        setKota(response.data.kota);
      })
      .catch((error) => {
        setIsSubmit(false);
        console.log(error);
      });
  }, [route.params]);

  useEffect(() => {
    if (dataKost.provinsi !== null) {
      setIsSubmit(true);
      axios
        .get(`${APIUrl}/api/list_kota/${dataKost.provinsi}`)
        .then((response) => {
          setIsSubmit(false);
          setKota(response.data.kota);
        })
        .catch((error) => {
          setIsSubmit(false);
          console.log(error);
        });
    }
  }, [dataKost.provinsi]);

  const setKost = (inputType, value) => {
    setdataKost({
      ...dataKost,
      [inputType]: value,
    });
  };

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

  const submitEdit = () => {
    // console.log(kost);
    axios
      .put(
        APIUrl + '/api/editkost',
        fotoKost.isUploaded ? {...dataKost, newImg: fotoKost.base64} : dataKost,
        {
          headers: {
            Authorization: `Bearer ${dataRedux.token}`,
          },
        },
      )
      .then((res) => {
        // setIsSubmit(false);
        console.log(res.data);
        dispatch(setUserRedux(res.data.user));
        // console.log(res.data.user);

        navigation.pop(1);
        // navigation.goBack(2);
      })
      .catch((error) => {
        // setIsSubmit(false);
        console.log(error);
      });
  };

  const jenisKost = [
    {id: 1, nama: 'Campuran'},
    {id: 2, nama: 'Pria'},
    {id: 3, nama: 'Wanita'},
  ];
  const refNoTelp = useRef();
  const refDeskripsi = useRef();

  return (
    <View
      style={{
        flex: 1,
      }}>
      <StatusBar translucent backgroundColor="transparent" />
      <HeaderPage title="Edit Profil" />
      <ScrollView>
        {/* <Text>{JSON.stringify(item)}</Text> */}
        <View
          style={{
            flex: 1,
            paddingTop: 20,
            paddingHorizontal: 15,
          }}>
          <View style={{alignItems: 'center', marginBottom: 30}}>
            <TouchableOpacity
              onPress={() => {
                pickImage();
              }}>
              <View style={{position: 'relative'}}>
                <Image
                  source={{
                    // uri: dataFoto.isUploaded
                    //   ? dataFoto.uri
                    //   : defaultAsset.foto_profil,
                    uri: fotoKost.isUploaded
                      ? fotoKost.path
                      : APIUrl + '/storage/images/kost/' + dataKost.foto_kost,
                  }}
                  style={{
                    width: 300,
                    height: 200,
                    borderRadius: 10,
                  }}
                />
                <View
                  style={{
                    position: 'absolute',
                    width: 300,
                    height: 200,
                    borderRadius: 10,
                    backgroundColor: 'black',
                    opacity: 0.2,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}></View>
                <MaterialCommunityIcons
                  name="camera-plus"
                  size={20}
                  color={'#fff'}
                  style={{
                    position: 'absolute',
                    top: 200 / 2 - 10,
                    left: 300 / 2 - 10,
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>

          {/* <CardForm
          title="Nama"
          placeholder="Nama"
          value={dataKost.nama}
          pesanError={null}
          onChangeText={(value) => {
            // setKost('alamat', value);
            setdataKost({...dataKost, nama: value});
          }}
          //   onSubmitEditing={() => {
          //     refNoTelp.current.focus();
          //   }}
          //   blurOnSubmit={false}
        >
          <FontAwesome name="user" size={20} color={myColor.grayGoogle} />
        </CardForm> */}

          <CardForm
            title="Nama Kost"
            placeholder="Nama Kost"
            value={dataKost.nama}
            pesanError={errorMsg.nama}
            onChangeText={(value) => {
              setKost('nama', value);
            }}>
            <FontAwesome name="user" size={20} color={myColor.grayGoogle} />
          </CardForm>

          {/* <Text>{JSON.stringify(dataKost)}</Text> */}
          <CardPicker
            pesanError={errorMsg.provinsi}
            title="Provinsi Kost"
            data={provinsi}
            itemName="name"
            selectedValue={dataKost.provinsi}
            placeholder="Pilih Provinsi"
            onChangeFunction={(value) => setKost('provinsi', value)}
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
            selectedValue={dataKost.kota}
            data={kota}
            itemName="name"
            placeholder="Pilih Kota"
            onChangeFunction={(value) => setKost('kota', value)}
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
          selectedValue={dataKost.kota}
          data={kota}
          itemName="nama"
          placeholder="Pilih Kota"
          onChangeFunction={(value) => setKost('kota', value)}
          disabled={isSubmit}
        /> */}

          <CardPicker
            title="Jenis Kost"
            pesanError={errorMsg.jenis}
            selectedValue={dataKost.jenis}
            data={jenisKost}
            itemName="nama"
            placeholder="Pilih Jenis"
            onChangeFunction={(value) => setKost('jenis', value)}
            disabled={isSubmit}>
            <MaterialCommunityIcons
              name="city"
              size={20}
              color={myColor.grayGoogle}
            />
          </CardPicker>

          {/* <View style={styles.formWrapper}>
          <View>
            <View style={styles.fieldForm}>
              <MaterialCommunityIcons
                name="home-city"
                size={25}
                style={{opacity: 0.5}}
              />
              <Picker
                selectedValue={dataKost.jenis}
                style={{height: 50, flex: 1, fontSize: 3}}
                textStyle={{fontSize: 12}}
                onValueChange={(itemValue, itemIndex) => {
                  if (itemValue != null) {
                    setinvalidKota(false);
                    setKost('jenis', itemValue);
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

          <CardForm
            title="Alamat Kost"
            placeholder="Alamat Kost"
            value={dataKost.alamat}
            pesanError={errorMsg.alamat}
            onChangeText={(value) => {
              setKost('alamat', value);
            }}
            onSubmitEditing={() => {
              refNoTelp.current.focus();
            }}
            blurOnSubmit={false}>
            <FontAwesome name="user" size={20} color={myColor.grayGoogle} />
          </CardForm>

          {/* <TextFormField
          title="Alamat Kost"
          placeholder="Masukan Alamat Kost"
          onChangeText={(value) => {
            setKost('alamat', value);
          }}
          value={dataKost.alamat}
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
                setKost('notelp', value);
              }

              // let notelpku = value.replace('/r', '/');
              // setForm('notelp', notelpku);
            }}
            value={dataKost.notelp}
            placeholder="Nomor HP Pengelola Kost"
            keyboardType="phone-pad"
            pesanError={errorMsg.notelp}>
            <Entypo
              name="phone"
              size={20}
              color={myColor.grayGoogle}
              style={{transform: [{rotateY: '180deg'}]}}
            />
          </CardForm>

          <CardForm
            ref={refDeskripsi}
            title="Deskripsi Kost"
            placeholder="Deskrips Kost"
            onChangeText={(value) => {
              setKost('deskripsi', value);
            }}
            value={dataKost.deskripsi}
            multiline={true}
            pesanError={errorMsg.deskripsi}>
            <MaterialIcons
              name="description"
              size={20}
              color={myColor.grayGoogle}
            />
          </CardForm>
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => {
          submitEdit();
        }}>
        <View
          style={{
            paddingVertical: 10,
            alignItems: 'center',
            backgroundColor: myColor.myblue,
            marginBottom: 10,
            borderRadius: 5,
            marginHorizontal: 15,
          }}>
          <Text
            style={{
              fontFamily: 'OpenSans-SemiBold',
              fontSize: 12,
              color: '#fff',
            }}>
            Edit Profil
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default EditKostPage;

const styles = StyleSheet.create({});
