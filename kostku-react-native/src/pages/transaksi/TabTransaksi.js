import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
  FlatList,
} from 'react-native';
import Modal from 'react-native-translucent-modal';
import {FlatListTransaksi} from '../../components';
import {PureModal} from '../../components';
import {ModalPembayaran} from './components';
import {FlatItemTagihan} from './components';
import {myAxios} from '../../function/MyAxios';
import {APIUrl, myColor} from '../../function/MyVar';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const TabTransaksi = (props) => {
  const [showModalBayar, setshowModalBayar] = useState(false);
  const [dataTagihan, setDataTagihan] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const handleInputChange = (e, index, inputType) => {
    const list = [...dataTagihan];
    list[index][inputType] = e;
    setDataTagihan(list);
  };

  const loadTagihan = () => {
    const source = axios.CancelToken.source();
    console.log('useeffect transaksi');
    console.log(props.penghuni);

    if (props.penghuni !== undefined) {
      // alert('axios tab transaksi');
      console.log('tab transaksi start');
      setisLoading(true);
      myAxios.getAxios(
        APIUrl + '/api/gettagihan/' + props.penghuni.id,
        props.token,
        source.token,
        onGet,
      );
      function onGet(status, data) {
        if (status == 'success') {
          console.log(
            'Get data transaksi success :' + props.penghuni.nama_depan,
          );
          // alert(props.penghuni.id);
          let tempData = data.tagihan;
          tempData.forEach((x, i) => {
            x.selected = false;

            // tempList.push(formatRupiah('0', 'Rp. '));
          });
          // setDataTagihan(data.tagihan);
          setDataTagihan(tempData);
          setisLoading(false);
          // console.log(data);
          // ambilRiwayat();
        } else if (status == 'cancel') {
          console.log('caught cancel filter');
          setisLoading(false);
        } else {
          alert('error tab transaksi');
          // console.log(data);
          setisLoading(false);
        }
      }
    }
  };

  useEffect(() => {
    loadTagihan();
    return () => {
      // source.cancel('Component got unmounted');
      console.log('Tagihan unmounted');
    };
  }, [props.penghuni]);

  let content;

  if (isLoading) {
    content = <View></View>;
  } else {
    if (dataTagihan.length < 1) {
      content = (
        <View
          style={{
            flex: 1,
            marginTop: 10,
            // width: 0.9 * screenWidth,
            // width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 14,
              color: myColor.darkText,
              fontFamily: 'OpenSans-SemiBold',
            }}>
            Tagihan tidak ditemukan
          </Text>
        </View>
      );
    } else {
      content = (
        <FlatList
          style={{paddingHorizontal: 3}}
          data={dataTagihan}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index, separator}) => {
            return (
              <FlatItemTagihan
                data={item}
                index={index}
                setSelected={(x, y, z) => {
                  handleInputChange(x, y, z);
                }}
              />
            );
          }}
        />
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
        // alignItems: 'center',
        // backgroundColor: 'red',
      }}>
      <Modal
        visible={showModalBayar}
        transparent={true}
        onRequestClose={() => {
          setshowModalBayar(false);
        }}>
        <PureModal>
          <ModalPembayaran
            data={dataTagihan}
            closeModal={() => {
              setshowModalBayar(false);
            }}
            refreshData={() => {
              loadTagihan();
            }}
            penghuni={props.penghuni}
            setPenghuni={(v) => {
              props.setPenghuni(v);
            }}
          />
        </PureModal>
      </Modal>
      {/* <Text>ANTAL</Text> */}
      {/* {props.penghuni === undefined ? null : <Text>{props.penghuni.nama}</Text>} */}
      <View
        style={{
          flex: 1,
        }}>
        {content}
      </View>
      {/* <Text>{props.penghuni.id}</Text> */}
      <TouchableNativeFeedback
        onPress={() => {
          setshowModalBayar(true);
        }}
        disabled={props.penghuni === undefined ? true : false}>
        <View
          style={{
            height: 40,
            borderRadius: 10,
            backgroundColor:
              props.penghuni === undefined ? myColor.bgfb : myColor.myblue,

            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 5,
            marginHorizontal: 0.1 * props.lebar,
          }}>
          {/* <Text>{JSON.stringify(dataTagihan[0].selected)}</Text> */}
          <Text
            style={{
              fontSize: 14,
              color: props.penghuni === undefined ? myColor.blackText : '#fff',
              fontFamily: 'OpenSans-Bold',
            }}>
            Bayar
          </Text>
        </View>
      </TouchableNativeFeedback>
      <ActivityIndicator
        animating={isLoading}
        size="large"
        color={myColor.myblue}
        style={styles.loading}
      />
    </View>
  );
};

export default TabTransaksi;

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
