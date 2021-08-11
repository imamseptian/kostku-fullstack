import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import Modal from 'react-native-translucent-modal';
import ImageViewer from 'react-native-image-zoom-viewer';
import StepIndicator from 'react-native-step-indicator';
import {SharedElement} from 'react-navigation-shared-element';
import {APIUrl} from '../../function/MyVar';
import {
  BarangPenghuni,
  PenghuniBerkas,
  PenghuniInfo,
  PenghuniTagihan,
} from './';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const DetailPenghuni = ({navigation, route}) => {
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
  const [penghuniItem, setpenghuniItem] = useState([]);

  const loadData = () => {
    axios
      .post(APIUrl + '/api/barang_penghuni', {id_penghuni: item.id})
      .then((res) => {
        // console.log(res.data);
        setpenghuniItem(res.data.barang);
      })
      .catch((error) => {
        alert('ERROR DETAIL PENGHUNI');
      });
  };

  const datapage = [
    {id: 'page0', page: <PenghuniInfo data={item} />},
    {
      id: 'page1',
      page: (
        <PenghuniBerkas
          data={item}
          onPress={() => {
            setimageIndex(1);
            setshowImg(true);
          }}
        />
      ),
    },
    {id: 'page3', page: <PenghuniTagihan data={item} />},
    {
      id: 'page4',
      page: (
        <BarangPenghuni
          data={penghuniItem}
          id_penghuni={item.id}
          refresh={() => {
            loadData();
          }}
        />
      ),
    },
  ];

  useEffect(() => {
    loadData();
    // axios
    //   .post(APIUrl + '/api/barang_penghuni', {id_penghuni: item.id})
    //   .then((res) => {
    //     // console.log(res.data);
    //     setpenghuniItem(res.data.barang);
    //   });
  }, []);

  const labels = ['Info', 'Berkas', 'Tagihan', 'Barang'];
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
    // Animated.parallel([
    //   Animated.timing(activeIndexAnimation, {
    //     toValue: 0,
    //     duration: 300,
    //     useNativeDriver: true,
    //   }),
    //   animation(1, 500),
    // ]).start();
    // console.log('a');
  });

  const translateY = mountedAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  return (
    <View style={{flex: 1, backgroundColor: '#f6f6f6'}}>
      {/* {showImg ? null : <StatusBar hidden translucent backgroundColor="transparent" />} */}
      <StatusBar
        translucent
        backgroundColor="transparent"
        // barStyle="light-content"
        barStyle={showImg ? 'light-content' : 'dark-content'}
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
      <View>
        <TouchableNativeFeedback
          onPress={() => {
            setimageIndex(0);
            setshowImg(true);
          }}>
          <SharedElement id={`item.${item.id}.icon`}>
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
      <View style={{flex: 1, paddingTop: 15}}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            fontFamily: 'OpenSans-SemiBold',
          }}>
          {item.nama_depan} {item.nama_belakang}
        </Text>
        <Animated.FlatList
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
        />
      </View>
      <View
        style={{
          position: 'absolute',
          top: (2 / 3) * screenWidth - 25,
          right: 0.08 * screenWidth,
          height: 50,
          width: 50,
          borderRadius: 25,
          backgroundColor: 'red',
        }}></View>
      <StepIndicator
        customStyles={customStyles}
        currentPosition={currentPage}
        labels={labels}
        stepCount={4}
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

DetailPenghuni.sharedElements = (route, otherRoute, showing) => {
  const {item} = route.params;
  // return DATA_ICON.map((item) => `item.${item.id}.icon`);

  return [`item.${item.id}.icon`];
};

DetailPenghuni.navigationOptions = {
  drawerLockMode: 'locked-open',
};

export default DetailPenghuni;

const styles = StyleSheet.create({});
