import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {FlatItemPenghuni} from './components';
import {myAxios} from '../../function/MyAxios';
import {APIUrl, myColor} from '../../function/MyVar';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const ModalDaftarPenghuni = (props) => {
  const [dataPenghuni, setdataPenghuni] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [filter, setFilter] = useState({
    id_kost: props.id_kost,
    keyword: '',
  });
  // useEffect(() => {
  //   console.log('fetching...');
  //   const source = axios.CancelToken.source();
  //   myAxios.postAxios(
  //     APIUrl + '/api/tagihanpenghuni',
  //     filter,
  //     props.token,
  //     source.token,
  //     onPost,
  //   );
  //   function onPost(status, data) {
  //     if (status == 'success') {
  //       console.log(data.code);
  //       setdataPenghuni(data.data);
  //     } else if (status == 'cancel') {
  //       console.log('caught cancel filter');
  //     } else {
  //       console.log(data);
  //     }
  //   }
  //   return () => {
  //     source.cancel('Component got unmounted');
  //     console.log('Tagihan unmounted');
  //   };
  // }, []);

  useEffect(() => {
    console.log('fetching...');
    setisLoading(true);
    const source = axios.CancelToken.source();
    myAxios.postAxios(
      APIUrl + '/api/tagihanpenghuni',
      filter,
      props.token,
      source.token,
      onPost,
    );
    function onPost(status, data) {
      if (status == 'success') {
        console.log(data.code);
        setdataPenghuni(data.data);
        // setdataPenghuni([]);
        setisLoading(false);
      } else if (status == 'cancel') {
        console.log('caught cancel filter');
        // setisLoading(false);
      } else {
        console.log(data);
        // setisLoading(false);
      }
    }
    return () => {
      source.cancel('Component got unmounted');
      console.log('Tagihan unmounted');
    };
  }, [filter]);

  let contentFlat;

  if (dataPenghuni.length < 1) {
    contentFlat = (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            fontFamily: 'OpenSans-SemiBold',
            fontSize: 12,
            color: myColor.darkText,
          }}>
          Semua penghuni sudah melunasi tagihannya
        </Text>
      </View>
    );
  } else {
    contentFlat = (
      <FlatList
        style={{paddingHorizontal: 3}}
        data={dataPenghuni}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index, separator}) => {
          return (
            <FlatItemPenghuni
              key={index}
              data={item}
              onPress={() => {
                props.itemClick(item);
                //   setpenghuni(item);
                //   setshowModal(false);
              }}
            />
          );
        }}
      />
    );
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
      }}>
      <View
        style={{
          height: screenHeight * 0.75,

          paddingHorizontal: 0.05 * screenWidth,
          paddingVertical: 10,
          width: screenWidth * 0.88,
          borderRadius: 10,
          backgroundColor: '#f6f6f6',
        }}>
        <Text
          style={{
            fontFamily: 'OpenSans-SemiBold',
            fontSize: 16,
            color: myColor.fbtx,
            marginBottom: 10,
            textAlign: 'center',
          }}>
          Cari Penghuni Kost
        </Text>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            alignItems: 'center',
            borderRadius: 10,
            height: 40,
            borderWidth: 0.5,
            paddingHorizontal: 10,
          }}>
          <FontAwesome
            name="search"
            color={myColor.fbtx}
            size={25}
            style={{marginRight: 10}}
          />
          <TextInput
            placeholder="Cari Penghuni"
            style={{flex: 1, fontFamily: 'OpenSans-Regular', fontSize: 12}}
            onChangeText={(v) => {
              setFilter({...filter, keyword: v});
            }}
          />
        </View>

        <View style={{flex: 1}}>
          {isLoading ? (
            <ActivityIndicator
              style={{marginTop: 20}}
              size="large"
              color={myColor.colorTheme}
            />
          ) : (
            contentFlat
          )}
        </View>

        <TouchableOpacity
          onPress={() => {
            props.closeModal();
          }}>
          <View
            style={{
              marginTop: 10,
              height: 40,
              backgroundColor: myColor.alert,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <Text
              style={{
                fontFamily: 'OpenSans-SemiBold',
                fontSize: 14,
                color: '#ffffff',
              }}>
              Tutup
            </Text>
          </View>
        </TouchableOpacity>

        {/* <FlatList
          style={{paddingHorizontal: 3}}
          data={dataPenghuni}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index, separator}) => {
            return (
              <FlatItemPenghuni
                data={item}
                onPress={() => {
                  props.itemClick(item);
                  //   setpenghuni(item);
                  //   setshowModal(false);
                }}
              />
            );
          }}
        /> */}
      </View>
    </View>
  );
};

export default ModalDaftarPenghuni;

const styles = StyleSheet.create({});
