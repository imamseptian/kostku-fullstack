import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {myAxios} from '../../function/MyAxios';
import {
  APIUrl,
  myColor,
  screenWidth,
  screenHeight,
  startingYear,
  formatRupiah,
  rupiahToInt,
} from '../../function/MyVar';

const ModalAddPengeluaran = (props) => {
  const [pengeluaran, setpengeluaran] = useState({
    judul: '',
    jumlah: 0,
    id_kost: props.id_kost,
  });

  const [formatHarga, setformatHarga] = useState(
    formatRupiah(pengeluaran.jumlah.toString(), 'Rp. '),
  );

  useEffect(() => {
    setpengeluaran({...pengeluaran, jumlah: rupiahToInt(formatHarga)});
  }, [formatHarga]);

  const submitPengeluaran = () => {
    const source = axios.CancelToken.source();
    myAxios.postAxios(
      APIUrl + '/api/pengeluaran',
      pengeluaran,
      props.token,
      source.token,
      onPost,
    );
    function onPost(status, data) {
      if (status == 'success') {
        alert('Sukses Ditambahkan');
        props.refresh();
        props.tutupmodal();
      } else if (status == 'cancel') {
        console.log('caught cancel filter');
      } else {
        console.log(data);
        console.log(pengeluaran);
      }
    }
  };

  // const sekarang = () => {
  //   let myhours = new Date().getHours();
  //   console.log(myhours);
  //   let month = new Date().getMonth() + 1; //To get the Current Month
  //   console.log(month);
  //   let year = new Date().getFullYear(); //To get the Current Year
  //   console.log(year);

  //   let dataTahun = [];
  //   let tahun = 2020;
  //   while (tahun <= startingYear) {
  //     let oneyear = {tahun: tahun};
  //     dataTahun.push(oneyear);
  //     tahun = tahun + 1;
  //   }

  //   console.log(dataTahun);
  // };

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
          paddingVertical: 10,
          width: props.lebar * 0.88,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 20,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 5,
          paddingHorizontal: 15,
          backgroundColor: '#f6f6f6',
        }}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: 'OpenSans-SemiBold',
            color: myColor.fbtx,
            textAlign: 'center',
            marginBottom: 20,
          }}>
          Tambah Data Pengeluaran
        </Text>

        <TextInput
          style={{
            borderRadius: 5,
            borderWidth: 1,
            borderColor: myColor.divider,
            fontFamily: 'OpenSans-Regular',
            fontSize: 12,
            color: myColor.fbtx,
            paddingHorizontal: 10,
            marginBottom: 10,
          }}
          value={pengeluaran.judul}
          placeholder="Nama Pengeluaran"
          onChangeText={(e) => setpengeluaran({...pengeluaran, judul: e})}
          // onChangeText={(v) => {
          //   // setForm('harga', parseInt(v));
          //   // console.log(v);
          //   if (v.length < 5) {
          //     setformatHarga(formatRupiah('0', 'Rp. '));
          //   } else {
          //     setformatHarga(formatRupiah(v, 'Rp. '));
          //   }
          // }}
        />

        <TextInput
          style={{
            borderRadius: 5,
            borderWidth: 1,
            borderColor: myColor.divider,
            fontFamily: 'OpenSans-Regular',
            fontSize: 12,
            color: myColor.fbtx,
            paddingHorizontal: 10,
            marginBottom: 10,
          }}
          value={formatHarga}
          placeholder="Nominal Pengeluaran"
          keyboardType="numeric"
          // onChangeText={(e) => {
          //   if (e.length < 1) {
          //     setpengeluaran({...pengeluaran, jumlah: parseInt(0)});
          //   } else {
          //     setpengeluaran({...pengeluaran, jumlah: parseInt(e)});
          //   }
          // }}
          onChangeText={(v) => {
            // setForm('harga', parseInt(v));
            // console.log(v);
            if (v.length < 5) {
              setformatHarga(formatRupiah('0', 'Rp. '));
            } else {
              setformatHarga(formatRupiah(v, 'Rp. '));
            }
          }}
        />
        <TouchableOpacity
          // onPress={() => submitPengeluaran()}
          onPress={() => {
            Alert.alert(
              'Konfirmasi',
              'Apakah anda yakin data yang diisi telah sesuai ? data pengeluaran tidak bisa dihapus/diedit setelah dibuat',
              [
                {
                  text: 'Batal',
                  onPress: () => console.log('batal'),
                  style: 'cancel',
                },
                {text: 'Ya', onPress: () => submitPengeluaran()},
              ],
              {cancelable: false},
            );
          }}>
          <View
            style={{
              paddingVertical: 10,
              alignItems: 'center',
              backgroundColor: myColor.addfacility,
              borderRadius: 5,
              marginBottom: 10,
            }}>
            <Text
              style={{
                fontFamily: 'OpenSans-SemiBold',
                fontSize: 12,
                color: myColor.fbtx,
              }}>
              Tambah Data
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={props.tutupmodal}>
          <View
            style={{
              paddingVertical: 10,
              alignItems: 'center',
              backgroundColor: myColor.alert,
              borderRadius: 5,
            }}>
            <Text
              style={{
                fontFamily: 'OpenSans-SemiBold',
                fontSize: 12,
                color: '#fff',
              }}>
              Tutup
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ModalAddPengeluaran;

const styles = StyleSheet.create({
  textInput: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
  },
});
