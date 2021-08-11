import React, {useRef, useState, useEffect} from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';
import {useSelector} from 'react-redux';
import WelcomeSVG from '../../asset/image/welcome/welcome.svg';
import {myColor, APIUrl} from '../../function/MyVar';

const screenWidth = Math.round(Dimensions.get('window').width);

const FormAwal = ({navigation}) => {
  const mountedAnimated = useRef(new Animated.Value(0)).current;
  const dataRedux = useSelector((state) => state.AuthReducer);
  useEffect(() => {
    Animated.timing(mountedAnimated, {
      toValue: 1,
      duration: 1000,
      delay: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const translateY = mountedAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: [200, 0],
  });

  return (
    <View style={{flex: 1}}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Animated.View style={{flex: 1, opacity: mountedAnimated}}>
        <View style={{marginLeft: 10, marginTop: StatusBar.currentHeight}}>
          <Text
            style={{
              color: myColor.blackText,
              fontSize: 30,
              fontWeight: 'bold',
            }}>
            Hallo , {dataRedux.user.nama}
          </Text>
        </View>
      </Animated.View>
      <Animated.View
        style={{
          backgroundColor: '#2F2E41',
          flex: 2,
          position: 'relative',
          transform: [{translateY}],
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
          <Text style={{color: '#dfe6e9', fontSize: 36, fontWeight: 'bold'}}>
            Selamat Datang
          </Text>
          <Text style={{color: '#dfe6e9', fontSize: 24, fontWeight: 'bold'}}>
            Di Aplikasi KostKu
          </Text>
        </View>
        <View style={{marginTop: 30, padding: 10}}>
          <Text style={{color: '#dfe6e9', fontSize: 15, fontWeight: 'bold'}}>
            Silahkan isi Data seputar Kost Anda Untuk memulai menggunakan
            Aplikasi KostKu
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.push('FirstForm')}>
          <View
            style={{
              width: '80%',
              backgroundColor: myColor.myblue,
              height: 50,
              marginHorizontal: screenWidth / 10,
              borderRadius: 10,
              marginTop: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#fff', fontSize: 14, fontWeight: 'bold'}}>
              Ke Halaman Form Data Kost
            </Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default FormAwal;

const styles = StyleSheet.create({});
