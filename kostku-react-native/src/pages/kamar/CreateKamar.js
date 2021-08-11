import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useSelector} from 'react-redux';
import {myColor, APIUrl} from '../../function/MyVar';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const CreateKamar = ({navigation, route}) => {
  const [kamar, setKamar] = useState({
    nama: '',
    kelas: route.params.id,
    kapasitas: route.params.kapasitas,
    active: true,
    qty: 1,
  });
  // const [listKamar, setListKamar] = useState([]);
  const [banyak, setBanyak] = useState(1);
  const dataRedux = useSelector((state) => state.AuthReducer);
  const myToken = dataRedux.token;

  useEffect(() => {
    setKamar({...kamar, qty: banyak});
  }, [banyak]);

  const setForm = (inputType, value) => {
    setKamar({...kamar, [inputType]: value});
  };

  const addData = () => {
    console.log('add Data');

    // axios
    //   .post(`https://dry-forest-53707.herokuapp.com/api/kamar`, kamar, config)
    //   .then((res) => {
    //     //   console.log(res);
    //     console.log(res.data);
    //     navigation.push('DaftarKamar', {id: route.params.id});
    //   });

    axios
      .post(`https://dry-forest-53707.herokuapp.com/api/kamar`, kamar, {
        headers: {
          Authorization: `Bearer ${myToken}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        console.log('kamar', kamar);
        navigation.pop(1);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: myColor.colorTheme,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <StatusBar translucent backgroundColor="transparent" />
      <View
        style={{
          minHeight: 0.5 * screenHeight,
          width: 0.8 * screenWidth,
          backgroundColor: 'white',
          elevation: 5,
          borderRadius: 10,
          alignItems: 'center',
          paddingTop: 10,
        }}>
        <Text
          style={{fontSize: 18, fontWeight: 'bold', color: myColor.blackText}}>
          Tambah Kamar
        </Text>

        <View
          style={{
            marginTop: 15,
            height: 50,
            borderWidth: 0.5,
            borderRadius: 10,
            width: 0.7 * screenWidth,
            paddingHorizontal: 10,
          }}>
          <TextInput
            placeholder="Masukan Nama Kamar"
            onChangeText={(value) => {
              setForm('nama', value);
            }}
          />
        </View>

        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
          <TouchableOpacity
            onPress={() => {
              if (banyak > 1) {
                setBanyak(banyak - 1);
              }
            }}>
            <View
              style={{
                height: 40,
                width: 40,
                borderRadius: 20,
                backgroundColor: myColor.myblue,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: '#fff', fontSize: 24, fontWeight: 'bold'}}>
                -
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              minWidth: 50,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 0.5,
              marginHorizontal: 10,
              borderRadius: 10,
            }}>
            <TextInput
              value={banyak.toString()}
              keyboardType="numeric"
              onChangeText={(e) => {
                if (parseInt(e) < 1) {
                  setBanyak(parseInt(0));
                } else if (e.length < 1) {
                  setBanyak(parseInt(0));
                } else {
                  setBanyak(parseInt(e));
                }
              }}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              setBanyak(banyak + 1);
            }}>
            <View
              style={{
                height: 40,
                width: 40,
                borderRadius: 20,
                backgroundColor: myColor.myblue,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>
                +
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (kamar.nama != '') {
              addData();
            } else {
              alert('Pastikan Nama Kamar Sudah Diisi');
            }
          }}>
          <View
            style={{
              width: 100,
              height: 40,
              borderRadius: 10,
              backgroundColor: myColor.myblue,
              marginTop: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#fff', fontSize: 14, fontWeight: 'bold'}}>
              Tambah
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateKamar;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  containerUp: {
    flex: 1,
    backgroundColor: '#fcc78e',
  },
  containerBot: {
    flex: 4,
  },
  relModal: {
    position: 'absolute',
    width: 0.8 * screenWidth,
    right: 0.1 * screenWidth,
    top: 0.1 * screenHeight,
    height: 400,
    borderRadius: 20,
    backgroundColor: 'white',
    elevation: 5,
  },
  image: {
    flex: 1,
  },
});
