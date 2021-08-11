import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useState, useRef} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Spinner from 'react-native-loading-spinner-overlay';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';
import LoginSVG from '../../asset/image/login2.svg';
import {fcmService} from '../../FCMService';
import {myColor, APIUrl, screenHeight, screenWidth} from '../../function/MyVar';
import {setAuthRedux, unsetAuthRedux} from '../../store';

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();

  // STATE HIDE/SHOW PASSWORD
  const [showPassword, setshowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const refPassword = useRef();

  const setForm = (inputType, value) => {
    setUser({
      ...user,
      [inputType]: value,
    });
  };

  const storeData = async (value, topic) => {
    console.log('Store Topic ====> ', topic);
    try {
      await AsyncStorage.setItem('token', value);
      await AsyncStorage.setItem('topic', topic);
    } catch (e) {
      // saving error
    }
  };

  const submitLogin = () => {
    setIsLoading(true);
    axios
      .post(`${APIUrl}/api/auth/login`, user)
      .then(async (res) => {
        if (res.data.success) {
          const dataPengguna = res.data.user;
          await dispatch(unsetAuthRedux());
          dispatch(setAuthRedux(dataPengguna, res.data.access_token));

          console.log('subs saat login :kostku- ', res.data.user.kostku);
          storeData(res.data.access_token, 'kostku-' + res.data.user.kostku);
          subscribeToKost(res.data.access_token);
        } else {
          alert('Maaf Email atau Password Salah');
          setIsLoading(false);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log('ada error');
        setIsLoading(false);
        console.log(error.response);
      });
  };

  const subscribeToKost = (token) => {
    const source = axios.CancelToken.source();

    try {
      axios
        .get(APIUrl + '/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cancelToken: source.token,
        })
        .then((response) => {
          if (response.data.kostku != 0) {
            let topic = 'kostku-' + response.data.kostku;

            fcmService.subscribeToTopic(topic);
          }

          setIsLoading(false);
          toHome();
        });
    } catch (error) {
      if (axios.isCancel(error)) {
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    }

    return () => {
      source.cancel();
    };
  };

  const toHome = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'MainNavigator'}],
    });
  };

  return (
    <View style={styles.wrapper}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={{color: '#FFF'}}
      />

      {/* SECTION LOGIN SVG  */}
      <Animatable.View animation="bounceIn" style={styles.animSVG}>
        <View style={styles.wrapperSVG}>
          <LoginSVG width={200} height={200} />
          <Text style={styles.fontSVG}>Login</Text>
        </View>
      </Animatable.View>

      {/* SECTION LOGIN FORM  */}
      <Animatable.View animation="fadeInUpBig" style={styles.animForm}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.text1}>Selamat Datang</Text>
          <Text style={styles.text2}>Silahkan Login dengan Akun Anda</Text>
          {/* SECTION EMAIL  */}
          <View style={styles.wrapperField}>
            <FontAwesome
              name="user-o"
              color={myColor.fbtx}
              size={25}
              style={{marginRight: 5}}
            />
            <TextInput
              placeholder="Email"
              style={styles.textInput}
              onChangeText={(value) => setForm('email', value)}
              onSubmitEditing={() => {
                refPassword.current.focus();
              }}
              blurOnSubmit={false}
            />
          </View>

          {/* SECTION PASSWORD  */}
          <View style={styles.wrapperField}>
            <FontAwesome
              name="lock"
              color={myColor.fbtx}
              size={25}
              style={{marginRight: 5}}
            />
            <TextInput
              ref={refPassword}
              placeholder="Password"
              secureTextEntry={true}
              secureTextEntry={!showPassword}
              style={styles.textInput}
              onChangeText={(value) => setForm('password', value)}
            />
            <TouchableOpacity
              style={{marginLeft: 5}}
              onPress={() => setshowPassword(!showPassword)}>
              <FontAwesome
                name={showPassword ? 'eye-slash' : 'eye'}
                color={myColor.fbtx}
                size={25}
              />
            </TouchableOpacity>
          </View>

          {/* SECTION BUTTON LOGIN  */}
          <TouchableOpacity onPress={() => submitLogin()}>
            <View style={styles.btLogin}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 13,
                  fontFamily: 'OpenSans-SemiBold',
                  fontSize: 14,
                }}>
                Login
              </Text>
            </View>
          </TouchableOpacity>
          <Text
            style={{
              textAlign: 'center',
              marginTop: 10,
              fontFamily: 'OpenSans-Regular',
              fontSize: 12,
            }}>
            Atau
          </Text>

          {/* SECTION LINK REGISTER  */}
          <TouchableOpacity onPress={() => navigation.push('RegisterScreen')}>
            <Text style={styles.textDaftar}>
              Belum punya akun ? Silahkan Daftar
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: myColor.colorTheme,
    paddingTop: StatusBar.currentHeight,
  },
  animSVG: {
    flex: 4,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },
  wrapperSVG: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fontSVG: {fontSize: 26, color: 'white'},
  animForm: {
    flex: 5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text1: {textAlign: 'center', fontWeight: 'bold', fontSize: 20},
  text2: {textAlign: 'center', fontSize: 14},
  wrapperField: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    paddingHorizontal: 10,

    borderRadius: 10,
    borderWidth: 1,
    borderColor: myColor.divider,
    height: 40,
  },
  textInput: {
    borderColor: '#E8E8E8',
    fontSize: 12,
    flex: 1,
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
  },
  iconField: {},
  btLogin: {
    backgroundColor: myColor.myblue,
    marginTop: 20,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },
  textDaftar: {
    textAlign: 'center',
    marginTop: 10,
    textDecorationLine: 'underline',
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 12,
  },
});
