import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {myColor} from '../../function/MyVar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {HomeClipper} from '../../components/atoms';
import {
  HomeTitleDrawer,
  HomeTopMenu,
  HomePenghuniSection,
  HomeKamarSection,
} from '../../components';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const MyHome = () => {
  return (
    <View
      style={{
        flex: 1,
        // alignItems: 'center',
      }}>
      <StatusBar translucent backgroundColor="transparent" />

      <HomeClipper />

      {/* WRAPPER ATAS SAMPAI CLIPPER  */}
      <View
        style={{
          paddingTop: StatusBar.currentHeight,
          alignItems: 'center',
          width: screenWidth,
          height: 0.5 * screenWidth,
        }}>
        <HomeTitleDrawer />
        <HomeTopMenu />
      </View>
      <View
        style={{
          marginTop: 10,
          flex: 1,
        }}>
        {/* PENGHUNI SECTION */}
        <HomePenghuniSection />
        {/* Kamar Section */}
        <HomeKamarSection />

        {/* TRANSAKSI SECTION */}

        <View style={{marginTop: 20}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 0.05 * screenWidth,
            }}>
            <Text style={styles.sectionTitle}>Transaksi Terakhir</Text>
            <Text style={styles.seeAll}>Lihat Semua</Text>
          </View>
          <View style={{marginTop: 10}}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{paddingLeft: 0.05 * screenWidth}}></ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MyHome;

const styles = StyleSheet.create({});
