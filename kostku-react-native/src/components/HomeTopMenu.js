import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';

import {myColor, formatRupiah} from '../function/MyVar';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const HomeTopMenu = (props) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        // height: 90,
        backgroundColor: 'white',
        borderRadius: 5,
      }}>
      <View
        style={{
          height: 25,
          borderBottomWidth: 1,
          borderBottomColor: myColor.divider,
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 5,
          flexDirection: 'row',
        }}>
        <Text style={styles.textPendapatan}>Pemasukan Bulan ini :</Text>
        <Text style={styles.textPendapatan}>
          {formatRupiah(props.uang.toString(), 'Rp. ')}
          {/* Rp. 600.000 */}
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingHorizontal: 10,
        }}>
        <TouchableOpacity onPress={() => navigation.push('Profil')}>
          <View style={styles.featureBox}>
            <FontAwesome5
              name="user-circle"
              color={myColor.blackText}
              size={30}
            />
            <Text style={styles.textFeature}>Profil</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => alert('todo')}>
          <View style={styles.featureBox}>
            <FontAwesome5
              name="house-user"
              color={myColor.blackText}
              size={30}
            />
            <Text style={styles.textFeature}>Kost Saya</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => alert('todo')}>
          <View style={styles.featureBox}>
            <Foundation
              name="clipboard-notes"
              color={myColor.blackText}
              size={30}
            />
            <Text style={styles.textFeature}>Tagihan</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => alert('todo')}>
          <View style={styles.featureBox}>
            <FontAwesome5 name="history" color={myColor.blackText} size={30} />
            <Text style={styles.textFeature}>Riwayat</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeTopMenu;

const styles = StyleSheet.create({
  textPendapatan: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 12,

    color: myColor.fbtx,
  },
  featureBox: {
    width: 0.17 * screenWidth,
    height: 55,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textFeature: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 12,
    color: myColor.fbtx,
  },
});
