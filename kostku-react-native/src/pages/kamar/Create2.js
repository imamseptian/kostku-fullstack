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
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useSelector} from 'react-redux';

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
    <View style={styles.wrapper}>
      <View style={styles.containerUp}></View>
      <View style={styles.containerBot}></View>
      <View style={styles.relModal}>
        <View
          style={{
            position: 'relative',
            flex: 1,
          }}>
          <View
            style={{
              alignItems: 'center',
              position: 'absolute',
              top: -40,
              width: 0.8 * screenWidth,
            }}>
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: '#ffeaa7',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 2,
                borderColor: '#74b9ff',
              }}>
              <Image
                source={require('../../asset/icon/kasur.png')}
                style={{width: 50, height: 50}}
              />
            </View>
          </View>
          <View>
            <Text
              style={{
                marginTop: 65,
                marginBottom: 15,
                fontSize: 24,
                textAlign: 'center',
                fontWeight: 'bold',
                color: '#636e72',
              }}>
              Tambah Data Kamar
            </Text>
          </View>

          <ScrollView style={{flex: 1, marginBottom: 20}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 20,
              }}>
              <View
                style={{
                  width: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Fontisto name="room" color="#05375A" size={25} />
              </View>
              <TextInput
                placeholder="Nama Kamar"
                style={{borderBottomWidth: 1, flex: 1, marginLeft: 10}}
                onChangeText={(value) => {
                  setForm('nama', value);
                }}
              />
            </View>
            {kamar.nama == '' && (
              <Text
                style={{
                  marginLeft: 60,
                  fontSize: 12,
                  fontWeight: 'bold',
                  color: 'red',
                }}>
                Nama Harus Diisi
              </Text>
            )}
            <Text
              style={{
                textAlign: 'center',
                marginBottom: 10,
                marginTop: 30,
                fontSize: 20,
                fontWeight: 'bold',
                color: '#636e72',
              }}>
              Jumlah
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: 0.4 * screenWidth,
                justifyContent: 'space-between',
                alignSelf: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  if (banyak > 1) {
                    setBanyak(banyak - 1);
                  }
                }}>
                <AntDesign name="minuscircle" color="#ffaa91" size={40} />
              </TouchableOpacity>
              <Text>{banyak}</Text>
              <TouchableOpacity
                onPress={() => {
                  setBanyak(banyak + 1);
                }}>
                <AntDesign name="pluscircle" color="#ffaa91" size={40} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={{alignSelf: 'center', marginTop: 20}}
              onPress={() => {
                if (kamar.nama != '') {
                  addData();
                } else {
                  alert('Pastikan Nama Kamar Sudah Diisi');
                }
              }}>
              <View
                style={{
                  width: 0.6 * screenWidth,
                  height: 50,
                  backgroundColor: '#ffaa91',
                  borderRadius: 25,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: 'white',
                  }}>
                  Tambah Kamar
                </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
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
