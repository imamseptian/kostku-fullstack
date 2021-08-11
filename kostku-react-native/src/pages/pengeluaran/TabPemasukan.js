import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Button,
} from 'react-native';
import {
  myColor,
  screenHeight,
  screenWidth,
  APIUrl,
  startingYear,
  dataBulan,
  dataTahun,
} from '../../function/MyVar';
import {FAB} from 'react-native-paper';
import {ModalAddPengeluaran} from './';
import {Picker} from '@react-native-picker/picker';
import {myAxios} from '../../function/MyAxios';
import {ListHari} from './';
import axios from 'axios';
import Modal from 'react-native-translucent-modal';
import {PureModal} from '../../components';
import {ModalDetailPemasukan} from './components';
import {useIsFocused} from '@react-navigation/native';

const TabPemasukan = (props) => {
  const isFocused = useIsFocused();
  const [dataPemasukan, setdataPemasukan] = useState([]);
  const [dataMap, setdataMap] = useState([]);
  const [myTahun, setmyTahun] = useState(dataTahun());
  const [selectedBulan, setselectedBulan] = useState(new Date().getMonth() + 1);
  const [selectedTahun, setselectedTahun] = useState(new Date().getFullYear());
  const [showDetailPemasukan, setshowDetailPemasukan] = useState(false);
  const [selectedPemasukan, setselectedPemasukan] = useState(undefined);

  const ambilPemasukan = () => {
    const source = axios.CancelToken.source();
    myAxios.postAxios(
      APIUrl + '/api/filterpemasukan',
      {
        id_kost: props.id_kost,
        bulan: selectedBulan,
        tahun: selectedTahun,
        jenis: 1,
      },
      props.token,
      source.token,
      onPost,
    );
    function onPost(status, data) {
      if (status == 'success') {
        setdataPemasukan(data.data);
        let myUniqueDay = new Set();
        let arrayUniq = [];
        data.data.forEach((x, i) => {
          let tempDay = new Date(x.tanggal_transaksi);
          let tempTanggal = tempDay.getDate();
          // console.log(tempDay.toString());

          // let tempData = {
          //   hari: tempTanggal,
          //   data: [x],
          // };
          // arrayUniq.push(tempData);
          if (myUniqueDay.has(tempTanggal)) {
            // let exist_data = arrayUniq.find( ({ hari }) => hari === tempTanggal );
            // console.log(arrayUniq);
            let exist_data = arrayUniq.findIndex((x) => x.hari == tempTanggal);
            // let oldArr = arrayUniq[exist_data].data;
            // console.log(exist_data);
            // oldArr.push(x);
            arrayUniq[exist_data].data = [...arrayUniq[exist_data].data, x];
          } else {
            // console.log('belum ada');
            // const result = inventory.find( ({ hari }) => name === 'cherries' );
            let tempData = {
              hari: tempTanggal,
              data: [x],
            };
            arrayUniq.push(tempData);
          }
          myUniqueDay.add(tempDay.getDate());
        });
        console.log('---');
        console.log(arrayUniq);
        setdataMap(arrayUniq);
        // const uniqueDay = [...new Set(data.data.map(x=>x.age))]
      } else if (status == 'cancel') {
        console.log('caught cancel filter');
      } else {
        console.log('error pemasukan iiiiiiiiiiiiiiiiiiiiiiiiiiii');
        console.log(data);
      }
    }
  };

  useEffect(() => {
    console.log('triggered');
    if (isFocused) {
      ambilPemasukan();
    }
    return () => {
      console.log('aaa');
    };
  }, [selectedBulan, selectedTahun, isFocused]);

  return (
    <View style={{flex: 1, width: props.lebar}}>
      <Modal
        visible={showDetailPemasukan}
        transparent={true}
        onRequestClose={() => setshowDetailPemasukan(false)}>
        <PureModal>
          <ModalDetailPemasukan data={selectedPemasukan} lebar={props.lebar} />
        </PureModal>
      </Modal>
      {/* <Button
        title="totti"
        onPress={() => {
          setshowDetailPemasukan(true);
        }}
      /> */}
      <View
        style={{
          marginTop: 10,
          flexDirection: 'row',
          width: props.lebar,
          justifyContent: 'center',
        }}>
        <View
          style={{
            height: 30,
            width: 150,
            elevation: 5,
            backgroundColor: 'white',
            borderRadius: 10,
          }}>
          <Picker
            selectedValue={selectedBulan}
            style={{height: 30}}
            onValueChange={(itemValue, itemIndex) => {
              if (itemValue != null) {
                setselectedBulan(itemValue);
              }
            }}>
            <Picker.Item label="Pilih Bulan" />
            {dataBulan.map((item, index) => {
              return (
                <Picker.Item key={index} label={item.nama} value={item.id} />
              );
            })}
          </Picker>
        </View>
        <View
          style={{
            marginLeft: 10,
            height: 30,
            width: 110,
            elevation: 5,
            backgroundColor: 'white',
            borderRadius: 10,
          }}>
          <Picker
            selectedValue={selectedTahun}
            style={{height: 30}}
            onValueChange={(itemValue, itemIndex) => {
              if (itemValue != null) {
                setselectedTahun(itemValue);
              }
            }}>
            <Picker.Item label="Pilih Tahun" />
            {myTahun.map((item, index) => {
              return (
                <Picker.Item
                  key={index}
                  label={item.id.toString()}
                  value={item.id}
                />
              );
            })}
          </Picker>
        </View>
      </View>

      <View style={{marginTop: 10, flex: 1}}>
        {/* <Text>{dataMap.length}</Text> */}
        {/* <Text>{JSON.stringify(dataMap)}</Text> */}
        <FlatList
          data={dataMap}
          style={{paddingHorizontal: 0.05 * screenWidth}}
          keyExtractor={(item) => item.hari.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 60}}
          renderItem={({item, index, separator}) => {
            return (
              <ListHari
                data={item}
                lebar={props.lebar}
                bulan={dataBulan[selectedBulan - 1]}
                tahun={selectedTahun}
                onClickPemasukan={(value) => {
                  setselectedPemasukan(value);
                  setshowDetailPemasukan(true);
                }}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

export default TabPemasukan;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffaa91',
  },
});
