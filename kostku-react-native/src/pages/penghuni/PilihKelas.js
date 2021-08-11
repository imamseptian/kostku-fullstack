import React, {useState, useEffect} from 'react';
import {
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
import {ItemKelas} from './components';
const PilihKelas = ({navigation, route}) => {
  const [keyword, setkeyword] = useState('');
  const dataRedux = useSelector((state) => state.AuthReducer);
  const [isLoading, setIsLoading] = useState(false);
  const [dataKelas, setdataKelas] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    setIsLoading(true);
    myAxios.postAxios(
      APIUrl + '/api/list_kelas',
      {keyword: keyword},
      dataRedux.token,
      source.token,
      onPost,
    );
    function onPost(status, data) {
      if (status == 'success') {
        console.log(data.data);
        setdataKelas(data.data);
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
            {/* {JSON.stringify(route.params)} */}
          </Text>

          {dataKelas.map((x, i) => {
            return (
              <ItemKelas
                key={i}
                data={x}
                onPress={() => {
                  navigation.push('PilihKamar', {
                    penghuni: route.params,
                    kelas: x,
                  });
                }}
              />
            );
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

export default PilihKelas;

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
