import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {APIUrl} from '../../../function/MyVar';

import {myColor, screenWidth, formatRupiah} from '../../../function/MyVar';
const ButtonDaftarPenghuni = (props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.onPress();
      }}>
      <View
        style={{
          backgroundColor: '#f6f6f6',
          minHeight: 60,
          borderRadius: 10,
          paddingHorizontal: 10,

          paddingVertical: 10,
        }}>
        {props.penghuni === undefined ? (
          //   <View
          //     style={{
          //       alignItems: 'center',
          //       justifyContent: 'center',
          //     }}>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text
              style={{
                fontSize: 14,
                color: myColor.darkText,
                fontFamily: 'OpenSans-SemiBold',
                //   textAlign: 'center',
              }}>
              Klik Disini untuk memilih penghuni
            </Text>
          </View>
        ) : (
          //   </View>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                height: 54,
                width: 54,
                borderRadius: 27,
                borderWidth: 2,
                borderColor: myColor.divider,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={{
                  uri:
                    APIUrl +
                    '/storage/images/pendaftar/' +
                    props.penghuni.foto_diri,
                }}
                style={{height: 50, width: 50, borderRadius: 25}}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginLeft: 10,
                flex: 1,
                // backgroundColor: 'red',
              }}>
              <View style={{flex: 1}}>
                <Text numberOfLines={1} style={styles.nama}>
                  {props.penghuni.nama}
                </Text>
                <Text style={styles.harga}>{props.penghuni.nama_kamar}</Text>
              </View>
              <AntDesign
                name="caretdown"
                color={myColor.blackText}
                size={15}
                style={{
                  marginRight: 5,
                }}
              />
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ButtonDaftarPenghuni;

const styles = StyleSheet.create({
  nama: {
    fontSize: 14,
    fontFamily: 'OpenSans-SemiBold',
    color: myColor.fbtx,
    maxWidth: 0.5 * screenWidth,
  },
  harga: {
    fontSize: 12,
    fontFamily: 'OpenSans-Regular',
    color: myColor.darkText,
    maxWidth: 0.5 * screenWidth,
  },
  tabWrapper: {
    width: 0.45 * screenWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textinfo: {
    fontSize: 12,
    color: myColor.fbtx,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
