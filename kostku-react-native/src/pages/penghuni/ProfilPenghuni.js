import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {
  APIUrl,
  defaultAsset,
  myColor,
  screenWidth,
  dataBulan,
} from '../../function/MyVar';
import {ButtonStickyTab} from './atoms';
import {TabBarang, TabTagihan, TabInfo} from './components';
import ImageViewer from 'react-native-image-zoom-viewer';
import {HeaderPage, PureModal} from '../../components';
import Modal from 'react-native-translucent-modal';
import OptionsMenu from 'react-native-option-menu';
import Feather from 'react-native-vector-icons/Feather';
import Spinner from 'react-native-loading-spinner-overlay';
const ProfilPenghuni = ({navigation, route}) => {
  const dataRedux = useSelector((state) => state.AuthReducer);
  const [umurPenghuni, setumurPenghuni] = useState(0);
  const [stringTanggal_masuk, setstringTanggal_masuk] = useState('');
  const [stringTanggal_lahir, setstringTanggal_lahir] = useState('');
  const {item} = route.params;
  const [showImg, setshowImg] = useState(false);
  const [imageIndex, setimageIndex] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    console.log('useeffect profil');
    let dateNow = new Date();
    let dateBirth = new Date(item.tanggal_lahir);
    let dateIn = new Date(item.tanggal_masuk);
    dateBirth.setHours(
      dateBirth.getHours() + dateBirth.getTimezoneOffset() / 60,
    );
    dateIn.setHours(dateIn.getHours() + dateIn.getTimezoneOffset() / 60);
    let dif = dateNow.getTime() - dateBirth.getTime();
    setumurPenghuni(Math.floor(dif / (1000 * 3600 * 24 * 365)));

    setstringTanggal_lahir(
      `${dateBirth.getDate()} ${
        dataBulan[dateBirth.getMonth()].nama
      } ${dateBirth.getFullYear()}`,
    );

    setstringTanggal_masuk(
      `${dateIn.getDate()} ${
        dataBulan[dateIn.getMonth()].nama
      } ${dateIn.getFullYear()}`,
    );
    console.log('useeffect profil');
    console.log(
      `${dateIn.getDate()} ${
        dataBulan[dateIn.getMonth()].nama
      } ${dateIn.getFullYear()}`,
    );
  }, [item]);

  const [lebar, setlebar] = useState(screenWidth);

  const ref = useRef();
  const scrollRef = useRef();

  // const [pendaftarItem, setpendaftarItem] = useState([]);
  const [profilImg, setprofilImg] = useState(
    APIUrl + '/storage/images/pendaftar/' + item.foto_diri,
  );

  const pindahKamar = () => {
    navigation.push('PilihKelas', item);
  };

  const editPenghuni = () => {
    navigation.push('EditPenghuni', item);
  };

  const hapusPenghuni = () => {
    setisLoading(true);
    axios
      .post(`${APIUrl}/api/konfirmasi_hapus`, {id: item.id})
      .then((res) => {
        setisLoading(false);
        let pesan = '';
        if (res.data.count !== null) {
          // // const source = axios.CancelToken.source();
          // // ambilApi(source.token);
          // // setIsLoading(true);
          // console.log(res.data);
          // alert('ADA TAGIHAN' + res.data.count);

          // // navigation.reset({
          // //   routes: [{name: 'PenghuniStackScreen'}],
          // // });
          pesan = `Penghuni ini memiliki ${res.data.count.count} tagihan yang belum lunas, yakin ingin menghapus?`;
        } else {
          pesan = `Penghuni ini bebas dari tagihan, yakin ingin menghapus?`;
        }

        Alert.alert(
          'Konfirmasi',
          pesan,
          [
            {
              text: 'Batal',
              onPress: () => console.log('Batal Hapus'),
              style: 'cancel',
            },
            {text: 'Ya', onPress: () => decideHapus()},
          ],
          {cancelable: false},
        );
      })
      .catch((error) => {
        console.log(error);
        alert(id_kelas);
      });
  };

  const decideHapus = () => {
    axios
      .post(`${APIUrl}/api/hapus_penghuni`, {id: item.id})
      .then((res) => {
        if (res.data.success) {
          navigation.reset({
            routes: [{name: 'PenghuniStackScreen'}],
          });
        } else {
          alert('Penghuni tidak bisa dihapus');
        }
      })
      .catch((error) => {
        console.log(error);
        alert(id_kelas);
        alert('Error Hapus Penghuni');
      });
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

  const datapage = [
    {
      id: 0,
      page: (
        <TabInfo
          lebar={lebar}
          selectedTab={selectedTab}
          index={0}
          data={item}
          tanggal_masuk={stringTanggal_masuk}
          tanggal_lahir={stringTanggal_lahir}
          showKTP={() => {
            setimageIndex(1);
            setshowImg(true);
          }}
        />
      ),
    },
    {
      id: 1,
      page: <TabTagihan lebar={lebar} data={item} id_penghuni={item.id} />,
    },
    {
      id: 2,
      page: <TabBarang lebar={lebar} id_penghuni={item.id} />,
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
        textContent={'Tunggu Sebentar'}
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
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingTop: StatusBar.currentHeight + 5,
            paddingHorizontal: 5,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Feather name="arrow-left" color={'#fff'} size={25} />
          </TouchableOpacity>

          <OptionsMenu
            customButton={
              <Feather name="more-vertical" size={25} color={'#fff'} />
            }
            destructiveIndex={1}
            options={[
              'Edit Penghuni',
              'Hapus Penghuni',
              'Pindah Kamar',
              'Batal',
            ]}
            actions={[editPenghuni, hapusPenghuni, pindahKamar]}
          />
        </View>

        {/* section 2 */}

        <View style={styles.wrapperTanggapan}>
          <View style={styles.posProfilePic}>
            <TouchableOpacity
              activeOpacity={0.3}
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
                {item.kelamin == 1 ? 'Pria' : 'Wanita'}, {umurPenghuni} Tahun
              </Text>
            </View>
          </View>

          {/* <TouchableOpacity
            onPress={() => {
              navigation.push('EditPenghuni', item);
            }}>
            <View style={styles.btTanggapi}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'OpenSans-SemiBold',
                  fontSize: 12,
                }}>
                Edit
              </Text>
            </View>
          </TouchableOpacity> */}
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
              title="Informasi Penghuni"
            />

            <ButtonStickyTab
              onPress={() => {
                setselectedTab(1);
              }}
              selectedTab={selectedTab}
              index={1}
              title="Tagihan"
            />
            <ButtonStickyTab
              onPress={() => {
                setselectedTab(2);
              }}
              selectedTab={selectedTab}
              index={2}
              title="Kamar & Barang"
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

export default ProfilPenghuni;

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
