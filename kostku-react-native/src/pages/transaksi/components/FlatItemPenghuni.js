import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {
  myColor,
  screenWidth,
  formatRupiah,
  APIUrl,
} from '../../../function/MyVar';

const FlatItemPenghuni = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        style={{
          marginTop: 10,
          backgroundColor: '#ffffff',

          // elevation: 5,
          borderRadius: 10,
          flexDirection: 'row',
          paddingHorizontal: 10,
          borderWidth: 1,
          borderColor: myColor.divider,
          alignItems: 'center',
          paddingVertical: 8,
        }}>
        <Image
          source={{
            uri: APIUrl + '/storage/images/pendaftar/' + props.data.foto_diri,
            // uri: `https://i.pinimg.com/564x/41/73/68/4173687c3ced72dc678b9608a3f43285.jpg`,
          }}
          style={{
            height: 50,
            width: 50,
            borderRadius: 25,
            borderWidth: 2,
            borderColor: myColor.darkText,
            backgroundColor: myColor.divider,
          }}
        />
        {/* <View
                style={{
                  height: 70,
                  width: 70,
                  borderRadius: 35,
                  backgroundColor: myColor.etcbuble,
                }}></View> */}

        <View
          style={{
            marginLeft: 15,
            flex: 1,
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text numberOfLines={1} style={styles.nama}>
              {props.data.nama}
            </Text>
            <View
              style={{
                marginLeft: 10,
                height: 20,
                minWidth: 30,
                backgroundColor:
                  props.data.count > 0 ? myColor.alert : myColor.success,
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  color: props.data.count < 1 ? myColor.blackText : '#fff',
                }}>
                {0 - props.data.count}
                {/* {props.data.id} */}
              </Text>
            </View>
          </View>

          <Text style={styles.harga}>{props.data.nama_kamar}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FlatItemPenghuni;

const styles = StyleSheet.create({
  nama: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 14,
    maxWidth: '70%',
  },
  harga: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    marginTop: 5,
  },
});
