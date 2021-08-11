import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {myColor, APIUrl} from '../../../function/MyVar';
import {myAxios} from '../../../function/MyAxios';
import Feather from 'react-native-vector-icons/Feather';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const ModalTambahKamar = (props) => {
  const [kamar, setKamar] = useState({
    nama: '',
    id_kelas: props.id,
    qty: 1,
  });
  // const [listKamar, setListKamar] = useState([]);
  const [banyak, setBanyak] = useState(1);

  useEffect(() => {
    setKamar({...kamar, qty: banyak});
  }, [banyak]);

  const setForm = (inputType, value) => {
    setKamar({...kamar, [inputType]: value});
  };
  useEffect(() => {
    return () => {
      setKamar({...kamar, qty: 1, nama: ''});
    };
  }, []);

  const addData = () => {
    const source = axios.CancelToken.source();
    myAxios.postAxios(
      APIUrl + '/api/kamar',
      kamar,
      props.token,
      source.token,
      onPost,
    );
    function onPost(status, data) {
      if (status == 'success') {
        console.log(data);
        alert('Tambah Kamar Sukses');
        props.refresh(source.token);
        props.tutup();
        // refreshPenghuni();
      } else if (status == 'cancel') {
        console.log('caught cancel filter');
      } else {
        console.log(data);
      }
    }
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
          paddingHorizontal: 10,
          paddingBottom: 20,
          width: screenWidth * 0.8,
          backgroundColor: 'white',
          borderTopLeftRadius: 5,
          borderTopRightRadius: 20,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 5,
        }}>
        <View
          style={{
            borderBottomWidth: 1,
            paddingVertical: 10,
            borderColor: myColor.divider,
            marginBottom: 10,
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: myColor.blackText,
              fontFamily: 'OpenSans-Bold',
              fontSize: 16,
            }}>
            Tambah Kamar
          </Text>
        </View>

        <View style={{paddingHorizontal: 20, backgroundColor: 'white'}}>
          <TextInput
            placeholder="Masukan Nama Kamar"
            value={kamar.nama}
            onChangeText={(value) => {
              setForm('nama', value);
            }}
            style={{
              fontFamily: 'OpenSans-Regular',
              fontSize: 12,
              height: 40,
              borderWidth: 1,
              borderRadius: 5,
              paddingHorizontal: 10,
              marginBottom: 10,
              borderColor: myColor.divider,
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 15,
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                if (banyak > 1) {
                  setBanyak(banyak - 1);
                }
              }}>
              <View
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: 15,
                  backgroundColor: myColor.myblue,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Feather name="minus" color="#fff" size={15} />
                {/* <Text
                style={{
                  color: '#fff',
                  fontFamily: 'OpenSans-Bold',
                  fontSize: 24,
                }}>
                -
              </Text> */}
              </View>
            </TouchableOpacity>
            <View
              style={{
                minWidth: 50,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 0.5,
                marginHorizontal: 10,
                borderRadius: 10,
              }}>
              <TextInput
                value={banyak.toString()}
                keyboardType="numeric"
                value={kamar.qty.toString()}
                onChangeText={(e) => {
                  if (parseInt(e) < 1) {
                    setBanyak(1);
                  } else if (e.length < 1) {
                    setBanyak(1);
                  } else {
                    setBanyak(parseInt(e));
                  }
                }}
                style={{
                  fontFamily: 'OpenSans-SemiBold',
                  fontSize: 14,
                  textAlign: 'center',
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                setBanyak(banyak + 1);
              }}>
              <View
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: 15,
                  backgroundColor: myColor.myblue,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Feather name="plus" color="#fff" size={15} />
              </View>
            </TouchableOpacity>
          </View>

          <TouchableNativeFeedback
            disabled={kamar.nama.length > 0 ? false : true}
            onPress={() => addData()}>
            <View
              style={{
                height: 35,
                borderRadius: 5,
                backgroundColor:
                  kamar.nama.length > 0 ? myColor.addfacility : myColor.fbtx1,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 10,
              }}>
              <Text
                style={{
                  fontFamily: 'OpenSans-Bold',
                  fontSize: 12,
                  color: '#fff',
                }}>
                Tambahkan
              </Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={props.tutup}>
            <View
              style={{
                height: 35,

                borderRadius: 5,
                backgroundColor: myColor.bgfb,
                borderWidth: 1,
                borderColor: myColor.divider,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'OpenSans-Bold',
                  fontSize: 12,
                  color: myColor.fbtx,
                }}>
                Tutup
              </Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    </View>
  );
};

export default ModalTambahKamar;

const styles = StyleSheet.create({
  subtitle: {
    width: 0.25 * screenWidth,
    paddingRight: 5,
    fontSize: 12,
    color: myColor.blackText,
    fontWeight: 'bold',
  },
  konten: {
    width: 0.53 * screenWidth,
    fontSize: 12,
    fontWeight: 'bold',
    color: myColor.darkText,
  },
  fieldWrapper: {
    flexDirection: 'row',
    width: 0.8 * screenWidth,
    minHeight: 50,
    borderBottomWidth: 0.5,
    alignItems: 'center',
    paddingVertical: 5,
  },
});
