import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {formatRupiah, myColor, dataBulan} from '../function/MyVar';

const screenWidth = Dimensions.get('window').width;

const FlatListTagihan = ({data}) => {
  let tanggal_tagihan = new Date(data.tanggal_tagihan);

  return (
    <TouchableNativeFeedback onPress={() => alert('todo')}>
      <View
        style={{
          marginTop: 10,
          backgroundColor: 'white',
          borderRadius: 10,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
          borderWidth: 1,
          borderColor: myColor.divider,
          margin: 3,
          paddingVertical: 10,
        }}>
        <MaterialIcons
          name="attach-money"
          color={myColor.success}
          size={30}
          style={{
            marginRight: 5,
          }}
        />
        <View
          style={{
            flex: 1,

            marginLeft: 5,
            justifyContent: 'center',
          }}>
          <Text style={styles.textJudul}>
            {dataBulan[tanggal_tagihan.getMonth()].nama}{' '}
            {tanggal_tagihan.getFullYear()}
          </Text>
          <Text style={styles.textHarga}>
            {formatRupiah(data.jumlah.toString(), 'Rp. ')}
          </Text>
        </View>
        <MaterialIcons
          name="attach-money"
          color={myColor.success}
          size={30}
          style={{
            marginRight: 5,
          }}
        />
      </View>
    </TouchableNativeFeedback>
  );
};

export default FlatListTagihan;

const styles = StyleSheet.create({
  textInfo: {fontFamily: 'OpenSans-Regular', fontSize: 13},
  textJudul: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 16,
    color: myColor.myblue,
    maxWidth: 0.5 * screenWidth,
  },
  textHarga: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    color: myColor.darkText,
  },
});
