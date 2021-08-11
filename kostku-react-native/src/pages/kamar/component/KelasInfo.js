import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableNativeFeedback,
} from 'react-native';
import {
  APIUrl,
  myColor,
  formatRupiah,
  screenHeight,
  screenWidth,
  defaultAsset,
} from '../../../function/MyVar';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import {useSelector} from 'react-redux';

const KelasInfo = ({data, onPress}) => {
  return (
    <View
      style={{
        marginTop: 20,
        width: 0.9 * screenWidth,
        marginHorizontal: 0.05 * screenWidth,
        flex: 1,
      }}>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15,
          }}>
          <FontAwesome5 name="money-bill-wave" size={25} color={myColor.fbtx} />
          <Text style={{marginLeft: 10}}>
            {formatRupiah(data.harga.toString(), 'Rp. ')} / Bulan
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15,
          }}>
          <FontAwesome5 name="users" size={25} color={myColor.fbtx} />
          <Text style={{marginLeft: 10}}>
            {data.kapasitas} Orang Kapasitas{' '}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 5,
          }}>
          <MaterialIcons name="room-service" size={25} color={myColor.fbtx} />
          <Text style={{marginLeft: 10}}>Fasilitas</Text>
        </View>

        {/* <Text>{JSON.stringify(data.fasilitas)}</Text> */}
        {data.fasilitas.map((item, index) => {
          return (
            // <Picker.Item key={index} label={item.nama} value={item.id} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
                marginLeft: 30,
              }}
              key={index}>
              <Text
                style={{
                  color: '#636e72',
                  fontWeight: 'bold',
                  fontSize: 14,
                }}>
                {index + 1}
              </Text>
              <Text
                style={{
                  marginLeft: 10,
                  color: '#636e72',
                  fontWeight: 'bold',
                  fontSize: 14,
                }}>
                {item.nama}
              </Text>
            </View>
          );
        })}
      </ScrollView>
      <TouchableNativeFeedback onPress={onPress}>
        <View
          style={{
            height: 50,
            width: 0.7 * screenWidth,
            marginHorizontal: 0.1 * screenWidth,
            backgroundColor: myColor.myblue,
            elevation: 5,
            borderRadius: 10,
            marginVertical: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 14, fontWeight: 'bold', color: '#fff'}}>
            Daftar Kamar
          </Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default KelasInfo;

const styles = StyleSheet.create({});
