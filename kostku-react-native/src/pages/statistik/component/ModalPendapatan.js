import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  screenWidth,
  myColor,
  screenHeight,
  APIUrl,
  formatRupiah,
} from '../../../function/MyVar';
import DompetSVG from '../../../asset/image/dompet_svg.svg';
import {ModalItemPembayar} from '../atom';
import axios from 'axios';

const ModalPendapatan = ({data, closeModal, ...rest}) => {
  // const {data, ...rest} = this.props;
  const [dataTransaksi, setdataTransaksi] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    setisLoading(true);
    axios
      .post(APIUrl + '/api/modal_keuangan', {
        id_kost: 1,
        jenis: 1,
        bulan: data.bulan,
        tahun: data.tahun,
      })
      .then((res) => {
        setdataTransaksi(res.data.data);
        setisLoading(false);
      });
  }, [data]);

  const DaftarTransaksi = () =>
    dataTransaksi.map((item, index) => {
      return (
        <ModalItemPembayar
          data={item}
          title={item.nama_depan + ' ' + item.nama_belakang}
          key={index}
        />
      );
    });

  return (
    <View
      style={{
        paddingBottom: 10,
        width: screenWidth * 0.88,
        borderRadius: 10,
        backgroundColor: 'white',
        elevation: 5,
        paddingHorizontal: 0.03 * screenWidth,
        paddingTop: 5,
      }}>
      <View
        style={{
          position: 'relative',
          paddingBottom: 5,
          borderBottomWidth: 1,
          borderBottomColor: myColor.divider,
        }}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: 'OpenSans-SemiBold',
            color: myColor.fbtx1,
          }}>
          {/* September,2020 */}
          {/* {JSON.stringify(data)} */}
          {(() => {
            if (data.bulan == 1) {
              return 'Januari';
            } else if (data.bulan == 2) {
              return 'Februari';
            } else if (data.bulan == 3) {
              return 'Maret';
            } else if (data.bulan == 4) {
              return 'April';
            } else if (data.bulan == 5) {
              return 'Mei';
            } else if (data.bulan == 6) {
              return 'Juni';
            } else if (data.bulan == 7) {
              return 'Juli';
            } else if (data.bulan == 8) {
              return 'Agustus';
            } else if (data.bulan == 9) {
              return 'September';
            } else if (data.bulan == 10) {
              return 'Oktober';
            } else if (data.bulan == 11) {
              return 'November';
            } else {
              return 'Desember';
            }
          })()}
          {`, ${data.tahun}`}
        </Text>

        <Text
          style={{
            fontSize: 16,
            fontFamily: 'OpenSans-Bold',
            color: myColor.fbtx,
          }}>
          Pendapatan
        </Text>
        <Text
          style={{
            marginTop: 10,
            fontSize: 16,
            fontFamily: 'OpenSans-Bold',
            color: myColor.fbtx,
          }}>
          {formatRupiah(data.value.toString(), 'Rp. ')}
          {/* Rp 30.000.000 */}
          {/* {JSON.stringify(data)} */}
        </Text>
        <View style={{position: 'absolute', top: 0, right: 0}}>
          <DompetSVG width={50} height={50} />
        </View>
      </View>

      <View style={{marginTop: 10}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{maxHeight: 0.3 * screenHeight}}>
          {isLoading ? (
            <ActivityIndicator size="large" color={myColor.colorTheme} />
          ) : (
            <DaftarTransaksi />
          )}
          {/* <ModalItemPembayar />
          <ModalItemPembayar />
          <ModalItemPembayar />
          <ModalItemPembayar />

          <ModalItemPembayar />
          <ModalItemPembayar />
          <ModalItemPembayar />
          <ModalItemPembayar />
          <ModalItemPembayar />
          <ModalItemPembayar />
          <ModalItemPembayar />
          <ModalItemPembayar />

          <ModalItemPembayar /> */}
        </ScrollView>
      </View>
      <TouchableOpacity onPress={() => alert('todo')}>
        <View
          style={{
            backgroundColor: myColor.myblue,
            borderRadius: 10,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{
              fontSize: 14,
              color: '#fff',
              fontFamily: 'OpenSans-Bold',
            }}>
            Ke Detail Pendapatan
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={closeModal}>
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 10,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
            borderWidth: 1,
          }}>
          <Text
            style={{
              fontSize: 14,
              color: myColor.fbtx,
              fontFamily: 'OpenSans-Bold',
            }}>
            Tutup
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ModalPendapatan;

const styles = StyleSheet.create({});
