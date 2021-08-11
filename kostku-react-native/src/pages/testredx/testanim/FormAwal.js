import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import WelcomeSVG from '../../../asset/image/welcome/welcome.svg';
import HomeSvg from '../../../asset/image/home/error.svg';
import {useSelector, useDispatch} from 'react-redux';

const screenWidth = Math.round(Dimensions.get('window').width);

const FormAwal = ({navigation}) => {
  const dataRedux = useSelector((state) => state.AuthReducer);
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <View style={{marginLeft: 10, marginTop: 10}}>
          <Text style={{color: '#636e72', fontSize: 30}}>
            Hallo , {dataRedux.user.displayName}
          </Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#2F2E41',
          flex: 2,
          position: 'relative',
        }}>
        <View style={{position: 'absolute', top: -140}}>
          <WelcomeSVG width={screenWidth + 5} height={250} />
        </View>
        <View
          style={{
            backgroundColor: '#2F2E41',
            marginTop: 100,
            padding: 10,
          }}>
          <Text style={{color: '#dfe6e9', fontSize: 36}}>Selamat Datang</Text>
          <Text style={{color: '#dfe6e9', fontSize: 24}}>
            Di Aplikasi KostKu
          </Text>
        </View>
        <View style={{marginTop: 30, padding: 10}}>
          <Text style={{color: '#dfe6e9', fontSize: 16}}>
            Silahkan isi Data seputar Kost Anda Untuk memulai menggunakan
            Aplikasi KostKu
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.push('FirstForm')}>
          <View
            style={{
              width: '80%',
              backgroundColor: '#46ce7c',
              height: 50,
              marginHorizontal: screenWidth / 10,
              borderRadius: screenWidth / 4,
              marginTop: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#dfe6e9', fontSize: 14}}>
              Ke Halaman Form Data Kost
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FormAwal;

const styles = StyleSheet.create({});
