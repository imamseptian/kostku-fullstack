import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {formatRupiah, myColor, dataBulan} from '../../../function/MyVar';
import AntDesign from 'react-native-vector-icons/AntDesign';

const AccordionPembayaran = (props) => {
  let tanggal_tagihan = new Date(props.data.tanggal_tagihan);
  return (
    // <TouchableOpacity
    //   onPress={props.onPress}
    //   style={styles.cardContainer}
    //   activeOpacity={0.7}>
    //   <View
    //     style={[
    //       styles.card,
    //       {backgroundColor: 'white', borderWidth: 1, borderRadius: 5},
    //     ]}>
    //     <Text style={[styles.heading]}>Tagihan {props.index}</Text>
    // {props.index === props.currentIndex && (
    //   <View style={styles.subCategoriesList}>
    //     <Text>{JSON.stringify(props.data)}</Text>
    //     {/* <Text>
    //       {props.data.bulan} {props.data.tahun}
    //     </Text> */}
    //   </View>
    // )}
    //   </View>
    // </TouchableOpacity>
    <TouchableOpacity
      onPress={props.onPress}
      style={styles.cardTagihan}
      activeOpacity={0.5}>
      <View style={styles.itemHeader}>
        <Text style={styles.titleTagihan}>
          {/* {item.bulan} {item.tahun} */}
          {dataBulan[tanggal_tagihan.getUTCMonth()].nama}{' '}
          {tanggal_tagihan.getUTCFullYear()}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={[styles.titleHarga, {marginRight: 5}]}>
            {formatRupiah(props.data.jumlah.toString(), 'Rp. ')}
          </Text>
          <AntDesign
            name={
              props.index === props.currentIndex ? 'upcircle' : 'downcircle'
            }
            size={12}
            color={myColor.grayGoogle}
          />
        </View>
      </View>
      {props.index === props.currentIndex && (
        <View style={styles.subCategoriesList}>
          {/* <Text>
              {props.data.bulan} {props.data.tahun}
            </Text> */}
          <Text
            style={{
              fontFamily: 'OpenSans-SemiBold',
              fontSize: 14,
              textAlign: 'center',
              marginBottom: 10,
            }}>
            Detail Tagihan
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 5,
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontFamily: 'OpenSans-SemiBold',
                fontSize: 12,
                color: myColor.fbtx,
              }}>
              Harga Kamar
            </Text>
            <Text
              style={{
                fontFamily: 'OpenSans-SemiBold',
                fontSize: 12,
                color: myColor.darkText,
              }}>
              {formatRupiah(props.data.harga_kamar.toString(), 'Rp. ')}
            </Text>
          </View>
          <Text
            style={{
              fontFamily: 'OpenSans-SemiBold',
              color: myColor.fbtx,
              fontSize: 12,
              marginBottom: 5,
            }}>
            Biaya Barang Bawaan
          </Text>
          {props.data.barang.map((x, i) => {
            return (
              <View key={i} style={{flexDirection: 'row', marginBottom: 5}}>
                <Text style={styles.itemBarang}>{i + 1}.</Text>
                <Text style={[styles.itemBarang, {marginLeft: 3}]}>
                  {x.nama}
                </Text>
                <Text
                  style={{
                    flex: 1,
                    textAlign: 'right',
                    fontFamily: 'OpenSans-SemiBold',
                    fontSize: 12,
                    color: myColor.darkText,
                  }}>
                  {formatRupiah(x.total.toString(), 'Rp. ')}
                </Text>
              </View>
            );
          })}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default AccordionPembayaran;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },

  card: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  heading: {
    fontSize: 38,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: -2,
  },
  body: {
    fontSize: 20,
    lineHeight: 20 * 1.5,
    textAlign: 'center',
  },
  titleTagihan: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 12,
    color: myColor.fbtx,
  },
  titleHarga: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 12,
    color: myColor.grayGoogle,
  },
  cardTagihan: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: myColor.divider,
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  itemHeader: {flexDirection: 'row', justifyContent: 'space-between'},
  subCategoriesList: {
    marginTop: 10,
  },
  itemBarang: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
  },
});
