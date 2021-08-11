import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {myColor, formatRupiah} from '../../../function/MyVar';

const ItemPengeluaran = (props) => {
  return (
    <View
      style={{
        borderBottomColor: myColor.darkText,
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
      }}>
      <Text
        style={{
          fontSize: 12,
          fontFamily: 'OpenSans-SemiBold',
          color: myColor.fbtx,
          maxWidth: 0.6 * props.lebar,
        }}>
        {props.data.judul}
      </Text>

      <View>
        <Text
          style={{
            fontSize: 12,
            fontFamily: 'OpenSans-Regular',
            color: myColor.fbtx,
            textAlign: 'right',
          }}>
          {formatRupiah(props.data.jumlah.toString(), 'Rp. ')}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontFamily: 'OpenSans-Regular',
            color: myColor.fbtx,
            textAlign: 'right',
          }}>
          {props.data.hari}-{props.data.bulan}-{props.data.tahun}
        </Text>
      </View>
    </View>
  );
};

export default ItemPengeluaran;

const styles = StyleSheet.create({});
