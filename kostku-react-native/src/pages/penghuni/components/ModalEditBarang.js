import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';
import {
  myColor,
  APIUrl,
  screenWidth,
  screenHeight,
  formatRupiah,
  rupiahToInt,
} from '../../../function/MyVar';
import {
  MyPicker,
  NoTelpFormField,
  TextFormField,
  TextInputResp,
} from '../../../components';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const ModalEditBarang = ({id_penghuni, refreshFunction, data, closeModal}) => {
  const [barangPenghuni, setbarangPenghuni] = useState(data);

  const editBarang = () => {
    axios
      .post(APIUrl + '/api/edit_barang_penghuni', barangPenghuni)
      .then((res) => {
        console.log(res.data);
        refreshFunction();
      });
  };

  const deleteBarang = () => {
    axios
      .post(APIUrl + '/api/delete_barang_penghuni', barangPenghuni)
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
      <Text style={styles.modalTitle}>Edit Barang</Text>
      <TextInputResp
        title="Nama Barang"
        placeholder="Nama Barang"
        onChangeText={(v) => {
          setbarangPenghuni({...barangPenghuni, nama: v});
        }}
        value={barangPenghuni.nama}
        pesanError={''}
        editable={false}
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
          flexDirection: 'row',
          marginTop: 20,
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              'Peringatan',
              'Yakin ingin menghapus data barang ?',
              [
                {
                  text: 'Batal',
                  onPress: () => alert('cancel'),
                  style: 'cancel',
                },
                {text: 'Ya', onPress: () => deleteBarang()},
              ],
              {cancelable: false},
            );
          }}>
          <View style={styles.btIcon}>
            <FontAwesome5 name="trash-alt" color="#fff" size={20} />
          </View>
        </TouchableOpacity>

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
                  {text: 'Ya', onPress: () => editBarang()},
                ],
                {cancelable: false},
              );
            }}>
            <View style={[styles.btNormal, {backgroundColor: myColor.success}]}>
              <Text style={[styles.btText, {color: myColor.fbtx}]}>Edit</Text>
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

export default ModalEditBarang;

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
