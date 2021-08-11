import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {myColor, dataBulan} from '../../function/MyVar';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import {useSelector} from 'react-redux';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const PenghuniInfo = ({data}) => {
  const dataRedux = useSelector((state) => state.AuthReducer);
  const [asalDaerah, setasalDaerah] = useState({
    kota: '',
    provinsi: '',
  });

  let tanggal_lahir = new Date(data.tanggal_lahir);

  useEffect(() => {
    console.log('useeffect penghuni info');
    console.log(data);
    console.log('-----------------------------');
    const source = axios.CancelToken.source();
    let one =
      'https://dev.farizdotid.com/api/daerahindonesia/kota/' + data.kota;
    let two =
      'https://dev.farizdotid.com/api/daerahindonesia/provinsi/' +
      data.provinsi;
    const requestOne = axios.get(one, {
      cancelToken: source.token,
    });
    const requestTwo = axios.get(two, {
      cancelToken: source.token,
    });
    axios
      .all([requestOne, requestTwo])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];

          setasalDaerah({
            ...asalDaerah,
            kota: responseOne.data.nama,
            provinsi: responseTwo.data.nama,
          });
          // use/access the results
        }),
      )
      .catch((errors) => {
        console.log('ERROR PENGHUNI INFO');
        // react on errors.
      });

    return () => {
      source.cancel('Api Canceled');
    };
  }, [data]);

  return (
    <View>
      {/* <Text style={{textAlign: 'center', fontSize: 20}}>
        {data.nama_depan} {data.nama_belakang}
      </Text> */}
      <View
        style={{
          marginTop: 20,
          width: screenWidth,
          paddingHorizontal: 0.05 * screenWidth,
        }}>
        {data.kelamin === 1 ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 15,
            }}>
            <MaterialCommunityIcons
              name="gender-male"
              size={25}
              color={myColor.darkText}
            />
            <Text style={[styles.textInfo, {marginLeft: 10}]}>Laki-Laki</Text>
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 15,
            }}>
            <MaterialCommunityIcons
              name="gender-female"
              size={25}
              color={myColor.darkText}
            />
            <Text style={[styles.textInfo, {marginLeft: 10}]}>Perempuan</Text>
          </View>
        )}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15,
          }}>
          <Fontisto name="date" size={25} color={myColor.darkText} />
          <Text style={[styles.textInfo, {marginLeft: 10}]}>
            {/* {data.hari}-{data.bulan}-{data.tahun} */}
            {tanggal_lahir.getDate()}-{dataBulan[tanggal_lahir.getMonth()].nama}
            -{tanggal_lahir.getFullYear()}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15,
          }}>
          <MaterialIcons
            name="local-phone"
            size={25}
            color={myColor.darkText}
          />
          <Text style={[styles.textInfo, {marginLeft: 10}]}>{data.notelp}</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15,
          }}>
          <MaterialIcons name="email" size={25} color={myColor.darkText} />
          <Text style={[styles.textInfo, {marginLeft: 10}]}>{data.email}</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15,
          }}>
          <MaterialIcons
            name="location-on"
            size={25}
            color={myColor.darkText}
          />
          <Text
            style={[
              styles.textInfo,
              {marginLeft: 10, maxWidth: 0.7 * screenWidth},
            ]}>
            {data.alamat}, {asalDaerah.kota}, {asalDaerah.provinsi}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15,
          }}>
          <MaterialIcons name="info" size={25} color={myColor.darkText} />
          <Text style={[styles.textInfo, {marginLeft: 10}]}>
            {data.status === 1 ? 'Pelajar' : 'Pekerja'}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15,
          }}>
          <MaterialIcons name="web" size={25} color={myColor.darkText} />
          <Text style={[styles.textInfo, {marginLeft: 10}]}>
            {data.status === 1 ? 'Belajar di' : 'Bejerja di '}{' '}
            {data.tempat_kerja_pendidikan}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PenghuniInfo;

const styles = StyleSheet.create({
  textInfo: {fontFamily: 'OpenSans-Regular', fontSize: 13},
});
