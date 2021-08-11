import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {
  myColor,
  screenWidth,
  formatRupiah,
  APIUrl,
  defaultAsset,
} from '../../function/MyVar';

const ListData = (props) => {
  let tanggal_transaksi = new Date(props.data.tanggal_transaksi);

  const [fotoProfil, setfotoProfil] = useState(
    APIUrl + '/storage/images/pendaftar/' + props.data.foto_diri,
  );

  return (
    <TouchableOpacity
      onPress={props.onClickPemasukan}
      // onPress={() => {
      //   console.log(
      //     APIUrl + '/storage/images/pendaftar/' + props.data.foto_diri,
      //   );
      // }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 75,
          paddingHorizontal: 10,
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={{
              uri: fotoProfil,
            }}
            style={{height: 50, width: 50, borderRadius: 25}}
            onError={(e) => setfotoProfil(defaultAsset.yupi)}
          />
          <View style={{marginLeft: 10}}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'OpenSans-SemiBold',
                color: myColor.fbtx,
              }}>
              {props.data.nama_penghuni}
              {/* {JSON.stringify} */}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'OpenSans-Regular',
                color: myColor.darkText,
              }}>
              {/* {props.data.waktu} WIB */}
              {tanggal_transaksi.getUTCHours()}:
              {tanggal_transaksi.getUTCMinutes()} WIB
            </Text>
          </View>
        </View>
        <View>
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'OpenSans-Regular',
              color: myColor.fbtx,
            }}>
            {formatRupiah(props.data.jumlah.toString(), 'Rp. ')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListData;

const styles = StyleSheet.create({});
