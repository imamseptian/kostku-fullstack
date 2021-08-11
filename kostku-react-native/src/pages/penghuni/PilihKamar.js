import React, {useState, useEffect} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {HeaderPage} from '../../components';
import {myColor, APIUrl} from '../../function/MyVar';
import {myAxios} from '../../function/MyAxios';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {ItemKamar} from './components';
const PilihKamar = ({navigation, route}) => {
  const [keyword, setkeyword] = useState('');
  const dataRedux = useSelector((state) => state.AuthReducer);
  const [isLoading, setIsLoading] = useState(false);
  const [dataKamar, setdataKamar] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    setIsLoading(true);
    myAxios.postAxios(
      APIUrl + '/api/list_kamar',
      {keyword: keyword, id_kelas: route.params.kelas.id},
      dataRedux.token,
      source.token,
      onPost,
    );
    function onPost(status, data) {
      if (status == 'success') {
        console.log(data.data);
        setdataKamar(data.data);
        setIsLoading(false);
      } else if (status == 'cancel') {
        console.log('[LIST KAMAR ] Request Canceled');
      } else {
        alert('error');
        // console.log(data);
        setIsLoading(false);
      }
    }
    return () => {
      source.cancel('Component got unmounted');
    };
  }, [keyword]);

  const pindahKamar = (id_kamar) => {
    axios
      .post(`${APIUrl}/api/pindah_kamar`, {
        id: route.params.penghuni.id,
        id_kamar: id_kamar,
        id_kelas: route.params.kelas.id,
      })
      .then((res) => {
        if (res.data.success) {
          navigation.reset({
            routes: [{name: 'PenghuniStackScreen'}],
          });
        }
      })
      .catch((error) => {
        console.log(error);
        alert(id_kelas);
      });
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <HeaderPage title="Pindah Kamar" />
      <ScrollView>
        <View style={{flex: 1, paddingHorizontal: 15, paddingVertical: 10}}>
          <TextInput
            placeholder="Cari Kelas"
            onChangeText={(value) => {
              setkeyword(value);
            }}
            style={{
              fontFamily: 'OpenSans-Regular',
              fontSize: 12,
              paddingHorizontal: 10,
              borderWidth: 1,
              borderColor: myColor.divider,
              borderRadius: 5,
              backgroundColor: 'white',
            }}
          />
          <Text
            style={{
              fontFamily: 'OpenSans-SemiBold',
              fontSize: 14,
              marginTop: 10,
            }}>
            {JSON.stringify(route.params)}
          </Text>
          {/* <Text>{JSON.stringify(dataKamar)}</Text> */}

          {dataKamar.map((x, i) => {
            if (x.penghuni.length < parseInt(route.params.kelas.kapasitas)) {
              return (
                <ItemKamar
                  key={i}
                  data={x}
                  isi={x.penghuni.length}
                  kelas={route.params.kelas}
                  onPress={(id_kamar) => {
                    Alert.alert(
                      'Konfirmasi',
                      'Yakin ingin pindahkan penghuni, tagihan baru akan dibuat saat pindah kamar',
                      [
                        {
                          text: 'Batal',
                          onPress: () => console.log('Batal Hapus'),
                          style: 'cancel',
                        },
                        {text: 'Ya', onPress: () => pindahKamar(id_kamar)},
                      ],
                      {cancelable: false},
                    );
                  }}
                />
                // <Text>{x.penghuni.length}</Text>
              );
            }
          })}
        </View>
      </ScrollView>
      <ActivityIndicator
        animating={isLoading}
        size="large"
        color={myColor.myblue}
        style={styles.loading}
      />
    </View>
  );
};

export default PilihKamar;

const styles = StyleSheet.create({
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
