import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {
  myColor,
  screenHeight,
  screenWidth,
  APIUrl,
} from '../../../function/MyVar';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const BoxInfoKost = (props) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        marginTop: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,

        borderWidth: 1,
        borderColor: myColor.divider,
      }}>
      <Text
        style={{
          fontSize: 16,
          fontFamily: 'OpenSans-SemiBold',
          color: myColor.fbtx,
          textAlign: 'center',
        }}>
        Info Kost
      </Text>
      <View style={{alignItems: 'center'}}>
        <Image
          source={{
            uri: APIUrl + '/storage/images/kost/' + props.data.foto_kost,
          }}
          style={{
            height: 200,
            width: 300,
            borderRadius: 10,
          }}
        />
      </View>

      <View
        style={{
          marginTop: 10,
          backgroundColor: myColor.grayprofile,
          paddingHorizontal: 10,

          borderRadius: 5,
          paddingVertical: 10,
        }}>
        <View style={styles.wrapperFieldInfo}>
          <Text style={styles.namaInfo}>Nama Kost</Text>
          <Text style={styles.contentInfo}>{props.data.nama}</Text>
        </View>

        <View style={styles.wrapperFieldInfo}>
          <Text style={styles.namaInfo}>Provinsi</Text>
          <Text style={[styles.contentInfo, {textTransform: 'capitalize'}]}>
            {props.data.nama_provinsi}
          </Text>
        </View>
        <View style={styles.wrapperFieldInfo}>
          <Text style={styles.namaInfo}>Kabupaten/Kota</Text>
          <Text style={[styles.contentInfo, {textTransform: 'capitalize'}]}>
            {props.data.nama_kota}
          </Text>
        </View>
        <View style={styles.wrapperFieldInfo}>
          <Text style={styles.namaInfo}>Alamat</Text>
          <Text style={styles.contentInfo}>{props.data.alamat}</Text>
        </View>
        <View style={styles.wrapperFieldInfo}>
          <Text style={styles.namaInfo}>No Telepon Kost</Text>
          <Text style={styles.contentInfo}>{props.data.notelp}</Text>
        </View>
        <View style={styles.wrapperFieldInfo}>
          <Text style={styles.namaInfo}>Deskripsi Kost</Text>
          <Text style={styles.contentInfo}>{JSON.stringify(props.data)}</Text>
        </View>
      </View>

      <TouchableOpacity onPress={() => navigation.push('EditKost', props.data)}>
        <View
          style={{
            backgroundColor: myColor.addfacility,
            borderRadius: 5,
            height: 50,

            marginTop: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 14, fontWeight: 'bold', color: '#fff'}}>
            Edit Kost
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BoxInfoKost;

const styles = StyleSheet.create({
  wrapperFieldInfo: {
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    marginBottom: 5,
  },
  namaInfo: {
    fontSize: 14,
    fontFamily: 'OpenSans-SemiBold',
    color: myColor.fbtx,
  },
  contentInfo: {
    fontSize: 12,
    fontFamily: 'OpenSans-Regular',
    color: myColor.fbtx,
    textAlign: 'justify',
  },
});
