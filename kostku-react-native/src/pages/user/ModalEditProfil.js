import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {myColor, screenHeight, screenWidth, APIUrl} from '../../function/MyVar';
import {myAxios} from '../../function/MyAxios';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import {Permission, PERMISSION_TYPE} from '../../AppPermission';
import {setUserRedux} from '../../store';

const ModalEditProfil = (props) => {
  const dispatch = useDispatch();
  const [pengguna, setpengguna] = useState(props.user);
  const [isPressed, setIsPressed] = useState(false);
  const [dataFoto, setDataFoto] = useState({
    isUploaded: false,
    uri: '',
    type: '',
    data: '',
    base64: '',
  });
  useEffect(() => {
    return () => {
      console.log('tutup modal');
      setpengguna({});
      setDataFoto({
        isUploaded: false,
        uri: '',
        type: '',
        data: '',
        base64: '',
      });
    };
  }, []);

  const pickImage = async () => {
    setIsPressed(true);
    await Permission.requestMultiple([
      PERMISSION_TYPE.photo,
      PERMISSION_TYPE.camera,
    ]);
    ImagePicker.launchImageLibrary(
      {mediaType: 'photo', base64: true, maxWidth: 720, maxHeight: 480},
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
          let image = 'data:' + response.type + ';base64,' + response.data;
          setDataFoto({
            ...dataFoto,
            isUploaded: true,
            uri: response.uri,
            type: response.type,
            data: response.data,
            base64: image,
          });
          setIsPressed(false);
        }
      },
    );
  };

  const submitEdit = () => {
    axios
      .put(
        APIUrl + '/api/editprofil',
        dataFoto.isUploaded ? {...pengguna, newImg: dataFoto.base64} : pengguna,
        {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        },
      )
      .then((res) => {
        // setIsSubmit(false);
        console.log(res.data);
        dispatch(setUserRedux(res.data.user));
        console.log(res.data.user);
        // props.fungsiubah({...pengguna, foto_profil: res.data.foto_baru});
        props.tutup();
        // navigation.pop(2);
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
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
      }}>
      <View
        style={{
          paddingBottom: 20,
          minHeight: 100,
          width: screenWidth * 0.7,

          backgroundColor: 'white',
          elevation: 5,

          borderTopLeftRadius: 5,
          borderTopRightRadius: 20,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 5,
        }}>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: myColor.divider,
            paddingVertical: 10,
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Text
            style={{
              fontFamily: 'OpenSans-SemiBold',
              fontSize: 14,
              color: myColor.fbtx,
            }}>
            {props.styling.title}
          </Text>
        </View>

        <View style={{paddingHorizontal: 0.05 * screenWidth}}>
          {props.styling.edit == 'foto_profil' ? (
            <View style={{alignItems: 'center'}}>
              <Image
                source={{
                  uri: dataFoto.isUploaded
                    ? dataFoto.uri
                    : APIUrl + '/kostdata/pemilik/foto/' + pengguna.foto_profil,
                }}
                style={{
                  height: 80,
                  width: 80,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: myColor.divider,
                }}
                resizeMode="cover"
              />
              {/* <Text>{pengguna.foto_profil}</Text> */}

              <TouchableOpacity onPress={() => pickImage()}>
                <View
                  style={{
                    marginTop: 10,
                    paddingVertical: 3,
                    borderRadius: 5,
                    backgroundColor: myColor.addfacility,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: 10,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'OpenSans-Regular',
                      fontSize: 12,
                      color: '#fff',
                    }}>
                    Ubah Foto Profil
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <TextInput
              style={{
                fontFamily: 'OpenSans-Regular',
                color: myColor.fbtx,
                fontSize: 12,
                paddingHorizontal: 10,
                borderWidth: 1,
                borderRadius: 5,
                height: 40,
              }}
              value={pengguna[props.styling.edit]}
              onChangeText={(e) => {
                setpengguna({...pengguna, [props.styling.edit]: e});
              }}
            />
          )}

          <TouchableOpacity
            onPress={() => {
              {
                submitEdit();
                // props.fungsiubah(pengguna);
                // props.tutup();
              }
            }}>
            <View
              style={{
                height: 30,
                marginTop: 15,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: myColor.success,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'OpenSans-SemiBold',
                  color: myColor.fbtx,
                }}>
                Submit
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              {
                props.tutup();
              }
            }}>
            <View
              style={{
                height: 30,
                marginTop: 10,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',

                backgroundColor: myColor.alert,
              }}>
              <Text style={{fontSize: 14, fontWeight: 'bold', color: '#fff'}}>
                Tutup
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ModalEditProfil;

const styles = StyleSheet.create({});
