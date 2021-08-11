import React, {useState, useEffect} from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {
  myColor,
  defaultAsset,
  screenWidth,
  dataBulan,
} from '../../../function/MyVar';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {CardText} from '../atoms';
import axios from 'axios';
const TabInfo = (props) => {
  const [asalDaerah, setasalDaerah] = useState({
    kota: '',
    provinsi: '',
  });
  //   useEffect(() => {
  //     if (props.selectedTab !== props.index) {
  //       goToTop();
  //     }
  //   }, [props.selectedTab]);
  // useEffect(() => {
  //   const source = axios.CancelToken.source();
  //   let one =
  //     'https://dev.farizdotid.com/api/daerahindonesia/kota/' + props.data.kota;
  //   let two =
  //     'https://dev.farizdotid.com/api/daerahindonesia/provinsi/' +
  //     props.data.provinsi;
  //   const requestOne = axios.get(one, {
  //     cancelToken: source.token,
  //   });
  //   const requestTwo = axios.get(two, {
  //     cancelToken: source.token,
  //   });
  //   axios
  //     .all([requestOne, requestTwo])
  //     .then(
  //       axios.spread((...responses) => {
  //         const responseOne = responses[0];
  //         const responseTwo = responses[1];

  //         setasalDaerah({
  //           ...asalDaerah,
  //           kota: responseOne.data.nama,
  //           provinsi: responseTwo.data.nama,
  //         });
  //         // use/access the results
  //       }),
  //     )
  //     .catch((errors) => {
  //       // react on errors.
  //     });

  //   return () => {
  //     source.cancel('Api Canceled');
  //   };
  // }, [props.data]);

  let tanggal_lahir = new Date(props.data.tanggal_lahir);

  return (
    <View
      style={{
        width: props.lebar,

        paddingHorizontal: 10,
        paddingTop: 20,
      }}>
      <CardText
        title="Tanggal Lahir"
        content={`${tanggal_lahir.getUTCDate()} ${
          dataBulan[tanggal_lahir.getUTCMonth()].nama
        } ${tanggal_lahir.getUTCFullYear()}`}>
        <Entypo name="calendar" size={20} color={myColor.grayGoogle} />
      </CardText>

      <CardText
        title="Status Hubungan"
        content={props.data.status_hubungan == 1 ? 'Lajang' : 'Menikah'}>
        <FontAwesome5
          name="hand-holding-heart"
          size={20}
          color={myColor.grayGoogle}
        />
      </CardText>

      <CardText
        address={true}
        title="Alamat Asal"
        content={`${props.data.alamat}, ${props.data.nama_kota}, ${props.data.nama_provinsi}`}>
        <Entypo name="address" size={20} color={myColor.grayGoogle} />
      </CardText>
      <CardText title="Nomor HP" content={props.data.notelp}>
        <Entypo
          name="phone"
          size={20}
          color={myColor.grayGoogle}
          style={{transform: [{rotateY: '180deg'}]}}
        />
      </CardText>
      <CardText title="Email" content={props.data.email}>
        <Entypo name="email" size={20} color={myColor.grayGoogle} />
      </CardText>

      <CardText
        title="Status"
        content={props.data.status_pekerjaan == 1 ? 'Pelajar' : 'Pekerja'}>
        <MaterialIcons name="work" size={20} color={myColor.grayGoogle} />
      </CardText>

      <CardText
        title="Tempat Kerja / Pendidikan"
        content={props.data.tempat_kerja_pendidikan}>
        <MaterialIcons name="home-work" size={20} color={myColor.grayGoogle} />
      </CardText>
    </View>
  );
};

export default TabInfo;

const styles = StyleSheet.create({});
