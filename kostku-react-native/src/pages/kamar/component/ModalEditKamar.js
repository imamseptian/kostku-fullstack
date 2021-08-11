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
const ModalEditKamar = (props) => {
  const [kamar, setKamar] = useState(props.data);
  // const [listKamar, setListKamar] = useState([]);

  useEffect(() => {
    return () => {
      setKamar({...kamar, qty: 1, nama: ''});
    };
  }, []);

  const editKamar = () => {
    axios
      .put(APIUrl + '/api/kamar/' + kamar.id, kamar, {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        props.refresh();
        props.tutup();
      })
      .catch((error) => {
        console.log('error edit kamar' + error);
        console.log(props.token);
      });
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
            Edit Kamar
          </Text>
        </View>

        <View style={{paddingHorizontal: 20, backgroundColor: 'white'}}>
          <TextInput
            placeholder="Masukan Nama Kamar"
            value={kamar.nama}
            onChangeText={(value) => {
              setKamar({...kamar, nama: value});
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
        </View>

        <TouchableNativeFeedback
          disabled={kamar.nama.length > 0 ? false : true}
          onPress={() => editKamar()}>
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
              Edit Kamar
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
  );
};

export default ModalEditKamar;

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
