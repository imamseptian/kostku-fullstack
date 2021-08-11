import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  APIUrl,
  formatRupiah,
  myColor,
  rupiahToInt,
  screenWidth,
} from '../../../function/MyVar';
import axios from 'axios';
const ModalTambahFasilitas = (props) => {
  const [fasilitas, setfasilitas] = useState({
    id_kelas: props.id_kelas,
    nama: '',
  });

  const tambahFasilitas = () => {
    axios
      .post(APIUrl + '/api/addfasilitas', fasilitas, {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          props.refreshFasilitas();
        } else {
          alert('error');
        }
      })
      .catch((error) => {
        console.log(fasilitas);
      });
  };

  return (
    <View
      style={{
        width: screenWidth * 0.7,
        backgroundColor: '#f6f6f6',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 20,
      }}>
      <Text style={styles.modalTitle}>Tambah Fasilitas</Text>
      <TextInput
        placeholder="Nama Fasilitas"
        value={fasilitas.nama}
        style={styles.editField}
        onChangeText={(v) => {
          setfasilitas({...fasilitas, nama: v});
        }}
      />
      {/* <Text>{props.id_kelas}</Text> */}
      {/* <Text>{JSON.stringify(fasilitas)}</Text> */}

      <TouchableOpacity
        disabled={fasilitas.nama.length > 0 ? false : true}
        onPress={() => {
          tambahFasilitas();
        }}>
        <View
          style={[
            styles.buttonSubmit,
            {
              backgroundColor:
                fasilitas.nama.length > 0 ? myColor.addfacility : myColor.fbtx1,
            },
          ]}>
          <Text
            style={{
              fontFamily: 'OpenSans-SemiBold',
              fontSize: 12,
              color: '#ffffff',
            }}>
            Submit
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ModalTambahFasilitas;

const styles = StyleSheet.create({
  modalTitle: {
    fontSize: 16,
    fontFamily: 'OpenSans-SemiBold',
    color: myColor.fbtx,
    textAlign: 'center',
    marginBottom: 15,
  },
  editField: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  buttonSubmit: {
    height: 40,

    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
