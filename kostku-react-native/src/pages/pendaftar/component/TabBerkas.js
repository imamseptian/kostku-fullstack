import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  myColor,
  defaultAsset,
  screenWidth,
  APIUrl,
  formatRupiah,
} from '../../../function/MyVar';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {CardText} from '../atoms';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
const TabBerkas = (props) => {
  const navigation = useNavigation();
  const [kamar, setkamar] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  const loadData = () => {
    setisLoading(true);
    axios
      .get(APIUrl + '/api/kamar_pesanan/' + props.data.id)
      .then((res) => {
        console.log(res.data);
        // // console.log(res.data);
        // setpenghuniItem(res.data.barang);
        setkamar(res.data.kamar);
        setisLoading(false);
      })
      .catch((error) => {
        alert('ERROR Rquest kamar');
        setisLoading(false);
      });
  };

  useEffect(() => {
    loadData();
  }, [props.data]);

  return (
    <View
      style={{
        width: props.lebar,
        paddingHorizontal: 10,
        paddingTop: 20,
      }}>
      {/* section nomor ktp  */}
      <CardText title="Nomor KTP" content={props.data.noktp}>
        <Entypo name="v-card" size={20} color={myColor.grayGoogle} />
      </CardText>

      {/* section foto ktp  */}
      <TouchableOpacity onPress={props.showKTP}>
        <View style={styles.wrapperCard}>
          <View style={styles.wrapperTitle}>
            <Entypo name="v-card" size={20} color={myColor.grayGoogle} />
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'OpenSans-SemiBold',
                color: myColor.darkText,
                marginLeft: 3,
              }}>
              Foto KTP
            </Text>
          </View>
          <Image
            source={{
              uri: APIUrl + '/storage/images/pendaftar/' + props.data.foto_ktp,
            }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>

      {/* section pesanan kamar  */}
      <TouchableOpacity
        onPress={() => {
          if (kamar !== null && !isLoading) {
            navigation.navigate('KamarStackScreen', {
              screen: 'DetailKelas',
              params: {
                item: kamar,
              },
            });
          }
        }}>
        <View style={styles.wrapperCard}>
          <View style={styles.wrapperTitle}>
            <FontAwesome5
              name="door-open"
              size={20}
              color={myColor.grayGoogle}
            />
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'OpenSans-SemiBold',
                color: myColor.darkText,
                marginLeft: 3,
              }}>
              Kamar yang Dipesan
            </Text>
          </View>
          {kamar !== null && (
            <View style={{position: 'relative'}}>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'OpenSans-SemiBold',
                  fontSize: 14,
                  marginBottom: 10,
                }}>
                Kamar Pesanan
              </Text>

              <View style={{alignItems: 'center'}}>
                <Image
                  source={{uri: APIUrl + '/storage/images/kelas/' + kamar.foto}}
                  style={{
                    width: props.lebar * 0.8,
                    height: props.lebar * 0.8 * (2 / 3),
                    borderRadius: 10,
                  }}
                />
              </View>

              <View style={{flexDirection: 'row', marginTop: 10}}>
                <View>
                  <Text style={[styles.textBarang, {marginBottom: 5}]}>
                    Nama Kamar
                  </Text>
                  <Text style={[styles.textBarang, {marginBottom: 5}]}>
                    Kelas
                  </Text>
                  <Text style={[styles.textBarang, {marginBottom: 5}]}>
                    Biaya
                  </Text>
                </View>
                <View style={{marginLeft: 20}}>
                  <Text style={[styles.textBarang, {marginBottom: 5}]}>
                    {' '}
                    :{' '}
                  </Text>
                  <Text style={[styles.textBarang, {marginBottom: 5}]}>
                    {' '}
                    :{' '}
                  </Text>
                  <Text style={[styles.textBarang, {marginBottom: 5}]}>
                    {' '}
                    :{' '}
                  </Text>
                </View>

                <View>
                  <Text style={[styles.textBarang, {marginBottom: 5}]}>
                    {kamar.nama_kamar}
                  </Text>
                  <Text style={[styles.textBarang, {marginBottom: 5}]}>
                    {kamar.nama}
                  </Text>
                  <Text style={[styles.textBarang, {marginBottom: 5}]}>
                    {formatRupiah(kamar.harga.toString(), 'Rp. ')} / Bulan
                  </Text>
                </View>
              </View>
              {isLoading && (
                <ActivityIndicator
                  size="large"
                  color={myColor.myblue}
                  style={{
                    position: 'absolute',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                  }}
                />
              )}
            </View>
          )}
        </View>
      </TouchableOpacity>

      <CardText
        title="Pesan Pendaftar pada Pemilik Kost"
        content={props.data.pesan}>
        <MaterialIcons name="message" size={20} color={myColor.grayGoogle} />
      </CardText>

      {/* section nomor  */}
    </View>
  );
};

export default TabBerkas;

const styles = StyleSheet.create({
  wrapperCard: {
    paddingVertical: 15,

    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    position: 'relative',
    marginBottom: 25,
    borderWidth: 1,
    borderColor: myColor.divider,
  },
  wrapperTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: -20,
    left: 10,
  },
  image: {height: 150, borderRadius: 10},
  textBarang: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
  },
  textTotal: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 12,
  },
});
