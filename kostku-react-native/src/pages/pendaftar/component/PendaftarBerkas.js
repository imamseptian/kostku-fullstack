import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  myColor,
  screenHeight,
  screenWidth,
  APIUrl,
} from '../../../function/MyVar';

const PendaftarBerkas = ({data, onPress}) => {
  return (
    <View>
      {/* <Text style={{textAlign: 'center', fontSize: 20}}>
        {data.nama_depan} {data.nama_belakang}
      </Text> */}
      <View
        style={{
          marginTop: 10,
          width: 0.9 * screenWidth,
          marginHorizontal: 0.05 * screenWidth,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15,
          }}>
          <View style={{width: 100}}>
            <Text style={styles.textInfo}>Nomor KTP </Text>
          </View>
          <Text style={styles.textInfo}>: {data.noktp}</Text>
        </View>
        <View
          style={{
            marginBottom: 15,
          }}>
          <View style={{width: 100}}>
            <Text style={styles.textInfo}>Foto KTP </Text>
          </View>
          <TouchableWithoutFeedback onPress={onPress}>
            <Image
              source={{
                uri:
                  'https://dry-forest-53707.herokuapp.com/kostdata/pendaftar/foto/' +
                  data.foto_ktp,
              }}
              style={{
                width: 0.7 * screenWidth,
                height: (2 / 3) * (0.7 * screenWidth),
                borderRadius: 10,
              }}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};

export default PendaftarBerkas;

const styles = StyleSheet.create({
  textInfo: {fontSize: 13, fontFamily: 'OpenSans-Regular'},
});
