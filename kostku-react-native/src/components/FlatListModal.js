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

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

import {myColor} from '../function/MyVar';

const FlatListModal = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        style={{
          marginTop: 10,
          width: screenWidth * 0.8,
          backgroundColor: '#ffffff',

          // elevation: 5,
          borderRadius: 10,
          flexDirection: 'row',
          paddingHorizontal: 10,
          borderWidth: 1,
          borderColor: myColor.divider,
        }}>
        <View
          style={{
            marginVertical: 10,
            height: 54,
            width: 54,
            borderRadius: 27,
            borderWidth: 2,
            borderColor: myColor.myWhite,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 5,
          }}>
          <Image
            source={{
              uri:
                'https://wpq0221c4a-flywheel.netdna-ssl.com/wp-content/uploads/2018/12/AdmiralBulldog-150x150.jpg',
            }}
            style={{height: 50, width: 50, borderRadius: 25}}
          />
          {/* <View
                style={{
                  height: 70,
                  width: 70,
                  borderRadius: 35,
                  backgroundColor: myColor.etcbuble,
                }}></View> */}
        </View>

        <View
          style={{
            marginLeft: 15,
            marginVertical: 10,
            justifyContent: 'center',
            flex: 1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text numberOfLines={1} style={styles.nama}>
                {props.data.nama_depan} {props.data.nama_belakang}
              </Text>
              <View
                style={{
                  marginLeft: 10,
                  height: 20,
                  minWidth: 30,
                  backgroundColor:
                    props.data.tagihan > 0 ? myColor.alert : myColor.success,
                  borderRadius: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: props.data.tagihan < 1 ? myColor.blackText : '#fff',
                  }}>
                  {0 - props.data.tagihan}
                  {/* {props.data.id} */}
                </Text>
              </View>
            </View>
          </View>

          <View style={{marginTop: 5}}>
            <Text style={styles.harga}>
              {props.data.nama_kamar} (Rp {props.data.harga_kamar} / Bulan){' '}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FlatListModal;

const styles = StyleSheet.create({
  nama: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 14,
  },
  harga: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
  },
});
