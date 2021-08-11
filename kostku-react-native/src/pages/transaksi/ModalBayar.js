import React from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {myColor} from '../../function/MyVar';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const ModalBayar = (props) => {
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
          borderRadius: 10,

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
            fontSize: 15,
            color: myColor.blackText,
          }}>
          Bayar
        </Text>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            width: 0.85 * screenWidth,
            alignItems: 'center',
            borderRadius: 10,
            height: 40,
            borderWidth: 0.5,
          }}>
          <TextInput
            keyboardType="number-pad"
            value={props.nominalBayar.toString()}
            placeholder="Masukan nominal bayar"
            onChangeText={(value) => {
              if (value.length == 0) {
                // setnominalBayar(parseInt(0));
                props.ubahNominal(parseInt(0));
              } else {
                // setnominalBayar(parseInt(value));
                props.ubahNominal(parseInt(value));
              }
            }}
            style={{flex: 1, marginRight: 15}}
          />
        </View>
        {/* <Button title="BAYAR" onPress={() => bayarTagihan()} /> */}
        <View>
          <Text style={styles.textinfo}>
            *Masukan total nominal pembayaran , sistem akan mengakumulasi secara
            otomatis.
          </Text>
          <Text style={styles.textinfo}>
            *Misal penghuni yang dipilih memiliki tagihan Rp 1.5 juta untuk
            tagihan sewa selama 3 bulan, cukup masukan Rp 1.5 juta kedalam kolom
            diatas dan sistem akan otomatis akan mencatat tagihan selama 3 bulan
            sudah lunas. Dapat digunakan juga untuk cicil tagihan, misal
            penghuni punya tagihan senilai 1 juta namun pembayaran yang diterima
            baru 500 ribu maka sistem akan memotong tagihan sesuai urutan
            tanggal.
          </Text>
          <Text style={styles.textinfo}>
            *Semua kegiatan pembayaran tagihan dan transaksi akan masuk ke
            riwayat aktivitas sistem dan pengguna dapat melihatnya.
          </Text>
          <Text style={[styles.textinfo, {color: myColor.alert}]}>
            *Apabila penghuni tidak memiliki tagihan namun pengguna memasukan
            pembayaran akan dianggap sebagai pelunasan tagihan sewa yang akan
            datang atau bulan depan (Tindakan ini juga akan masuk ke riwayat
            aktivitas sistem)
          </Text>
        </View>

        <TouchableOpacity
          disabled={props.nominalBayar == 0 ? true : false}
          onPress={() => {
            Alert.alert(
              'Konfirmasi',
              'Apakah anda sudah memahami semua informasi dibawah kolom nominal bayar dan sudah yakin dengan nominal yang dimasukan?',
              [
                {
                  text: 'Batal',
                  onPress: () => console.log('ayaya'),
                  style: 'cancel',
                },
                {text: 'Ya', onPress: () => props.bayarTagihan()},
              ],
              {cancelable: false},
            );
          }}>
          <View
            style={{
              justifyContent: 'center',
              width: 100,
              height: 50,
              borderRadius: 10,
              alignItems: 'center',
              backgroundColor:
                props.nominalBayar == 0 ? myColor.bgfb : myColor.myblue,
            }}>
            <Text
              style={{
                color: props.nominalBayar == 0 ? myColor.blackText : '#fff',
                fontSize: 14,
                fontWeight: 'bold',
              }}>
              Bayar
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ModalBayar;

const styles = StyleSheet.create({});
