import {useIsFocused} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {useSelector} from 'react-redux';
import {
  HomeKamarSection,
  HomePenghuniSection,
  HomeTitleDrawer,
  HomeTopMenu,
} from '../../components';
import {HomeClipper} from '../../components/atoms';
import {myAxios} from '../../function/MyAxios';
import {APIUrl, myColor} from '../../function/MyVar';
import {TransaksiSection, HomeRec} from './component';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const HomeScreen = ({navigation, route}) => {
  // STATE WHEN SCREEN FOCUSED
  const isFocused = useIsFocused();

  // Variabel Homescreen
  const dataRedux = useSelector((state) => state.AuthReducer);
  const [isLoading, setIsLoading] = useState(false);
  const [dataHomescreen, setdataHomescreen] = useState({
    penghuni: [],
    kamar: [],
    transaksi: [],
    uang: 0,
  });

  // Fungsi on app mount
  useEffect(() => {
    console.log('ini fungsi first time');
    // checkFirstTime();
    const source = axios.CancelToken.source();
    setIsLoading(true);
    myAxios.getAxios(
      APIUrl + '/api/firsttime',
      dataRedux.token,
      source.token,
      onGet,
    );
    function onGet(status, data) {
      if (status == 'success') {
        console.log('first time sukses');
        setIsLoading(false);
        if (data.data < 1) {
          navigation.reset({
            index: 0,
            routes: [{name: 'FirstScreen'}],
          });
        }
      } else if (status == 'cancel') {
        console.log('cancel API');
        setIsLoading(false);
      } else {
        console.log(data);
        setIsLoading(false);
      }
    }

    return () => {
      source.cancel('Component got unmounted');
      console.log('HomeScreen unmounted');
    };
  }, []);

  // Fungsi saat app focus homescreen
  useEffect(() => {
    const source = axios.CancelToken.source();
    console.log('fungsi homescreen');
    if (isFocused) {
      if (dataRedux.user != undefined && dataRedux.user.kostku != 0) {
        // console.log(dataHomescreen.penghuni.length);
        setIsLoading(true);
        myAxios.getAxios(
          APIUrl + '/api/homescreen/' + dataRedux.user.kostku,
          dataRedux.token,
          source.token,
          onGet,
        );
        function onGet(status, data) {
          if (status == 'success') {
            console.log('Get data kost success');
            // console.log(data);
            setdataHomescreen({
              ...dataHomescreen,
              penghuni: data.data_penghuni,
              kamar: data.data_kamar,
              transaksi: data.transaksi,
              uang: data.uang,
            });
            setIsLoading(false);
          } else if (status == 'cancel') {
            console.log('caught cancel filter');
            setIsLoading(false);
          } else {
            console.log(data);
            console.log();
            setIsLoading(false);
          }
        }
      }
    }

    return () => {
      source.cancel('Component got unmounted');
      console.log('HomeScreen lost focus');
    };
  }, [isFocused]);

  return (
    <View
      style={{
        flex: 1,
        // alignItems: 'center',
        // backgroundColor: myColor.colorTheme,
        // paddingTop: StatusBar.currentHeight + 5,
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
        stickyHeaderIndices={[1]}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />

        {/* <HomeClipper /> */}

        {/* WRAPPER ATAS SAMPAI CLIPPER  */}
        {/* <View style={styles.contentWrapper}> */}
        <HomeTitleDrawer bukaDrawer={() => navigation.toggleDrawer()} />
        <View
          style={{
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            paddingHorizontal: 15,
            paddingBottom: 10,
            backgroundColor: myColor.colorTheme,
          }}>
          {/* <HomeTopMenu uang={dataHomescreen.uang} /> */}
          <HomeRec
            uang={dataHomescreen.uang}
            nama={dataRedux.isAuth ? `${dataRedux.user.nama}` : null}
            foto={dataRedux.isAuth ? `${dataRedux.user.foto_profil}` : null}
          />
        </View>

        {/* </View> */}
        {/* <Text>{JSON.stringify}</Text> */}
        <View
          style={{
            flex: 1,
            // borderTopLeftRadius: 20,
            // borderTopRightRadius: 20,
            backgroundColor: '#f6f6f6',
          }}>
          {/* PENGHUNI SECTION */}
          <View style={{flex: 1, paddingTop: 10}}>
            <HomePenghuniSection
              status={isLoading}
              data={dataHomescreen.penghuni}
            />
            {/* Kamar Section */}
            <HomeKamarSection status={isLoading} data={dataHomescreen.kamar} />

            {/* TRANSAKSI SECTION */}
            <TransaksiSection
              status={isLoading}
              data={dataHomescreen.transaksi}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    color: myColor.titleHome,
    fontWeight: 'bold',
  },
  seeAll: {
    fontSize: 12,
    color: myColor.myblue,
    fontWeight: 'bold',
  },
  contentWrapper: {
    paddingTop: StatusBar.currentHeight,

    height: 0.5 * screenWidth,
    // backgroundColor: 'yellow',
    paddingHorizontal: 0.05 * screenWidth,
  },
});
