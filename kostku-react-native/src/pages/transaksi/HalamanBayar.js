import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
  Button,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';

import {myAxios} from '../../function/MyAxios';
import {APIUrl, formatRupiah, myColor} from '../../function/MyVar';
import {ModalDaftarPenghuni, ModalRiwayat, TabRiwayat, TabTransaksi} from './';
import {BGStatusBar} from '../../components/atoms';
import {ButtonDaftarPenghuni, TabBayar} from './components';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const HalamanBayar = () => {
  const dataRedux = useSelector((state) => state.AuthReducer);
  const [showModal, setshowModal] = useState(false);
  const [showModalRiwayat, setshowModalRiwayat] = useState(false);
  const [showModalBayar, setshowModalBayar] = useState(false);
  const [penghuni, setpenghuni] = useState(undefined);
  const [currentPage, setcurrentPage] = useState(0);
  const [nominalBayar, setnominalBayar] = useState(0);

  const [lebar, setlebar] = useState(screenWidth);

  const [selectedRiwayat, setSelectedRiwayat] = useState({
    nama: '',
    jumlah: 11,
  });
  // const [selectedTab, setselectedTab] = useState(0);
  const mountedAnimated = useRef(new Animated.Value(0)).current;
  const translateY = mountedAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });
  const ref = useRef();

  // const [lebar, setlebar] = useState(screenWidth)

  function showDetailRiwayat(value) {
    setSelectedRiwayat(value);
    setshowModalRiwayat(true);
  }

  // Halaman konten
  const datapage = [
    {
      id: 'page0',
      page: (
        <TabTransaksi
          token={dataRedux.token}
          penghuni={penghuni}
          lebar={lebar}
          onPress={() => setshowModalBayar(true)}
          setPenghuni={(v) => {
            setpenghuni(v);
          }}
        />
      ),
    },
    {
      id: 'page1',
      page: (
        <TabRiwayat
          lebar={lebar}
          token={dataRedux.token}
          penghuni={penghuni}
          fungsiparent={showDetailRiwayat}
        />
      ),
    },
  ];

  const animation = (toValue, delay) =>
    Animated.timing(mountedAnimated, {
      toValue,
      duration: 500,
      delay,
      useNativeDriver: true,
    }).start();

  useEffect(() => {
    animation(1, 500);
  }, []);

  const refreshPenghuni = () => {
    const source = axios.CancelToken.source();
    if (penghuni !== undefined) {
      myAxios.getAxios(
        APIUrl + '/api/gettagihanbyid/' + penghuni.id,
        dataRedux.token,
        source.token,
        onGet,
      );
      function onGet(status, data) {
        if (status == 'success') {
          console.log('Get data kost success');

          setpenghuni(data.data);
          console.log(data);
        } else if (status == 'cancel') {
          console.log('caught cancel filter');
        } else {
          console.log('alert refresh penghuni');
          console.log(data);
        }
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: myColor.colorTheme,
        position: 'relative',
        paddingTop: StatusBar.currentHeight,
      }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      {/* <BGStatusBar /> */}

      <Modal
        visible={showModal}
        transparent={true}
        onRequestClose={() => setshowModal(false)}>
        <ModalDaftarPenghuni
          token={dataRedux.token}
          id_kost={dataRedux.user.kostku}
          itemClick={(item) => {
            setpenghuni(item);
            setshowModal(false);
          }}
          closeModal={() => {
            setshowModal(false);
          }}
        />
      </Modal>

      {/* MODAL BAYAR  */}

      {/* <Modal
        visible={showModalBayar}
        transparent={true}
        onRequestClose={() => {
          setnominalBayar(parseInt(0));
          setshowModalBayar(false);
        }}>
        <ModalBayar
          nominalBayar={nominalBayar}
          ubahNominal={(e) => setnominalBayar(e)}
          bayarTagihan={bayarTagihan}
        />
      </Modal> */}

      {/* END MODAL BAYAR  */}

      {/* MODAL Detail Riwayat  */}
      <Modal
        visible={showModalRiwayat}
        transparent={true}
        onRequestClose={() => {
          setnominalBayar(parseInt(0));
          setshowModalRiwayat(false);
        }}>
        <ModalRiwayat
          data={selectedRiwayat}
          closeModal={() => setshowModalRiwayat(false)}
        />
      </Modal>

      {/* END OF MODAL DETAIL RIWAYAT  */}
      <View
        style={{
          paddingHorizontal: 0.05 * screenWidth,
          flex: 1,
        }}>
        <ButtonDaftarPenghuni
          onPress={() => {
            setshowModal(true);
          }}
          penghuni={penghuni}
        />

        <View
          style={{
            flex: 1,

            // width: 0.9 * screenWidth,
            backgroundColor: '#f6f6f6',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            marginTop: 10,
          }}>
          {/* section tab select  */}
          <View style={{flexDirection: 'row'}}>
            <TabBayar
              title="Tagihan"
              id={0}
              lebar={lebar}
              selectedTab={currentPage}
              onPress={() => {
                setcurrentPage(0);
                ref.current.scrollToIndex({
                  index: 0,
                  animated: true,
                });
              }}
            />
            <TabBayar
              title="Riwayat"
              id={1}
              lebar={lebar}
              selectedTab={currentPage}
              onPress={() => {
                setcurrentPage(1);
                ref.current.scrollToIndex({
                  index: 1,
                  animated: true,
                });
              }}
            />
          </View>

          {/* content */}
          <Animated.FlatList
            style={{opacity: mountedAnimated, transform: [{translateY}]}}
            ref={ref}
            data={datapage}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            initialScrollIndex={0}
            showsHorizontalScrollIndicator={false}
            onLayout={(event) => {
              const {x, y, width, height} = event.nativeEvent.layout;
              // console.log(width, width);
              setlebar(width);

              // do something here like set your initial animated value for the height
            }}
            onMomentumScrollEnd={(ev) => {
              const newIndex = Math.floor(
                // ev.nativeEvent.contentOffset.x / (0.9 * screenWidth),
                ev.nativeEvent.contentOffset.x / lebar,
              );
              // console.log(ev.nativeEvent.layoutMeasurement.width);
              // setlebar(ev.nativeEvent.layoutMeasurement.width);
              console.log(newIndex);
              setcurrentPage(newIndex);
            }}
            renderItem={({item, index, separator}) => {
              return item.page;
            }}
          />
        </View>
      </View>

      {/* <Text>AYAYA CLAP</Text> */}
      {/* <View style={{backgroundColor: 'red', flex: 1}}></View> */}
    </View>
  );
};

export default HalamanBayar;

const styles = StyleSheet.create({
  nama: {
    fontSize: 14,
    fontFamily: 'OpenSans-SemiBold',
    color: myColor.fbtx,
    maxWidth: 0.5 * screenWidth,
  },
  harga: {
    fontSize: 12,
    fontFamily: 'OpenSans-Regular',
    color: myColor.darkText,
    maxWidth: 0.5 * screenWidth,
  },
  tabWrapper: {
    width: 0.45 * screenWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textinfo: {
    fontSize: 12,
    color: myColor.fbtx,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
