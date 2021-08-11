import React from 'react';
import {StyleSheet, Text, View, TouchableNativeFeedback} from 'react-native';
import {
  myColor,
  screenWidth,
  screenHeight,
  formatRupiah,
  dataBulan,
} from '../../../function/MyVar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const ItemTransaksi = (props) => {
  const navigation = useNavigation();

  const tanggal_transaksi = new Date(props.data.tanggal_transaksi);

  return (
    <TouchableNativeFeedback
      onPress={() =>
        navigation.navigate('KeuanganStackScreen', {
          screen: 'DetailKeuangan',
          params: {
            page: props.data.id_tagihan != null ? 1 : 0,
          },
        })
      }>
      <View
        style={{
          paddingVertical: 10,
          marginBottom: 10,
          borderRadius: 5,
          backgroundColor: 'white',
          marginHorizontal: 0.05 * screenWidth,
          alignItems: 'center',
          flexDirection: 'row',
          paddingHorizontal: 10,
          justifyContent: 'space-between',
          borderWidth: 1,
          borderColor: myColor.divider,
        }}>
        <View style={{width: '60%'}}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 12,
              fontFamily: 'OpenSans-SemiBold',
              color: myColor.fbtx,
            }}>
            {props.data.id_tagihan != null
              ? props.data.nama_penghuni
              : props.data.judul}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 12,
              fontFamily: 'OpenSans-Regular',
              color: myColor.fbtx,
              marginTop: 5,
            }}>
            {tanggal_transaksi.getUTCDate()}{' '}
            {dataBulan[tanggal_transaksi.getUTCMonth()].nama}{' '}
            {tanggal_transaksi.getUTCFullYear()}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 12,
              fontFamily: 'OpenSans-Regular',
              color: myColor.fbtx,
              marginTop: 5,
            }}>
            {tanggal_transaksi.getUTCHours()}:
            {tanggal_transaksi.getUTCMinutes()} WIB
          </Text>
        </View>
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
          <Text
            style={{
              fontSize: 12,
              fontFamily: 'OpenSans-Regular',
              color: myColor.fbtx,
            }}>
            {formatRupiah(props.data.jumlah.toString(), 'Rp. ')}
          </Text>
          <AntDesign
            name={props.data.id_tagihan != null ? 'caretup' : 'caretdown'}
            color={
              props.data.id_tagihan != null ? myColor.success : myColor.alert
            }
            size={15}
            style={{marginLeft: 3}}
          />
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default ItemTransaksi;

const styles = StyleSheet.create({});
