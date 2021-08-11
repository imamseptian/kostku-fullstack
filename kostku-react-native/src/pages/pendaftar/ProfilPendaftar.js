import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  TextInput,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {defaultAsset, myColor, screenWidth, APIUrl} from '../../function/MyVar';
import {TabBarang, TabBerkas, TabInfo} from './component';
import {ButtonStickyTab} from './atoms';
import {SharedElement} from 'react-navigation-shared-element';
import axios from 'axios';
import {useSelector} from 'react-redux';
import ImageViewer from 'react-native-image-zoom-viewer';
import {HeaderPage, PureModal} from '../../components';
import Modal from 'react-native-translucent-modal';

const ProfilPendaftar = ({navigation, route}) => {
  const dataRedux = useSelector((state) => state.AuthReducer);
  const [isLoading, setisLoading] = useState(false);
  const [lebar, setlebar] = useState(screenWidth);
  const [tolakModalShow, settolakModalShow] = useState(false);
  const [alasanTolak, setalasanTolak] = useState('');

  const ref = useRef();
  const scrollRef = useRef();
  const {item} = route.params;
  const [pendaftarItem, setpendaftarItem] = useState([]);
  const [profilImg, setprofilImg] = useState(
    APIUrl + '/storage/images/pendaftar/' + item.foto_diri,
  );
  const [showImg, setshowImg] = useState(false);
  const [imageIndex, setimageIndex] = useState(0);
  const handleInputChange = (e, index, inputType) => {
    const list = [...pendaftarItem];
    list[index][inputType] = e;
    setpendaftarItem(list);
  };
  const images = [
    {
      url: APIUrl + '/storage/images/pendaftar/' + item.foto_diri,

      props: {
        // headers: ...
      },
    },
    {
      url: APIUrl + '/storage/images/pendaftar/' + item.foto_ktp,

      props: {
        // headers: ...
      },
    },
  ];

  useEffect(() => {
    const source = axios.CancelToken.source();
    // const ayaya = CancelToken.

    let three = APIUrl + '/api/pendaftar/' + item.id;

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
  }, [route.params]);

  const datapage = [
    {
      id: 0,
      page: (
        <TabInfo
          lebar={lebar}
          selectedTab={selectedTab}
          index={0}
          data={item}
        />
      ),
    },
    {
      id: 1,
      page: (
        <TabBerkas
          lebar={lebar}
          selectedTab={selectedTab}
          index={1}
          data={item}
          showKTP={() => {
            setimageIndex(1);
            setshowImg(true);
          }}
        />
      ),
    },
    {
      id: 2,
      page: (
        <TabBarang
          lebar={lebar}
          // selectedTab={selectedTab}
          // index={2}
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

  const [selectedTab, setselectedTab] = useState(0);

  useEffect(() => {
    ref.current.scrollToIndex({
      index: selectedTab,
      animated: true,
    });
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  }, [selectedTab]);

  const decidePenghuni = (statTerima) => {
    // const ayaya = CancelToken.
    console.log('decide penghuni');
    setisLoading(true);
    axios
      .post(
        APIUrl + '/api/tambah_penghuni',
        {
          ...item,
          terima: statTerima,
          barang_tambahan: pendaftarItem,
          alasan: alasanTolak,
        },
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
          setisLoading(false);
          navigation.pop(1);
        } else {
          setisLoading(false);
          alert(
            'Maaf kamar yang didaftarkan penuh, silahkan hubungi pendaftar untuk mendaftar ke kamar lain',
          );
        }
      })
      .catch((error) => {
        setisLoading(false);

        console.log(item);
        console.log(pendaftarItem);
        alert('error');
        // console.log(error);
      });
  };

  return (
    <View
      onLayout={(event) => {
        const {x, y, width, height} = event.nativeEvent.layout;
        setlebar(width);
      }}
      style={{flex: 1, backgroundColor: '#f6f6f6'}}>
      <StatusBar translucent backgroundColor="transparent" />
      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={{color: '#FFF'}}
      />
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
      <Modal
        visible={tolakModalShow}
        transparent={true}
        onRequestClose={() => settolakModalShow(false)}>
        <PureModal>
          <View
            style={{
              width: '80%',
              backgroundColor: 'white',
              borderTopLeftRadius: 5,
              borderTopRightRadius: 20,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 5,
              paddingHorizontal: 15,
              paddingVertical: 10,
            }}>
            <Text
              style={{
                fontFamily: 'OpenSans-SemiBold',
                fontSize: 12,
                textAlign: 'center',
                marginBottom: 15,
              }}>
              Silahkan Masukan Alasan Penolakan
            </Text>
            <TextInput
              value={alasanTolak}
              placeholder="Masukan Alasan"
              onChangeText={(v) => {
                setalasanTolak(v);
              }}
              style={{
                borderWidth: 1,
                borderColor: myColor.divider,
                fontFamily: 'OpenSans-Regular',
                fontSize: 12,
                marginBottom: 20,
                paddingHorizontal: 10,
              }}
            />
            <TouchableOpacity onPress={() => decidePenghuni(false)}>
              <View
                style={{
                  paddingVertical: 10,
                  backgroundColor: myColor.myblue,
                  alignItems: 'center',
                  borderRadius: 5,
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'OpenSans-SemiBold',
                    color: '#fff',
                  }}>
                  Submit Penolakan
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </PureModal>
      </Modal>
      {/* section 1  */}
      <ScrollView
        ref={scrollRef}
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[2]}>
        <View
          style={{
            height: 100,
            backgroundColor: myColor.colorTheme,
          }}></View>

        {/* section 2 */}

        <View style={styles.wrapperTanggapan}>
          <View style={styles.posProfilePic}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.bgProfilePic}
              onPress={() => {
                setimageIndex(0);
                setshowImg(true);
              }}>
              {/* <SharedElement id={`item.${item.id}.foto_pendaftar`}> */}
              <Image
                source={{uri: profilImg}}
                style={styles.profilePic}
                onError={(e) => setprofilImg(defaultAsset.foto_profil)}
              />
              {/* </SharedElement> */}
            </TouchableOpacity>

            <View style={styles.wrapperNama}>
              <Text style={{fontFamily: 'OpenSans-SemiBold', fontSize: 14}}>
                {item.nama}
              </Text>
              <Text
                style={{
                  fontFamily: 'OpenSans-Regular',
                  fontSize: 12,
                  color: myColor.darkText,
                }}>
                {item.kelamin == 1 ? 'Pria' : 'Wanita'}, 21 Tahun
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              console.log(item);
              Alert.alert(
                'Konfirmasi Respon',
                'Terima pendaftar sebagai penghuni kost anda?',
                [
                  {
                    text: 'Tolak',
                    onPress: () => settolakModalShow(true),
                    style: 'cancel',
                  },
                  {
                    text: 'Ya',
                    onPress: () => {
                      Alert.alert(
                        'Konfirmasi Biaya Barang',
                        'Yakin dengan biaya bulanan barang penghuni yang sudah ditentukan ?',
                        [
                          {
                            text: 'Periksa Kembali',
                            onPress: () => setselectedTab(2),
                            style: 'cancel',
                          },
                          {text: 'Yakin', onPress: () => decidePenghuni(true)},
                        ],
                        {cancelable: false},
                      );
                    },
                  },
                ],
                {cancelable: false},
              );
            }}>
            <View style={styles.btTanggapi}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'OpenSans-SemiBold',
                  fontSize: 12,
                }}>
                Tanggapi
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* section 3  */}
        <View style={styles.wrapperSticky}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <ButtonStickyTab
              onPress={() => {
                setselectedTab(0);
              }}
              selectedTab={selectedTab}
              index={0}
              title="Informasi Pendaftar"
            />

            <ButtonStickyTab
              onPress={() => {
                setselectedTab(1);
              }}
              selectedTab={selectedTab}
              index={1}
              title="Berkas&Pesanan"
            />
            <ButtonStickyTab
              onPress={() => {
                setselectedTab(2);
              }}
              selectedTab={selectedTab}
              index={2}
              title="Barang Bawaan"
            />
          </View>
        </View>

        {/* section 4 / content  */}

        <FlatList
          style={{flex: 1}}
          ref={ref}
          data={datapage}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          pagingEnabled
          initialScrollIndex={0}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(ev) => {
            const newIndex = Math.floor(ev.nativeEvent.contentOffset.x / lebar);
            // console.log(newIndex);
            setselectedTab(newIndex);
          }}
          renderItem={({item, index, separator}) => {
            return item.page;
          }}
        />
        {/* <Text></Text> */}
      </ScrollView>
    </View>
  );
};

ProfilPendaftar.sharedElements = (route, otherRoute, showing) => {
  const {item} = route.params;
  console.log('anim pendaftar');
  console.log(item);
  // return DATA_ICON.map((item) => `item.${item.id}.icon`);

  return [`item.${item.id}.foto_pendaftar`];
};

export default ProfilPendaftar;

const styles = StyleSheet.create({
  wrapperTanggapan: {
    backgroundColor: '#f6f6f6',
    position: 'relative',
    height: 45,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 5,
  },
  posProfilePic: {
    position: 'absolute',
    top: -25,
    left: 30,
    width: 200,
    flexDirection: 'row',
  },
  bgProfilePic: {
    width: 70,
    height: 70,
    backgroundColor: myColor.grayGoogle,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 2,
    borderColor: '#f6f6f6',
  },
  profilePic: {
    height: 70,
    width: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#f6f6f6',
  },
  wrapperNama: {paddingTop: 30, marginLeft: 10},
  btTanggapi: {
    height: 30,
    width: 90,
    backgroundColor: myColor.myblue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
  },
  wrapperSticky: {
    backgroundColor: '#f6f6f6',
    paddingTop: StatusBar.currentHeight,
  },
});
