import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

const DetailInfo = ({
  kelamin,
  umur,
  provinsi,
  kota,
  alamat,
  status,
  tempat,
  pesan,
}) => {
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 30,
        paddingHorizontal: 20,
        backgroundColor: '#fbfbfb',
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.wrapperInfo}>
          <Text style={styles.subtitle}>Jenis Kelamin</Text>
          <Text style={styles.textInfo}>{kelamin}</Text>
        </View>
        <View style={styles.wrapperInfo}>
          <Text style={styles.subtitle}>Umur</Text>
          <Text style={styles.textInfo}>{umur} Tahun</Text>
        </View>
        <View style={styles.wrapperInfo}>
          <Text style={styles.subtitle}>Tempat Asal</Text>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View>
              <Text style={[styles.subtitle, {fontSize: 14, marginTop: 10}]}>
                Provinsi
              </Text>
              <Text style={[styles.subtitle, {fontSize: 14, marginTop: 10}]}>
                Kota
              </Text>
              <Text style={[styles.subtitle, {fontSize: 14, marginTop: 10}]}>
                Alamat
              </Text>
            </View>

            <View style={{marginLeft: 30}}>
              <Text style={[styles.textInfo, {fontSize: 14, marginTop: 10}]}>
                : {provinsi}
              </Text>
              <Text style={[styles.textInfo, {fontSize: 14, marginTop: 10}]}>
                : {kota}
              </Text>
              <Text style={[styles.textInfo, {fontSize: 14, marginTop: 10}]}>
                : {alamat}
              </Text>
            </View>
          </View>

          {/* <Text style={styles.textInfo}>Laki-Laki</Text> */}
        </View>
        <View style={styles.wrapperInfo}>
          <Text style={styles.subtitle}>Status</Text>
          <Text style={styles.textInfo}>
            {status == 1 ? 'Pelajar' : 'Pekerja'}
          </Text>
        </View>
        <View style={styles.wrapperInfo}>
          <Text style={styles.subtitle}>
            {status == 1 ? 'Tempat Pendidikan' : 'Tempat Kerja'}
          </Text>
          <Text style={styles.textInfo}>{tempat}</Text>
        </View>
        <View style={styles.wrapperInfo}>
          <Text style={styles.subtitle}>Pesan</Text>
          <Text style={styles.textInfo}>{pesan}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailInfo;

const styles = StyleSheet.create({
  subtitle: {
    color: '#676767',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textInfo: {
    color: '#676767',
    fontSize: 14,

    marginTop: 10,
  },
  wrapperInfo: {
    marginBottom: 20,
    borderBottomWidth: 0.5,
    paddingBottom: 10,
  },
});
