import React from 'react';
import {StyleSheet, Text, View, ScrollView, StatusBar} from 'react-native';
import {
  myColor,
  screenWidth,
  dataBulan,
  formatRupiah,
} from '../../../function/MyVar';

const ModalDetailPemasukan = (props) => {
  let tanggal_transaksi = new Date(props.data.tanggal_transaksi);

  const totalBarang = () => {
    let total = 0;
    props.data.barang.forEach((x, i) => {
      total = total + parseInt(x.total);
    });

    return total;
  };

  const FieldData = ({subTitle, content}) => (
    <View style={styles.wrapperItem}>
      <Text
        style={{
          fontFamily: 'OpenSans-SemiBold',
          color: myColor.fbtx,
          fontSize: 12,
          maxWidth: 0.3 * props.lebar,
        }}>
        {subTitle}
      </Text>
      <Text
        style={{
          fontFamily: 'OpenSans-Regular',
          color: myColor.darkText,
          fontSize: 12,
          maxWidth: 0.5 * props.lebar,
          textAlign: 'right',
        }}>
        {content}
      </Text>
    </View>
  );

  return (
    <View
      style={{
        width: 0.88 * props.lebar,
        marginVertical: StatusBar.currentHeight + 20,
        backgroundColor: '#f6f6f6',
        paddingVertical: 10,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 5,
        paddingHorizontal: 15,
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 14,
          fontFamily: 'OpenSans-SemiBold',
          color: myColor.fbtx,
        }}>
        Detail Pemasukan
      </Text>
      {props.data != undefined ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{marginTop: 15}}>
          {/* <View
            style={styles.wrapperItem}>
            <Text
              style={styles.subTitle}>
              Nama
            </Text>
            <Text
              style={styles.contentItem}>
              {props.data.nama_depan} {props.data.nama_belakang}
            </Text>
          </View> */}
          <FieldData subTitle="Nama" content={`${props.data.nama_penghuni}`} />
          <FieldData subTitle="Kamar" content={`${props.data.nama_kamar}`} />
          <FieldData
            subTitle="Tanggal Bayar"
            content={`${tanggal_transaksi.getUTCDate()}-${
              dataBulan[tanggal_transaksi.getUTCMonth()].nama
            }-${tanggal_transaksi.getUTCFullYear()},${tanggal_transaksi.getUTCHours()}:${tanggal_transaksi.getUTCMinutes()} WIB`}
          />
          <View style={styles.sectionWrapper}>
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'OpenSans-SemiBold',
                color: myColor.fbtx,
              }}>
              Detail Pembayaran
            </Text>
          </View>
          <FieldData
            subTitle="Harga Kamar"
            content={formatRupiah(props.data.harga_kamar.toString(), 'Rp. ')}
          />
          <View
            style={{
              paddingTop: 10,
            }}>
            <Text
              style={{
                fontFamily: 'OpenSans-SemiBold',
                color: myColor.fbtx,
                fontSize: 12,
                marginBottom: 10,
              }}>
              Biaya Barang
            </Text>
            <View style={{borderBottomWidth: 1, paddingBottom: 5}}>
              {props.data.barang.map((x, i) => {
                return (
                  <View key={i} style={{marginBottom: 5, flexDirection: 'row'}}>
                    <Text style={styles.textContent}>{`${i + 1}.  `}</Text>
                    <Text
                      style={[
                        styles.textContent,
                        {width: 0.25 * props.lebar},
                      ]}>{`${x.nama}`}</Text>
                    <Text style={styles.textContent}>{`${x.qty} Item`}</Text>

                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',

                        justifyContent: 'space-between',
                        marginLeft: 3,
                      }}>
                      <Text style={styles.textContent}>=</Text>
                      <Text style={styles.textContent}>
                        {formatRupiah(x.total.toString(), 'Rp. ')}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
            <View style={styles.wrapperItem}>
              <Text
                style={{
                  fontFamily: 'OpenSans-SemiBold',
                  color: myColor.fbtx,
                  fontSize: 12,
                }}>
                {'Total Biaya Barang'}
              </Text>
              <Text
                style={{
                  fontFamily: 'OpenSans-Regular',
                  color: myColor.darkText,
                  fontSize: 12,
                  textAlign: 'right',
                }}>
                {formatRupiah(totalBarang().toString(), 'Rp. ')}
              </Text>
            </View>
          </View>
          <FieldData
            subTitle="Total Bayar"
            content={formatRupiah(props.data.jumlah.toString(), 'Rp. ')}
          />
        </ScrollView>
      ) : (
        <Text>KOSONG GAN</Text>
      )}
    </View>
  );
};

export default ModalDetailPemasukan;

const styles = StyleSheet.create({
  wrapperItem: {
    borderBottomWidth: 1,
    borderBottomColor: myColor.divider,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },

  sectionWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: myColor.divider,
    paddingVertical: 10,
    alignItems: 'center',
  },
  textContent: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    color: myColor.darkText,
  },
});
