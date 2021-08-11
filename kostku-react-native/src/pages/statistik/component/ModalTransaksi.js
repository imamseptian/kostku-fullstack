import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {
  screenWidth,
  APIUrl,
  defaultAsset,
  myColor,
  dataBulan,
} from '../../../function/MyVar';
import {ModalItemTransaksi} from '../atom';
import DompetSVG from '../../../asset/image/dompet_svg.svg';

const ModalTransaksi = (props) => {
  const [dataTransaksi, setdataTransaksi] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  let tanggal_transaksi = new Date(props.data.tanggal_transaksi);

  useEffect(() => {
    setisLoading(true);
    axios
      .get(
        APIUrl +
          `/api/get_transaksi/1/${props.jenis}/${
            tanggal_transaksi.getUTCMonth() + 1
          }/${tanggal_transaksi.getUTCFullYear()}`,
        {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        },
      )
      .then((res) => {
        setdataTransaksi(res.data.data);
        setisLoading(false);
      })
      .catch((error) => {
        console.log(error);
        console.log('error get transaksi');
        setisLoading(false);
      });
  }, [props.data]);

  return (
    <View
      style={{
        backgroundColor: '#f6f6f6',
        width: 0.9 * props.lebar,
        maxHeight: '90%',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 5,
        paddingBottom: 15,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 10,
          borderBottomWidth: 1,
          borderBottomColor: myColor.divider,
        }}>
        <View>
          <Text
            style={{
              fontFamily: 'OpenSans-SemiBold',
              fontSize: 14,
              color: myColor.fbtx,
            }}>
            {props.jenis == 1 ? 'Pemasukan' : 'Pengeluaran'}
          </Text>
          <Text
            style={{
              fontFamily: 'OpenSans-SemiBold',
              fontSize: 14,
              color: myColor.fbtx,
            }}>
            {dataBulan[tanggal_transaksi.getUTCMonth()].nama}{' '}
            {tanggal_transaksi.getUTCFullYear()}
          </Text>
        </View>

        <DompetSVG width={50} height={50} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 0.05 * screenWidth,
          marginVertical: 5,
        }}>
        <Text style={{fontFamily: 'OpenSans-SemiBold', fontSize: 12}}>
          Total
        </Text>
        <Text style={{fontFamily: 'OpenSans-SemiBold', fontSize: 12}}>
          {dataTransaksi.length} Riwayat
        </Text>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color={myColor.colorTheme} />
      ) : (
        // <Text>{JSON.stringify(dataTransaksi)}</Text>
        <FlatList
          data={dataTransaksi}
          style={{paddingHorizontal: 0.05 * screenWidth}}
          keyExtractor={(item) => item.id.toString()}
          // extraData={selectedId}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index, separator}) => {
            return <ModalItemTransaksi data={item} jenis={props.jenis} />;
          }}
        />
      )}

      <View
        style={[styles.btNav, {backgroundColor: myColor.myblue, marginTop: 0}]}>
        <Text style={[styles.textNav, {color: '#fff'}]}>
          {props.jenis == 1
            ? 'Ke Halaman Riwayat Pemasukan'
            : 'Ke Halaman Riwayat Pengeluaran'}
        </Text>
      </View>
      <TouchableOpacity onPress={props.closeModal}>
        <View style={[styles.btNav, {backgroundColor: myColor.alert}]}>
          <Text style={[styles.textNav, {color: '#fff'}]}>Tutup</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ModalTransaksi;

const styles = StyleSheet.create({
  btNav: {
    paddingVertical: 10,
    borderRadius: 5,

    alignItems: 'center',
    marginHorizontal: 0.05 * screenWidth,
    marginTop: 10,
  },
  textNav: {
    fontFamily: 'OpenSans-SemiBold',

    fontSize: 12,
  },
});
