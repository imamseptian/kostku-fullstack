import axios from 'axios';
import React, {useState} from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {Permission, PERMISSION_TYPE} from '../../AppPermission';
import {CardForm} from '../../atoms';
import {HeaderPage} from '../../components';
import {APIUrl, myColor} from '../../function/MyVar';
import {setUserRedux} from '../../store';

const EditProfilePage = ({navigation, route}) => {
  const dispatch = useDispatch();
  const dataRedux = useSelector((state) => state.AuthReducer);
  const [dataUser, setdataUser] = useState(dataRedux.user);

  const [fotoProfil, setfotoProfil] = useState({
    isUploaded: false,
    base64: null,
    path: null,
  });
  const sizefoto = 120;

  const pickImage = async () => {
    await Permission.requestMultiple([
      PERMISSION_TYPE.photo,
      PERMISSION_TYPE.camera,
    ]);
    ImagePicker.openPicker({
      width: 512,
      height: 512,
      cropping: true,
      includeBase64: true,
    })
      .then((image) => {
        let base64Temporary = 'data:' + image.mime + ';base64,' + image.data;
        setfotoProfil({
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
    axios
      .put(
        APIUrl + '/api/editprofil',
        fotoProfil.isUploaded
          ? {...dataUser, newImg: fotoProfil.base64}
          : dataUser,
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
        console.log(res.data.user);
        navigation.pop(1);
        // navigation.goBack(2);
      })
      .catch((error) => {
        // setIsSubmit(false);
        console.log(error);
      });
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <StatusBar translucent backgroundColor="transparent" />
      <HeaderPage title="Edit Profil" />
      <View
        style={{
          flex: 1,
          paddingTop: StatusBar.currentHeight + 20,
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
                  uri: fotoProfil.isUploaded
                    ? fotoProfil.path
                    : APIUrl +
                      '/storage/images/users/' +
                      dataRedux.user.foto_profil,
                }}
                style={{
                  width: sizefoto,
                  height: sizefoto,
                  borderRadius: sizefoto / 2,
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  width: sizefoto,
                  height: sizefoto,
                  borderRadius: sizefoto / 2,
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
                  top: sizefoto / 2 - 10,
                  left: sizefoto / 2 - 10,
                }}
              />
            </View>
          </TouchableOpacity>
        </View>

        <CardForm
          title="Nama"
          placeholder="Nama"
          value={dataUser.nama}
          pesanError={null}
          onChangeText={(value) => {
            // setForm('alamat', value);
            setdataUser({...dataUser, nama: value});
          }}
          //   onSubmitEditing={() => {
          //     refNoTelp.current.focus();
          //   }}
          //   blurOnSubmit={false}
        >
          <FontAwesome name="user" size={20} color={myColor.grayGoogle} />
        </CardForm>
      </View>

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

export default EditProfilePage;

const styles = StyleSheet.create({});
