import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {
  myColor,
  defaultAsset,
  screenWidth,
  APIUrl,
  formatRupiah,
} from '../../../function/MyVar';
import {CardBarang} from '../atoms';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
const TabBarang = (props) => {
  const totalHarga = () => {
    // props.dataChange((x, i) => {
    //   console.log(i);
    // });
    let total = 0;
    props.dataChange.forEach((x, i) => {
      total = total + x.total;
    });
    return total;
  };

  return (
    <View
      style={{
        width: props.lebar,
        paddingHorizontal: 10,
        paddingTop: 10,
      }}>
      <Text
        style={{
          marginBottom: 20,
          fontFamily: 'OpenSans-SemiBold',
          fontSize: 14,
          textAlign: 'center',
        }}>
        Silahkan Tentukan Biaya Barang Penghuni
      </Text>

      {props.dataChange.map((x, i) => {
        return (
          <CardBarang
            key={i}
            title={`Barang ${i + 1}`}
            data={x}
            index={i}
            ubahHarga={(x, y, z) => {
              props.ubahHarga(x, y, z);
              // console.log(x, y, z);
            }}>
            <Entypo name="box" size={20} color={myColor.grayGoogle} />
          </CardBarang>
        );
      })}

      <View
        style={{
          borderBottomWidth: 1,
          flexDirection: 'row-reverse',
        }}>
        <Text style={{fontFamily: 'OpenSans-Bold', fontSize: 20}}>+</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',

          marginTop: 5,
        }}>
        <Text style={{fontFamily: 'OpenSans-SemiBold', fontSize: 12}}>
          Total Biaya Barang Bulanan
        </Text>
        <Text
          style={{
            fontFamily: 'OpenSans-SemiBold',
            fontSize: 14,
            color: myColor.darkText,
          }}>
          {formatRupiah(totalHarga().toString(), 'Rp. ')}
        </Text>
      </View>
    </View>
  );
};

export default TabBarang;

const styles = StyleSheet.create({});
