import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {myColor, formatRupiah, dataBulan} from '../../../function/MyVar';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const FlatListTransaksiBayar = (props) => {
  let tanggal_pelunasan = new Date(props.data.tanggal_pelunasan);
  return (
    <TouchableOpacity onPress={() => props.fungsi(props.data)}>
      <View
        style={{
          flexDirection: 'row',

          minHeight: 50,
          backgroundColor: 'white',
          marginBottom: 10,
          borderWidth: 1,
          borderColor: myColor.divider,
          borderRadius: 5,
          margin: 3,
          alignItems: 'center',
          paddingVertical: 10,
          justifyContent: 'space-between',
          paddingHorizontal: 10,
        }}>
        <Text numberOfLines={2} style={styles.harga}>
          {formatRupiah(props.data.jumlah.toString(), 'Rp. ')}
        </Text>
        <View>
          <Text numberOfLines={1} style={[styles.judul, {marginBottom: 5}]}>
            {tanggal_pelunasan.getUTCDate()}{' '}
            {dataBulan[tanggal_pelunasan.getUTCMonth()].nama}{' '}
            {tanggal_pelunasan.getUTCFullYear()}
            {/* {JSON.stringify(tanggal_pelunasan)} */}
            {/* {tanggal_tagihan.toString()} */}
          </Text>
          <Text numberOfLines={1} style={styles.judul}>
            {tanggal_pelunasan.getUTCHours()}:
            {tanggal_pelunasan.getUTCMinutes()} WIB
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FlatListTransaksiBayar;

const styles = StyleSheet.create({
  judul: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    maxWidth: 0.4 * screenWidth,
    color: myColor.darkText,
    textAlign: 'right',
  },
  harga: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 12,
    maxWidth: 0.5 * screenWidth,
    color: myColor.fbtx,
  },
});
