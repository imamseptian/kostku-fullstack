import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {myColor, formatRupiah} from '../function/MyVar';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const FlatListTransaksi = (props) => {
  return (
    <View
      style={{
        width: 0.9 * screenWidth,
        height: 100,
        flexDirection: 'row',
      }}>
      <View
        style={{
          height: 100,
          alignItems: 'center',
          justifyContent: 'center',
          borderRightWidth: 1,
          borderRightColor: myColor.myblue,
          width: 100,
          position: 'relative',
        }}>
        <Text style={styles.text}>
          {props.data.bulan}, {props.data.tahun}
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            height: 25,
            justifyContent: 'center',
            position: 'absolute',
            right: -(12 / 2),
          }}>
          <View
            style={{
              width: 12,
              height: 12,
              backgroundColor: myColor.myblue,
              borderRadius: 12 / 2,
            }}></View>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          alignItems: 'center',
          marginLeft: 20,
          flexDirection: 'row',
        }}>
        <FontAwesome5
          name="money-bill-wave"
          color={myColor.blackText}
          size={15}
          style={{
            marginRight: 5,
          }}
        />
        <View style={{marginLeft: 5}}>
          <Text
            numberOfLines={2}
            style={[styles.text, {maxWidth: 0.7 * screenWidth - 100}]}>
            {props.data.judul}
          </Text>
          <Text style={styles.price}>
            {formatRupiah(props.data.jumlah.toString(), 'Rp. ')}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default FlatListTransaksi;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 13,
    color: myColor.blackText,
  },
  price: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    color: myColor.fbtx,
  },
});
