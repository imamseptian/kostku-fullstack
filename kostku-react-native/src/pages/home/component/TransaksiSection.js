import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {myColor, screenHeight, screenWidth} from '../../../function/MyVar';
import {ItemTransaksi} from '../atom';
import {useNavigation} from '@react-navigation/native';
const TransaksiSection = (props) => {
  const navigation = useNavigation();
  return (
    <View style={{marginTop: 20}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 0.05 * screenWidth,
        }}>
        <Text style={styles.sectionTitle}>Transaksi Terakhir</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('KeuanganStackScreen', {
              screen: 'DetailKeuangan',
              params: {
                page: 0,
              },
            });
          }}>
          <Text style={styles.seeAll}>Lihat Semua</Text>
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 10}}>
        {props.data.map((item, index) => {
          return <ItemTransaksi key={index} data={item} />;
        })}
      </View>
    </View>
  );
};

export default TransaksiSection;

const styles = StyleSheet.create({
  sectionTitle: {
    color: myColor.titleHome,
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
  },
  seeAll: {
    color: myColor.myblue,
    fontFamily: 'OpenSans-Bold',
    fontSize: 12,
  },
});
