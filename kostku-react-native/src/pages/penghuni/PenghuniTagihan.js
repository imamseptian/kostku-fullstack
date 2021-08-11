import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  FlatList,
} from 'react-native';
import {FlatListTagihan} from '../../components';
import {myAxios} from '../../function/MyAxios';
import {APIUrl, screenWidth, myColor} from '../../function/MyVar';
import {useSelector} from 'react-redux';
import axios from 'axios';

const PenghuniTagihan = ({data}) => {
  const [dataTagihan, setdataTagihan] = useState([]);
  const dataRedux = useSelector((state) => state.AuthReducer);
  useEffect(() => {
    console.log('useeffect penghuni tagihan');
    console.log(data);
    console.log('*************************************');
    const source = axios.CancelToken.source();
    myAxios.getAxios(
      APIUrl + '/api/gettagihan/' + data.id,
      dataRedux.token,
      source.token,
      onGet,
    );
    function onGet(status, data) {
      if (status == 'success') {
        console.log('Get data kost success');
        // console.log(data);
        // console.log(data);
        setdataTagihan(data.tagihan);
        // setdataHomescreen({
        //   ...dataHomescreen,
        //   penghuni: data.data_penghuni,
        //   kamar: data.data_kamar,
        // });
        // setIsLoading(false);
      } else if (status == 'cancel') {
        console.log('caught cancel filter');
        // setIsLoading(false);
      } else {
        // console.log(data);
        console.log('ERROR PENGHUNI TAGIHAN');
        // setIsLoading(false);
      }
    }

    return () => {
      source.cancel('Component got unmounted');
      console.log('Tagihan unmounted');
    };
  }, [data]);

  return (
    <ScrollView contentContainerStyle={{paddingBottom: 20}}>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 20,
          alignItems: 'center',
          justifyContent: 'space-between',
          width: 0.9 * screenWidth,
          marginHorizontal: 0.05 * screenWidth,
        }}>
        <Text style={styles.textInfo}>
          Tagihan Aktif : {dataTagihan.length}
        </Text>
        <Text style={styles.textInfo}>Lihat Semua</Text>
      </View>
      <FlatList
        style={{paddingHorizontal: 0.05 * screenWidth}}
        data={dataTagihan}
        keyExtractor={(item) => item.id.toString()}
        // extraData={selectedId}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index, separator}) => {
          return <FlatListTagihan key={index} data={item} />;
        }}
      />

      {/* <View style={{flex: 1}}>
        {dataTagihan.map((item, index) => {
          return <FlatListTagihan key={index} data={item} />;
        })}
      </View> */}
    </ScrollView>
  );
};

export default PenghuniTagihan;

const styles = StyleSheet.create({
  textInfo: {fontFamily: 'OpenSans-Regular', fontSize: 13},
});
