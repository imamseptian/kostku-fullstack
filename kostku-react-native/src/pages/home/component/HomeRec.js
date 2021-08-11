import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {
  defaultAsset,
  myColor,
  kataPertama,
  APIUrl,
  formatRupiah,
  dataBulan,
} from '../../../function/MyVar';
const HomeRec = (props) => {
  let fotoSize = 40;
  const navigation = useNavigation();

  let waktuSekarang = new Date();

  const hallowaktu = () => {
    // console.log('hela');
    let sekarang = waktuSekarang.getHours();
    if (sekarang > 4 && sekarang <= 11) {
      return 'Selamat Pagi';
    } else if (sekarang > 11 && sekarang <= 14) {
      return 'Selamat Siang';
    } else if (sekarang > 14 && sekarang <= 18) {
      return 'Selamat Sore';
    } else {
      return 'Selamat Malam';
    }
  };

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 5,
          paddingHorizontal: 10,
        }}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: 'OpenSans-SemiBold',
            color: '#fff',
          }}>
          {hallowaktu()}, {kataPertama(props.nama)}
        </Text>
        <TouchableOpacity onPress={() => navigation.push('Profil')}>
          <View
            style={{
              width: fotoSize,
              height: fotoSize,
              borderRadius: fotoSize / 2,
              backgroundColor: myColor.divider,
              borderWidth: 2,
              borderColor: '#fff',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={{uri: APIUrl + '/storage/images/users/' + props.foto}}
              resizeMode="cover"
              style={{
                width: fotoSize,
                height: fotoSize,
                borderRadius: fotoSize / 2,
                borderWidth: 2,
                borderColor: '#fff',
              }}
              onError={() => {
                console.log('error foto gambar');
                console.log(APIUrl + '/storage/images/users/' + props.foto);
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
      {/* section kotak  */}
      <View
        style={{
          paddingVertical: 7,
          backgroundColor: '#fff',
          // borderWidth: 1,
          // borderColor: myColor.divider,
          borderRadius: 10,
          paddingHorizontal: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {/* section pendapatan bulan ini */}
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 5,
            }}>
            <Fontisto name="wallet" color={myColor.grayGoogle} size={15} />
            <Text
              style={{
                fontFamily: 'OpenSans-Regular',
                fontSize: 12,
                marginLeft: 5,
              }}>
              {dataBulan[waktuSekarang.getMonth()].nama},{' '}
              {waktuSekarang.getFullYear()}
            </Text>
          </View>
          <Text style={{fontFamily: 'OpenSans-Bold', fontSize: 14}}>
            {/* Rp.12.500.000 */}
            {formatRupiah(props.uang.toString(), 'Rp. ')}
          </Text>
        </View>

        {/* section fitur */}
        <View
          style={{
            flex: 1,

            marginLeft: 30,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('PembayaranStackScreen', {
                screen: 'HalamanBayar',
              });
            }}>
            <View
              style={{
                alignItems: 'center',
                paddingVertical: 5,
                paddingHorizontal: 10,
              }}>
              <Icon
                name="home-currency-usd"
                color={myColor.grayGoogle}
                size={20}
              />
              <Text style={{fontSize: 12, fontFamily: 'OpenSans-Regular'}}>
                Bayar
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('KeuanganStackScreen', {
                screen: 'DetailKeuangan',
                params: {
                  page: 0,
                },
              });
            }}>
            <View
              style={{
                alignItems: 'center',
                paddingVertical: 5,
                paddingHorizontal: 10,
              }}>
              <Ionicons name="newspaper" color={myColor.grayGoogle} size={20} />
              <Text style={{fontSize: 12, fontFamily: 'OpenSans-Regular'}}>
                Riwayat
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('KeuanganStackScreen', {
                screen: 'Laporan',
              });
            }}>
            <View
              style={{
                alignItems: 'center',
                paddingVertical: 5,
                paddingHorizontal: 10,
              }}>
              <FontAwesome5 name="print" color={myColor.grayGoogle} size={20} />
              <Text style={{fontSize: 12, fontFamily: 'OpenSans-Regular'}}>
                Unduh
              </Text>
            </View>
          </TouchableOpacity>

          {/* <View style={{alignItems: 'center'}}>
              <Ionicons name="newspaper" color={myColor.grayGoogle} size={20} />
              <Text style={{fontSize: 12, fontFamily: 'OpenSans-Regular'}}>
                Riwayat
              </Text>
            </View>

            <View style={{alignItems: 'center'}}>
              <FontAwesome5 name="print" color={myColor.grayGoogle} size={20} />
              <Text style={{fontSize: 12, fontFamily: 'OpenSans-Regular'}}>
                Unduh
              </Text>
            </View> */}
        </View>
      </View>
    </View>
  );
};

export default HomeRec;

const styles = StyleSheet.create({});
