import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  ScrollView,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {myColor, screenHeight, screenWidth, APIUrl} from '../../function/MyVar';
// import {ProfileClipper} from '../../components/atoms';
import {BoxProfile, BoxInfoKost, ProfileClipper} from './components';
import {useSelector} from 'react-redux';
import {myAxios} from '../../function/MyAxios';
import axios from 'axios';

const Profile = () => {
  const dataRedux = useSelector((state) => state.AuthReducer);

  const [attribut, setattribut] = useState({
    kamar: 0,
    penghuni: 0,
    kelas: 0,
  });

  const [asalDaerah, setasalDaerah] = useState({
    kota: '',
    provinsi: '',
  });
  const [kost, setkost] = useState({
    nama: '',
    provinsi: 0,
    kota: 0,
    alamat: '',
    notelp: '',
    deskripsi: '',
  });

  useFocusEffect(
    React.useCallback(() => {
      const source = axios.CancelToken.source();
      myAxios.getAxios(
        APIUrl + '/api/profil',
        dataRedux.token,
        source.token,
        onGet,
      );
      function onGet(status, data) {
        if (status == 'success') {
          console.log('Get data kost success');

          setkost(data.kost);
          setattribut({
            ...attribut,
            kelas: data.kelas,
            penghuni: data.penghuni,
            kamar: data.jmlkamar,
          });
          console.log(data);
        } else if (status == 'cancel') {
          console.log('caught cancel filter');
        } else {
          console.log(data);
        }
      }

      return () => {
        source.cancel('Component got unmounted');
        console.log('HomeScreen unmounted');
      };
    }, []),
  );

  useEffect(() => {
    const source = axios.CancelToken.source();
    if (kost.provinsi != 0) {
      let one =
        'https://dev.farizdotid.com/api/daerahindonesia/kota/' + kost.kota;
      let two =
        'https://dev.farizdotid.com/api/daerahindonesia/provinsi/' +
        kost.provinsi;

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
            console.log('daerah sukses');
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
    }

    // const ambilAsal = async () => {
    //   await ambilProvinsi();
    //   await ambilKota;
    // };
    // ambilAsal();

    return () => {
      source.cancel('Api Canceled');
    };
  }, [kost]);

  return (
    <View style={{flex: 1, backgroundColor: '#f6f6f6'}}>
      <StatusBar translucent backgroundColor="transparent" />
      <ProfileClipper />

      <ScrollView
        showsVerticalScrollIndicator={false}
        // contentContainerStyle={{padding: 3}}
        style={{paddingHorizontal: 15}}>
        <BoxProfile attribut={attribut} />
        <BoxInfoKost data={kost} daerah={asalDaerah} />
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
