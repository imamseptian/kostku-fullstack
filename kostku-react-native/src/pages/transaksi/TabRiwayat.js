import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  FlatList,
} from 'react-native';
import {FlatListTransaksiBayar} from './components';
import {myAxios} from '../../function/MyAxios';
import {APIUrl, myColor} from '../../function/MyVar';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const TabRiwayat = (props) => {
  const [dataRiwayat, setdataRiwayat] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    const source = axios.CancelToken.source();
    console.log(props.penghuni);
    if (props.penghuni !== undefined) {
      setisLoading(true);
      myAxios.getAxios(
        APIUrl + '/api/riwayatpembayaran/' + props.penghuni.id,
        props.token,
        source.token,
        onGet,
      );
      function onGet(status, data) {
        if (status == 'success') {
          // console.log('Get data riwayat success :' + props.penghuni.nama);

          setdataRiwayat(data.data);
          setisLoading(false);
          // console.log(data);
        } else if (status == 'cancel') {
          console.log('caught cancel filter');
        } else {
          alert('error tab riwayat');
          console.log(data);
          setisLoading(false);
        }
      }
    }
    return () => {
      source.cancel('Component got unmounted');
      console.log('Tagihan unmounted');
    };
  }, [props.penghuni]);

  let content;

  if (isLoading) {
    content = <View></View>;
  } else {
    if (dataRiwayat.length < 1) {
      content = (
        <View
          style={{
            flex: 1,
            marginTop: 10,

            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{fontSize: 14, color: myColor.darkText, fontWeight: 'bold'}}>
            Riwayat tidak ditemukan
          </Text>
        </View>
      );
    } else {
      content = (
        <FlatList
          style={{paddingHorizontal: 0.05 * props.lebar}}
          data={dataRiwayat}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index, separator}) => {
            return (
              <FlatListTransaksiBayar
                key={index}
                data={item}
                fungsi={props.fungsiparent}
              />
            );
          }}
        />
        // <ScrollView showsVerticalScrollIndicator={false}>
        //   {/* <FlatListTransaksiBayar fungsi={props.fungsiparent} /> */}
        //   {dataRiwayat.map((item, index) => {
        //     return (
        //       <FlatListTransaksiBayar
        //         key={index}
        //         data={item}
        //         fungsi={props.fungsiparent}
        //       />
        //     );
        //   })}
        // </ScrollView>
      );
    }
  }

  return (
    <View
      style={{
        flex: 1,
        marginTop: 10,
        // width: 0.9 * screenWidth,
        width: props.lebar,
      }}>
      {/* {props.penghuni === undefined ? null : <Text>{props.penghuni.nama}</Text>} */}
      <View
        style={{
          flex: 1,
          // backgroundColor: 'red',
        }}>
        {content}
      </View>

      <ActivityIndicator
        animating={isLoading}
        size="large"
        color={myColor.myblue}
        style={styles.loading}
      />
    </View>
  );
};

export default TabRiwayat;
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
