import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
  Button,
  Dimensions,
  LayoutAnimation,
  NativeModules,
  Image,
  ScrollView,
  Alert,
  StatusBar,
  TouchableNativeFeedback,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {DetailInfo, BerkasInfo} from '../';

import {myColor} from '../../function/MyVar';
import {Modal} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

import {GetBackButton} from '../../components/atoms';
import {ButtonConfirmReject} from '../../components';

const {width, height} = Dimensions.get('window');

const {UIManager} = NativeModules;
const Tab = createMaterialTopTabNavigator();

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const DetailScreen2 = () => {
  const [ukuran, setUkuran] = useState({
    tinggi: 200,
    lebar: 200,
    flex: 4,
  });
  const [isPressed, setisPressed] = useState(false);
  const opaAvatar = useRef(new Animated.Value(1)).current;
  const transView = useRef(new Animated.Value(0)).current;
  const [isHide, setisHide] = useState(false);
  const [showImg, setshowImg] = useState(false);
  const [isSubmit, setisSubmit] = useState(false);

  const animAvatar = (myavatar) => {
    Animated.timing(opaAvatar, {
      toValue: myavatar,
      duration: 100,
      // useNativeDriver: true,
      useNativeDriver: true,
    }).start();
  };

  const animateNow = (myavatar, myflex) => {
    // setisPressed(true);
    animAvatar(myavatar);
    LayoutAnimation.configureNext(
      {
        duration: 100,
        create: {
          property: LayoutAnimation.Properties.opacity,
          type: LayoutAnimation.Types.linear,
        },
        update: {
          property: LayoutAnimation.Properties.opacity,
          type: LayoutAnimation.Types.linear,
        },
        delete: {
          property: LayoutAnimation.Properties.opacity,
          type: LayoutAnimation.Types.linear,
        },
      },
      endingAnimate,
    );
    setUkuran({
      ...ukuran,
      flex: myflex,
    });
  };

  const endingAnimate = () => {
    // setisPressed(false);
    setisHide(!isHide);
  };

  const images = [
    {
      url:
        'https://liquipedia.net/commons/images/thumb/6/66/AdmiralBulldog_EPICENTER_XL.jpg/600px-AdmiralBulldog_EPICENTER_XL.jpg',

      props: {
        // headers: ...
      },
    },
    {
      url:
        'https://www.radioidola.com/wp-content/uploads/2019/02/2019-02-27_e-KTP-Orang-Asing.jpg',

      props: {
        // headers: ...
      },
    },
  ];

  return (
    <View style={{flex: 1}}>
      <StatusBar translucent backgroundColor="transparent" />

      <Modal
        visible={showImg}
        transparent={true}
        onRequestClose={() => setshowImg(false)}>
        <ImageViewer
          imageUrls={images}
          enableSwipeDown={true}
          onSwipeDown={() => setshowImg(false)}
        />
      </Modal>
      <View style={[styles.containerAtas, {flex: ukuran.flex}]}>
        <GetBackButton />
        <Animated.View style={{alignItems: 'center', opacity: opaAvatar}}>
          <TouchableNativeFeedback
            onPress={() => {
              setshowImg(true);
            }}>
            <Image
              source={{
                uri:
                  'https://liquipedia.net/commons/images/thumb/6/66/AdmiralBulldog_EPICENTER_XL.jpg/600px-AdmiralBulldog_EPICENTER_XL.jpg',
              }}
              style={{
                width: 150,
                borderRadius: 50,
                height: 150,
                // opacity: opaAvatar,
              }}
            />
          </TouchableNativeFeedback>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              fontWeight: 'bold',
              marginTop: 5,
            }}>
            Imam Septian Adi Wijaya
          </Text>
          <ButtonConfirmReject />
        </Animated.View>
      </View>
      <View style={styles.containerBawah}>
        <Tab.Navigator swipeEnabled={false}>
          <Tab.Screen
            name="Info"
            component={DetailInfo}
            listeners={() => ({
              tabPress: (e) => {
                animateNow(1, 4);
              },
            })}
          />
          <Tab.Screen
            name="Berkas"
            component={BerkasInfo}
            listeners={() => ({
              tabPress: (e) => {
                animateNow(0, 1);
              },
            })}
          />
        </Tab.Navigator>
      </View>
    </View>
  );
};

export default DetailScreen2;

const styles = StyleSheet.create({
  containerAtas: {
    backgroundColor: myColor.colorTheme,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight,
  },
  containerBawah: {flex: 6, backgroundColor: 'white'},
  subtitle: {
    color: '#676767',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textInfo: {
    color: '#676767',
    fontSize: 14,

    marginTop: 10,
  },
  wrapperInfo: {
    marginBottom: 20,
    borderBottomWidth: 0.5,
    paddingBottom: 10,
  },
});
