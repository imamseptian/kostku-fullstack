import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Animated,
  Image,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import StepIndicator from 'react-native-step-indicator';
import {SharedElement} from 'react-navigation-shared-element';
import {useSelector} from 'react-redux';
import {APIUrl, myColor, screenWidth} from '../../function/MyVar';
import {BarangTambahan, PendaftarBerkas, PendaftarInfo} from './component';

const DetailPendaftar = ({navigation, route}) => {
  const dataRedux = useSelector((state) => state.AuthReducer);
  // useEffect(() => {
  //   route.state !== undefined
  //     ? route.state.index > 0
  //       ? navigation.setOptions({gestureEnabled: false})
  //       : navigation.setOptions({gestureEnabled: true})
  //     : null;
  // }, [navigation, route]);
  const [showImg, setshowImg] = useState(false);
  const [imageIndex, setimageIndex] = useState(0);
  const {item} = route.params;
  const [pendaftarItem, setpendaftarItem] = useState([]);

  const handleInputChange = (e, index, inputType) => {
    const list = [...pendaftarItem];
    list[index][inputType] = e;
    setpendaftarItem(list);
  };

  // const [formatHarga, setformatHarga] = useState([]);

  // useEffect(() => {
  //   // setForm('harga', rupiahToInt(formatHarga));
  //   setbarangPenghuni({...barangPenghuni, total: rupiahToInt(formatHarga)});
  //   // rupiahToInt(formatHarga);
  // }, [formatHarga]);

  const datapage = [
    {id: 'page0', page: <PendaftarInfo data={item} />},
    {
      id: 'page1',
      page: (
        <PendaftarBerkas
          data={item}
          onPress={() => {
            setimageIndex(1);
            setshowImg(true);
          }}
        />
      ),
    },
    {
      id: 'page2',
      page: (
        <BarangTambahan
          // data={item}
          dataChange={pendaftarItem}
          ubahHarga={(x, y, z) => {
            // setpendaftarItem({...pendaftarItem, barang_tambahan: e});
            handleInputChange(x, y, z);
            // console.log(e);
          }}
        />
      ),
    },
  ];

  const labels = ['Info', 'Berkas', 'Barang Bawaan'];
  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#fe7013',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#aaaaaa',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#aaaaaa',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#ffffff',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#fe7013',
    stepIndicatorLabelFinishedColor: '#aaaaaa',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#fe7013',
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    // const ayaya = CancelToken.

    let three = APIUrl + '/api/pendaftar/' + item.id;

    axios
      .put(
        three,
        {isread: true},
        {
          headers: {
            Authorization: `Bearer ${dataRedux.token}`,
          },
          cancelToken: source.token,
        },
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((errors) => {
        if (axios.isCancel(errors)) {
          // setIsLoading(false);
          console.log('caught cancel on ambil api pendaftar');
        } else {
          // setIsLoading(false);
          throw errors;
        }
      });

    axios
      .post(APIUrl + '/api/barang_pendaftar', {id_pendaftar: item.id})
      .then((res) => {
        // let tempList = [];
        res.data.barang.forEach((x, i) => {
          x.total = 0;
          console.log(`Index ${i}`);
          console.log(`Isi ${x.nama}`);
          // tempList.push(formatRupiah('0', 'Rp. '));
        });
        // setformatHarga(tempList);

        setpendaftarItem(res.data.barang);
      })
      .catch((errors) => {
        if (axios.isCancel(errors)) {
          // setIsLoading(false);
          console.log('caught cancel on ambil api pendaftar');
        } else {
          // setIsLoading(false);
          throw errors;
        }
      });
    return () => {
      source.cancel('Api Canceled');
    };
  }, []);

  const ref = useRef();
  const [currentPage, setcurrentPage] = useState(0);
  const images = [
    {
      url: APIUrl + '/kostdata/pendaftar/foto/' + item.foto_diri,

      props: {
        // headers: ...
      },
    },
    {
      url: APIUrl + '/kostdata/pendaftar/foto/' + item.foto_ktp,

      props: {
        // headers: ...
      },
    },
  ];

  const mountedAnimated = useRef(new Animated.Value(0)).current;
  const activeIndex = useRef(new Animated.Value(0)).current;

  const animation = (toValue, delay) =>
    Animated.timing(mountedAnimated, {
      toValue,
      duration: 500,
      delay,
      useNativeDriver: true,
    }).start();

  useEffect(() => {
    animation(1, 500);
  });

  const translateY = mountedAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  const decidePenghuni = (statTerima) => {
    // const ayaya = CancelToken.
    console.log('decide penghuni');
    axios
      .post(
        'https://dry-forest-53707.herokuapp.com/api/tambah_penghuni',
        {...item, terima: statTerima, barang_tambahan: pendaftarItem},
        {
          headers: {
            Authorization: `Bearer ${dataRedux.token}`,
          },
        },
      )
      .then((response) => {
        // console.log(response.data);
        // console.log(response.data.data.active);
        // console.log(response.data.data.barang_tambahan);
        if (response.data.code == 200) {
          navigation.pop(1);
        } else {
          alert(
            'Maaf kamar yang didaftarkan penuh, silahkan hubungi pendaftar untuk mendaftar ke kamar lain',
          );
        }
      })
      .catch((error) => {
        console.log('error jembod');
        console.log(item);
        console.log(pendaftarItem);
        alert('error');
        // console.log(error);
        console.log('kantal');
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#f6f6f6'}}>
      {/* {showImg ? null : <StatusBar hidden translucent backgroundColor="transparent" />} */}
      <StatusBar translucent backgroundColor="transparent" />

      <Modal
        visible={showImg}
        transparent={true}
        onRequestClose={() => setshowImg(false)}>
        <ImageViewer
          imageUrls={images}
          enableSwipeDown={true}
          index={imageIndex}
          onSwipeDown={() => setshowImg(false)}
        />
      </Modal>
      <View>
        <TouchableNativeFeedback
          onPress={() => {
            setimageIndex(0);
            setshowImg(true);
          }}>
          <SharedElement id={`item.${item.id}.foto_pendaftar`}>
            <Image
              source={{
                uri: APIUrl + '/kostdata/pendaftar/foto/' + item.foto_diri,
              }}
              style={{
                width: screenWidth,
                height: (2 / 3) * screenWidth,
              }}
              resizeMode="cover"
            />
          </SharedElement>
        </TouchableNativeFeedback>
      </View>
      <View style={{flex: 1, paddingTop: 30}}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            fontFamily: 'OpenSans-SemiBold',
          }}>
          {item.nama_depan} {item.nama_belakang}
          {/* {JSON.stringify(pendaftarItem)} */}
        </Text>
        <Animated.FlatList
          style={{
            opacity: mountedAnimated,
            transform: [{translateY}],
          }}
          ref={ref}
          data={datapage}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          initialScrollIndex={0}
          getItemLayout={(data, index) => ({
            length: screenWidth,
            offset: screenWidth * index,
            index,
          })}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(ev) => {
            const newIndex = Math.floor(
              ev.nativeEvent.contentOffset.x / screenWidth,
            );
            console.log('index om', newIndex);
            console.log(activeIndex);
            activeIndex.setValue(newIndex);
            setcurrentPage(newIndex);
          }}
          renderItem={({item, index, separator}) => {
            return item.page;
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          position: 'absolute',
          top: (2 / 3) * screenWidth - 20,
          right: 0.5 * screenWidth - 125,
          zIndex: 1,
          width: 250,
        }}>
        <TouchableWithoutFeedback
          onPress={() => {
            console.log(item);
            Alert.alert(
              'Konfirmasi',
              'Apakah data biaya barang tambahan penghuni sudah benar?',
              [
                {
                  text: 'Batal',
                  onPress: () => alert('cancel'),
                  style: 'cancel',
                },
                {
                  text: 'Ya',
                  onPress: () => {
                    Alert.alert(
                      'Konfirmasi',
                      'Apakah anda yakin menerima orang berikut menjadi penghuni kost anda ?',
                      [
                        {
                          text: 'Batal',
                          onPress: () => alert('cancel'),
                          style: 'cancel',
                        },
                        {text: 'Ya', onPress: () => decidePenghuni(true)},
                      ],
                      {cancelable: false},
                    );
                  },
                },
              ],
              {cancelable: false},
            );
          }}>
          <View
            style={{
              height: 40,
              width: 100,
              borderRadius: 10,

              backgroundColor: myColor.success,

              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'OpenSans-Bold',
                color: myColor.fbtx,
              }}>
              Terima
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            Alert.alert(
              'Konfirmasi',
              'Apakah anda yakin menolak orang berikut menjadi penghuni kost anda ?',
              [
                {
                  text: 'Batal',
                  onPress: () => alert('cancel'),
                  style: 'cancel',
                },
                {text: 'Ya', onPress: () => decidePenghuni(false)},
              ],
              {cancelable: false},
            );
          }}>
          <View
            style={{
              height: 40,
              width: 100,
              borderRadius: 10,

              backgroundColor: myColor.alert,

              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'OpenSans-Bold',
                color: '#fff',
              }}>
              Tolak
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>

      <StepIndicator
        customStyles={customStyles}
        currentPosition={currentPage}
        labels={labels}
        stepCount={3}
        onPress={(e) => {
          setcurrentPage(e);
          ref.current.scrollToIndex({
            index: e,
            animated: true,
          });
        }}
      />
    </View>
  );
};

DetailPendaftar.sharedElements = (route, otherRoute, showing) => {
  const {item} = route.params;
  console.log('anim pendaftar');
  console.log(item);
  // return DATA_ICON.map((item) => `item.${item.id}.icon`);

  return [`item.${item.id}.foto_pendaftar`];
};

export default DetailPendaftar;

const styles = StyleSheet.create({});
