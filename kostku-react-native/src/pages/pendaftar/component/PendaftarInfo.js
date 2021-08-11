import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Dimensions, Button} from 'react-native';
import {
  myColor,
  screenHeight,
  screenWidth,
  dataBulan,
} from '../../../function/MyVar';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import {useSelector} from 'react-redux';

const PendaftarInfo = ({data}) => {
  const dataRedux = useSelector((state) => state.AuthReducer);
  const [asalDaerah, setasalDaerah] = useState({
    kota: '',
    provinsi: '',
  });
  const [tanggal_lahir, settanggal_lahir] = useState(
    new Date(data.tanggal_lahir),
  );

  useEffect(() => {
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
        // react on errors.
      });

    return () => {
      source.cancel('Api Canceled');
    };
  });

  return (
    <View
      style={{
        marginTop: 10,
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
          <Text style={styles.textInfo}>Laki-Laki</Text>
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
          <Text style={styles.textInfo}>Perempuan</Text>
        </View>
      )}

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 15,
        }}>
        <Fontisto name="date" size={25} color={myColor.darkText} />
        <Text style={styles.textInfo}>
          {/* {data.hari}-{data.bulan}-{data.tahun} */}
          {tanggal_lahir.getDate()}-{dataBulan[tanggal_lahir.getMonth()].nama}-
          {tanggal_lahir.getFullYear()}
          {/* {JSON.stringify(tanggal_lahir)} */}
          {/* {data.tanggal_lahir} */}
        </Text>
        {/* <Button
            title="aa"
            onPress={() => {
              console.log(data.tanggal_lahir);
            }}
          /> */}
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 15,
        }}>
        <MaterialIcons name="local-phone" size={25} color={myColor.darkText} />
        <Text style={styles.textInfo}>{data.notelp}</Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 15,
        }}>
        <MaterialIcons name="email" size={25} color={myColor.darkText} />
        <Text style={styles.textInfo}>{data.email}</Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 15,
        }}>
        <MaterialIcons name="location-on" size={25} color={myColor.darkText} />
        <Text style={[styles.textInfo, {maxWidth: screenWidth * 0.9 - 25}]}>
          {data.alamat}, {asalDaerah.kota}, {asalDaerah.provinsi},{' '}
          {asalDaerah.kota}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 15,
        }}>
        <MaterialIcons name="info" size={25} color={myColor.darkText} />
        <Text style={styles.textInfo}>
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
        <Text style={styles.textInfo}>
          {data.status === 1 ? 'Belajar di' : 'Bejerja di '}{' '}
          {data.tempat_kerja_pendidikan}
        </Text>
      </View>
    </View>
  );
};

export default PendaftarInfo;

const styles = StyleSheet.create({
  textInfo: {fontSize: 13, fontFamily: 'OpenSans-Regular', marginLeft: 10},
});
