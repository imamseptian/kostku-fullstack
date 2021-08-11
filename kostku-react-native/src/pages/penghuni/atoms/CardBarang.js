import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {
  myColor,
  defaultAsset,
  screenWidth,
  formatRupiah,
  rupiahToInt,
} from '../../../function/MyVar';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const CardBarang = (props) => {
  return (
    <View style={styles.wrapperCard}>
      <View style={styles.wrapperTitle}>
        {/* <Entypo name="calendar" size={20} color={myColor.grayGoogle} /> */}
        {props.children}
        <Text
          style={{
            fontSize: 12,
            fontFamily: 'OpenSans-SemiBold',
            color: myColor.darkText,
            marginLeft: 3,
          }}>
          {props.title}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 12,
            fontFamily: 'OpenSans-Regular',
            width: 23,
          }}>
          {props.data.qty}x
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontFamily: 'OpenSans-Regular',
            width: '45%',
            paddingHorizontal: 5,
          }}>
          {props.data.nama}
          {/* {JSON.stringify(props.data)} */}
        </Text>
        <Text
          style={{marginLeft: 5, fontFamily: 'OpenSans-Regular', fontSize: 12}}>
          =
        </Text>
        <TextInput
          keyboardType="numeric"
          value={formatRupiah(props.data.total.toString(), 'Rp. ')}
          style={{
            height: 40,
            justifyContent: 'center',
            paddingHorizontal: 10,
            flex: 1,
            borderBottomWidth: 1,
            fontFamily: 'OpenSans-Regular',
            fontSize: 12,
          }}
          onChangeText={(v) => {
            if (v.length < 5) {
              // setformatHarga(formatRupiah('0', 'Rp. '));
              props.ubahHarga(0, props.index, 'total');
            } else {
              // setformatHarga(formatRupiah(v, 'Rp. '));
              props.ubahHarga(rupiahToInt(v), props.index, 'total');
            }
            // handleInputChange(parseInt(v), i, 'total');

            // setbarangPenghuni({...barangPenghuni, total: rupiahToInt(formatHarga)});
          }}
        />
        <Text
          style={{marginLeft: 5, fontFamily: 'OpenSans-Regular', fontSize: 12}}>
          / Bulan
        </Text>
      </View>
    </View>
  );
};

export default CardBarang;

const styles = StyleSheet.create({
  wrapperCard: {
    paddingVertical: 15,
    elevation: 3,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    position: 'relative',
    marginBottom: 15,
  },
  wrapperTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: -10,
    left: 10,
  },
});
