import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TextInputResp} from '../../../components';
import {
  APIUrl,
  formatRupiah,
  myColor,
  rupiahToInt,
  screenWidth,
} from '../../../function/MyVar';

const ModalTambahBarang = ({id_penghuni, refreshFunction, closeModal}) => {
  const [barangPenghuni, setbarangPenghuni] = useState({
    nama: '',
    qty: 1,
    total: 0,
    id_penghuni: id_penghuni,
  });

  const addBarang = () => {
    axios
      .post(APIUrl + '/api/add_barang_penghuni', barangPenghuni)
      .then((res) => {
        console.log(res.data);
        refreshFunction();
      });
  };

  const [formatHarga, setformatHarga] = useState(
    formatRupiah(barangPenghuni.total.toString(), 'Rp. '),
  );

  useEffect(() => {
    // setForm('harga', rupiahToInt(formatHarga));
    setbarangPenghuni({...barangPenghuni, total: rupiahToInt(formatHarga)});
    // rupiahToInt(formatHarga);
  }, [formatHarga]);

  return (
    <View style={styles.card}>
      <Text style={styles.modalTitle}>Tambah Barang</Text>
      <TextInputResp
        title="Nama Barang"
        placeholder="Nama Barang"
        onChangeText={(v) => {
          setbarangPenghuni({...barangPenghuni, nama: v});
        }}
        value={barangPenghuni.nama}
        pesanError={''}
      />
      {/* <TextInput
        value={barangPenghuni.nama}
        editable={false}
        // keyboardType="numeric"
        style={styles.textInput}
        placeholder="Nama Barang"
        onChangeText={(v) => {
          // handleInputChange(parseInt(v), i, 'total');
          setbarangPenghuni({...barangPenghuni, nama: v});
        }}
      /> */}
      <TextInputResp
        title="Jumlah Barang"
        placeholder="Jumlah Barang"
        keyboardType="numeric"
        onChangeText={(v) => {
          if (parseInt(v) < 1 || v.length < 1) {
            setbarangPenghuni({...barangPenghuni, qty: 0});
          } else {
            setbarangPenghuni({...barangPenghuni, qty: parseInt(v)});
          }
        }}
        value={barangPenghuni.qty.toString()}
        pesanError={''}
      />

      <TextInputResp
        title="Total Biaya"
        placeholder="Total Biaya"
        keyboardType="numeric"
        onChangeText={(v) => {
          // if (parseInt(v) < 1 || v.length < 1) {
          //   setbarangPenghuni({...barangPenghuni, total: 0});
          // } else {
          //   setbarangPenghuni({...barangPenghuni, total: parseInt(v)});
          // }
          if (v.length < 5) {
            setformatHarga(formatRupiah('0', 'Rp. '));
          } else {
            setformatHarga(formatRupiah(v, 'Rp. '));
          }
        }}
        value={formatRupiah(barangPenghuni.total.toString(), 'Rp.')}
        pesanError={''}
      />

      {/* <Text>{JSON.stringify(barangPenghuni)}</Text> */}
      <View
        style={{
          flexDirection: 'row-reverse',
          marginTop: 20,
        }}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              closeModal();
            }}>
            <View
              style={[styles.btNormal, {backgroundColor: myColor.colorTheme}]}>
              <Text style={[styles.btText, {color: '#fff'}]}>Batal</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                'Konfirmasi',
                'Sudah yakin data barang yang dimasukan benar ?',
                [
                  {
                    text: 'Batal',
                    onPress: () => alert('cancel'),
                    style: 'cancel',
                  },
                  {text: 'Ya', onPress: () => addBarang()},
                ],
                {cancelable: false},
              );
            }}>
            <View style={[styles.btNormal, {backgroundColor: myColor.success}]}>
              <Text style={[styles.btText, {color: myColor.fbtx}]}>
                Tambahkan
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {/* <TouchableOpacity
        onPress={() => {
          editBarang();
        }}>
        <View
          style={{
            height: 40,
            width: 0.6 * screenWidth,
            borderRadius: 5,
            marginTop: 20,
            marginHorizontal: 0.05 * screenWidth,
            backgroundColor: myColor.addfacility,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Edit Barang</Text>
        </View>
      </TouchableOpacity> */}
    </View>
  );
};

export default ModalTambahBarang;

const styles = StyleSheet.create({
  card: {
    width: screenWidth * 0.8,

    backgroundColor: '#fff',
    paddingHorizontal: 0.05 * screenWidth,
    paddingVertical: 10,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 5,
  },
  modalTitle: {
    fontSize: 16,
    color: myColor.fbtx,
    fontFamily: 'OpenSans-SemiBold',
    marginBottom: 10,
    textAlign: 'right',
  },
  textInput: {
    paddingHorizontal: 10,
  },
  btNormal: {
    height: 40,

    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  btText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 14,
  },
  btIcon: {
    backgroundColor: myColor.alert,
    height: 40,
    width: 40,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
