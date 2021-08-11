import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const FormKu = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.containerUp}></View>
      <View style={styles.containerBot}></View>
      <View style={styles.relModal}>
        <View style={{paddingTop: 65, position: 'relative'}}>
          <Text
            style={{
              marginBottom: 15,
              fontSize: 24,
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#636e72',
            }}>
            Tambah Data Kamar
          </Text>
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
            />
          </View>
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
            <TouchableOpacity onPress={() => alert('ayaya')}>
              <AntDesign name="minuscircle" color="#46ce7c" size={40} />
            </TouchableOpacity>
            <Text>1</Text>
            <TouchableOpacity>
              <AntDesign name="pluscircle" color="#46ce7c" size={40} />
            </TouchableOpacity>
          </View>
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
          <TouchableOpacity style={{alignSelf: 'center', marginTop: 20}}>
            <View
              style={{
                width: 0.6 * screenWidth,
                height: 50,
                backgroundColor: '#46ce7c',
                borderRadius: 25,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
                Tambah Kamar
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FormKu;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  containerUp: {
    flex: 1,
    backgroundColor: '#46ce7c',
  },
  containerBot: {
    flex: 4,
  },
  relModal: {
    position: 'absolute',
    width: 0.8 * screenWidth,
    height: 400,
    right: 0.1 * screenWidth,
    top: 0.1 * screenHeight,
    borderRadius: 20,
    elevation: 5,
    backgroundColor: 'white',
  },
});
