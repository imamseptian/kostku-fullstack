import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import {myColor, formatRupiah, dataBulan} from '../../function/MyVar';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const ModalRiwayat = (props) => {
  let tanggal_tagihan = new Date(props.data.tanggal_tagihan);
  let tanggal_pelunasan = new Date(props.data.tanggal_pelunasan);

  const biaya_barang = () => {
    let totalBiayaBarang = 0;
    props.data.barang.forEach((x, i) => {
      totalBiayaBarang = totalBiayaBarang + parseInt(x.total);
    });

    return totalBiayaBarang;
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
      }}>
      <View
        style={{
          maxHeight: screenHeight * 0.75,
          paddingHorizontal: 10,
          paddingVertical: 5,
          width: screenWidth * 0.88,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 20,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 5,

          backgroundColor: 'white',
          // position: 'absolute',
          // top: 0.5 * screenHeight - 0.5 * (0.5 * screenHeight),
          // left: 0.5 * screenWidth - 0.5 * (0.8 * screenWidth),
          elevation: 5,
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            color: myColor.blackText,
            fontSize: 15,
            marginBottom: 20,
          }}>
          Detail Transaksi
        </Text>
        <ScrollView>
          <View style={styles.fieldWrapper}>
            <Text style={styles.subtitle}>Nama Kamar</Text>
            <Text>:</Text>
            <Text style={styles.konten}>{props.data.kamar.nama}</Text>
          </View>

          <View style={styles.fieldWrapper}>
            <Text style={styles.subtitle}>Biaya Sewa Kamar</Text>
            <Text>: </Text>
            <Text style={styles.konten}>
              {formatRupiah(props.data.kamar.harga.toString(), 'Rp. ')}
            </Text>
          </View>

          <View style={styles.fieldWrapper}>
            <Text style={styles.subtitle}>Biaya Barang</Text>
            <Text>: </Text>
            <View style={{flex: 1, marginLeft: 10}}>
              {props.data.barang.map((x, i) => {
                return (
                  <View
                    key={i}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: 10,
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={[styles.itemBarang, {minWidth: 20}]}>
                        {i + 1}.
                      </Text>
                      <Text style={[styles.itemBarang, {width: 70}]}>
                        {x.nama}
                      </Text>
                      <Text style={styles.itemBarang}>=</Text>
                    </View>

                    <Text style={styles.itemBarang}>
                      {formatRupiah(x.total.toString(), 'Rp. ')}
                      {/* Rp 1.000.000 */}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>

          <View style={styles.fieldWrapper}>
            <Text style={styles.subtitle}>Total Bayar</Text>
            <Text>: </Text>
            <Text style={styles.konten}>
              {formatRupiah(props.data.jumlah.toString(), 'Rp. ')}
            </Text>
          </View>

          <View style={styles.fieldWrapper}>
            <Text style={styles.subtitle}>Tanggal Transaksi</Text>
            <Text>: </Text>
            <Text style={styles.konten}>
              {tanggal_pelunasan.getUTCDate()}-
              {dataBulan[tanggal_pelunasan.getUTCMonth()].nama}-
              {tanggal_pelunasan.getUTCFullYear()},{' '}
              {tanggal_pelunasan.getUTCHours()}
              {':'}
              {tanggal_pelunasan.getUTCMinutes()} WIB
            </Text>
          </View>
        </ScrollView>

        <TouchableNativeFeedback onPress={props.closeModal}>
          <View
            style={{
              marginTop: 10,
              paddingVertical: 10,
              borderRadius: 5,
              paddingHorizontal: 30,
              backgroundColor: myColor.myblue,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 14, fontWeight: 'bold', color: '#fff'}}>
              Tutup
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};

export default ModalRiwayat;

const styles = StyleSheet.create({
  subtitle: {
    width: 0.2 * screenWidth,
    paddingRight: 5,
    color: myColor.fbtx,
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 12,
  },
  konten: {
    flex: 1,
    fontSize: 12,
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    marginLeft: 10,
    color: myColor.darkText,
    textAlign: 'right',
  },
  fieldWrapper: {
    flexDirection: 'row',
    width: 0.8 * screenWidth,
    minHeight: 50,
    borderBottomWidth: 0.5,
    alignItems: 'center',
    paddingVertical: 5,
  },
  judul: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 12,
    color: myColor.fbtx,
  },
  itemBarang: {
    fontFamily: 'OpenSans-Regular',
    color: myColor.darkText,
    fontSize: 12,
  },
});
