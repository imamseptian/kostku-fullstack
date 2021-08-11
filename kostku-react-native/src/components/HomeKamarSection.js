import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {APIUrl, myColor} from '../function/MyVar';
import {BlackImage} from './atoms';
import {SharedElement} from 'react-navigation-shared-element';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const HomeKamarSection = (props) => {
  const navigation = useNavigation();
  function formatRupiah(angka, prefix) {
    let number_string = angka.replace(/[^,\d]/g, '').toString(),
      split = number_string.split(','),
      sisa = split[0].length % 3,
      rupiah = split[0].substr(0, sisa),
      ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if (ribuan) {
      separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix == undefined ? rupiah : rupiah ? 'Rp. ' + rupiah : '';
  }

  // let content;

  // if (props.data.length < 1) {
  //   content = (

  //   );
  // } else {
  //   content = (

  //   );
  // }

  return (
    <View style={{marginTop: 20}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 0.05 * screenWidth,
        }}>
        <Text style={styles.sectionTitle}>Kamar</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('KamarStackScreen', {
              screen: 'ListKamar',
            });
          }}>
          <Text style={styles.seeAll}>Lihat Semua</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          justifyContent: 'center',
        }}>
        <ActivityIndicator
          animating={props.status}
          size="large"
          color={myColor.myblue}
          style={styles.loading}
        />
        {props.data.length < 1 ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: myColor.darkText,
                fontWeight: 'bold',
                fontSize: 18,
                paddingVertical: 15,
              }}>
              Kamar kost masih kosong
            </Text>
          </View>
        ) : (
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{paddingLeft: 0.05 * screenWidth}}>
            {props.data.map((item, index) => {
              return (
                <TouchableNativeFeedback
                  key={index}
                  onPress={
                    () =>
                      // console.log(
                      //   APIUrl + '/kostdata/kelas_kamar/foto/' + item.foto,
                      // )
                      // navigation.navigate('DetailKelas', {item})
                      navigation.navigate('KamarStackScreen', {
                        screen: 'DetailKelas',
                        params: {
                          item,
                        },
                      })
                    // navigation.navigate('MainScreen', {
                    //   screen: 'KamarScreen',
                    //   params: {
                    //     screen: 'DetailKelas',
                    //     params: item,
                    //   },
                    // })
                  }>
                  <View style={styles.kamarCard}>
                    {/* <Image
                      source={{
                        // uri: APIUrl + '/image_kelas/' + item.foto,
                        uri: APIUrl + '/kostdata/kelas_kamar/foto/' + item.foto,
                      }}
                      style={{height: 180, width: '100%', borderRadius: 10}}
                    />
                    <View
                      style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'black',
                        position: 'absolute',
                        opacity: 0.4,
                        borderRadius: 10,
                      }}></View> */}
                    {/* <SharedElement id={`item.${item.id}.foto_kamar`}> */}
                    <BlackImage urlImg={item.foto} />
                    {/* </SharedElement> */}
                    <View style={styles.kamarContent}>
                      <Text style={styles.titleKamar}>{item.nama}</Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: 5,
                        }}>
                        <Ionicons name="pricetags" color="#ffffff" size={15} />
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: 12,
                            fontWeight: 'bold',
                            marginLeft: 3,
                          }}>
                          {/* Rp {item.harga}/Bulan */}
                          {formatRupiah(item.harga.toString(), 'Rp.')}
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: 5,
                        }}>
                        <FontAwesome5
                          name="door-open"
                          color="#ffffff"
                          size={15}
                        />
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: 12,
                            fontWeight: 'bold',
                            marginLeft: 3,
                          }}>
                          {item.banyak} Kamar
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableNativeFeedback>
              );
            })}
          </ScrollView>
        )}

        {/* {props.status ? (
          <ActivityIndicator size="large" color={myColor.colorTheme} />
        ) : (
          content
        )} */}
      </View>
    </View>
  );
};

export default HomeKamarSection;

const styles = StyleSheet.create({
  sectionTitle: {
    color: myColor.titleHome,
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
  },
  seeAll: {
    color: myColor.myblue,
    fontFamily: 'OpenSans-Bold',
    fontSize: 12,
  },
  titleKamar: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  kamarCard: {
    width: 150,
    height: 180,
    borderRadius: 10,
    position: 'relative',
    marginRight: 15,
    elevation: 10,
  },
  kamarContent: {
    position: 'absolute',
    bottom: 10,
    left: 5,
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
