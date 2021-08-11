import React, {useEffect, useRef, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {
  Animated,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-translucent-modal';
import ImageViewer from 'react-native-image-zoom-viewer';
import {HeaderPage, PureModal} from '../../components';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {SharedElement} from 'react-navigation-shared-element';
import {APIUrl, myColor, screenWidth, formatRupiah} from '../../function/MyVar';
import {KelasInfo} from './component';
import axios from 'axios';

const DetailKelasKamar = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const [isLoading, setisLoading] = useState(false);
  const [showImg, setshowImg] = useState(false);
  const [showModalEdit, setshowModalEdit] = useState(false);
  const [imageIndex, setimageIndex] = useState(0);
  const {item} = route.params;
  const datapage = [
    {id: 'page0', page: <KelasInfo data={item} />},
    {id: 'page1', page: <KelasInfo data={item} />},
  ];

  const [dataFasilitas, setdataFasilitas] = useState([]);

  const labels = ['Info', 'Fasilitas'];
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

  const ref = useRef();
  const [currentPage, setcurrentPage] = useState(0);
  const images = [
    {
      url: APIUrl + '/storage/images/kelas/' + item.foto,

      props: {
        // headers: ...
      },
    },
  ];

  useEffect(() => {
    if (isFocused) {
      setisLoading(true);
      axios
        .get(APIUrl + '/api/getfasilitas/' + item.id)
        .then((res) => {
          if (res.data.success) {
            setdataFasilitas(res.data.data);
            setisLoading(false);
          } else {
            alert('error');
            setisLoading(false);
          }
        })
        .catch((error) => {
          setisLoading(false);
        });
    }
  }, [isFocused]);

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

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {/* {showImg ? null : <StatusBar hidden translucent backgroundColor="transparent" />} */}
      {/* <StatusBar hidden={!showImg} translucent backgroundColor="transparent"  /> */}
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

      <Modal
        visible={showModalEdit}
        transparent={true}
        onRequestClose={() => setshowModalEdit(false)}>
        <PureModal>
          <View
            style={{
              width: screenWidth * 0.7,
              backgroundColor: '#f6f6f6',
              borderRadius: 5,
            }}>
            <TouchableOpacity
              onPress={() => {
                setshowModalEdit(false);
                navigation.push('EditKelas', item);
              }}>
              <View
                style={{
                  paddingVertical: 10,
                  borderBottomColor: myColor.divider,
                  borderBottomWidth: 1,
                  borderTopRightRadius: 5,
                  borderTopLeftRadius: 5,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'OpenSans-SemiBold',
                    color: myColor.fbtx,
                    textAlign: 'center',
                  }}>
                  Edit Data Kelas
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setshowModalEdit(false);
                navigation.push('EditFasilitas', {
                  data: item,
                  fasilitas: dataFasilitas,
                });
              }}>
              <View
                style={{
                  paddingVertical: 10,
                  borderBottomColor: myColor.divider,
                  borderBottomWidth: 1,
                  borderBottomLeftRadius: 5,
                  borderBottomRightRadius: 5,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'OpenSans-SemiBold',
                    color: myColor.fbtx,
                    textAlign: 'center',
                  }}>
                  Edit Data Fasilitas
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </PureModal>
      </Modal>
      <HeaderPage title="Detail Kelas" />
      {/* <View>
        <TouchableNativeFeedback
          onPress={() => {
            setimageIndex(0);
            setshowImg(true);
          }}>
          <SharedElement id={`item.${item.id}.foto_kamar`}>
            <Image
              source={{
                uri: APIUrl + '/kostdata/kelas_kamar/foto/' + item.foto,
              }}
              style={{
                width: screenWidth,
                height: (2 / 3) * screenWidth,
              }}
              resizeMode="cover"
            />
          </SharedElement>
        </TouchableNativeFeedback>
      </View> */}
      <View style={{alignItems: 'center', paddingVertical: 10}}>
        <View style={{position: 'relative'}}>
          <TouchableWithoutFeedback
            onPress={() => {
              setimageIndex(0);
              setshowImg(true);
            }}>
            <Image
              source={{
                uri: APIUrl + '/storage/images/kelas/' + item.foto,
              }}
              style={{
                width: 300,
                height: 200,
                borderRadius: 10,
              }}
              resizeMode="cover"
            />
          </TouchableWithoutFeedback>

          <TouchableOpacity
            style={{position: 'absolute', bottom: 5, right: 5}}
            onPress={() => {
              setshowModalEdit(true);
            }}>
            <View
              style={{
                paddingVertical: 5,
                borderRadius: 5,
                backgroundColor: myColor.addfacility,

                paddingHorizontal: 15,
                opacity: 0.8,
              }}>
              <Text
                style={{
                  fontFamily: 'OpenSans-SemiBold',
                  fontSize: 14,
                  color: '#ffffff',
                }}>
                Edit
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {/* <View style={{flex: 1, paddingTop: 15}}> */}
      <Animated.View
        style={{
          flex: 1,
          opacity: mountedAnimated,
          transform: [{translateY}],
          paddingHorizontal: (screenWidth - 300) / 2,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 15,
          }}>
          <Text style={{fontSize: 16, fontFamily: 'OpenSans-SemiBold'}}>
            {item.nama}
          </Text>
          <View
            style={{
              height: 40,
              paddingHorizontal: 10,
              backgroundColor: myColor.success,
              borderRadius: 5,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'OpenSans-SemiBold',
                fontSize: 12,
                color: myColor.fbtx,
              }}>
              {formatRupiah(item.harga.toString(), 'Rp. ') + '/Bulan'}
            </Text>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text
            style={{
              fontFamily: 'OpenSans-SemiBold',
              marginBottom: 5,
              fontSize: 14,
            }}>
            Fasilitas Kamar
          </Text>
          <View style={{marginLeft: 20}}>
            {dataFasilitas.map((x, i) => {
              return (
                <View key={i} style={{flexDirection: 'row', marginBottom: 8}}>
                  <Text
                    style={{
                      fontFamily: 'OpenSans-SemiBold',
                      fontSize: 12,
                      color: myColor.fbtx,
                    }}>
                    {i + 1 + '.'}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'OpenSans-Regular',
                      fontSize: 12,
                      color: myColor.fbtx,
                      marginLeft: 5,
                    }}>
                    {x.nama}
                  </Text>
                </View>
              );
            })}
          </View>

          <Text
            style={{
              fontFamily: 'OpenSans-SemiBold',
              marginBottom: 5,
              fontSize: 14,
            }}>
            Deskripsi Kamar
          </Text>
          <Text
            style={{
              textAlign: 'justify',
              fontSize: 12,
              fontFamily: 'OpenSans-Regular',
              color: myColor.fbtx,
              marginBottom: 10,
            }}>
            {item.deskripsi}
          </Text>
        </ScrollView>

        {/* <KelasInfo
            data={item}
            onPress={() =>
              navigation.push('DaftarKamar', {
                id: item.id,
                nama: item.nama,
                kapasitas: item.kapasitas,
              })
            }
          /> */}
      </Animated.View>
      <TouchableOpacity
        onPress={() =>
          navigation.push('DaftarKamar', {
            id: item.id,
            nama: item.nama,
            kapasitas: item.kapasitas,
            foto: item.foto,
          })
        }>
        <View
          style={{
            marginHorizontal: (screenWidth - 300) / 2,
            borderRadius: 5,
            height: 40,
            backgroundColor: myColor.myblue,
            marginBottom: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'OpenSans-SemiBold',
              color: 'white',
            }}>
            Daftar Kamar
          </Text>
        </View>
      </TouchableOpacity>
      {/* </View> */}

      {/* <Animated.FlatList
          style={{opacity: mountedAnimated, transform: [{translateY}]}}
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
        /> */}

      {/* <TouchableNativeFeedback
        onPress={() =>
          navigation.push('EditKelas', {
            kamar: item,
            harga: String(item.harga),
            kapasitas: String(item.kapasitas),
          })
        }>
        <View
          style={{
            position: 'absolute',
            top: (2 / 3) * screenWidth - 25,
            right: 0.08 * screenWidth,
            height: 50,
            width: 50,
            borderRadius: 25,
            backgroundColor: myColor.alert,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2,
          }}>
          <FontAwesome name="pencil" size={20} color="#fff" />
        </View>
      </TouchableNativeFeedback> */}
    </View>
  );
};

export default DetailKelasKamar;

const styles = StyleSheet.create({});
