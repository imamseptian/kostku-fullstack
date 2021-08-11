import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  StatusBar,
  ScrollView,
  FlatList,
  Animated,
} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import {PenghuniInfo} from '../../penghuni';
import {myColor} from '../../../function/MyVar';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const DetailPenyewa = ({navigation}) => {
  const datapage = [
    {id: 'page0', page: <PenghuniInfo />},
    {id: 'page1', page: <PenghuniInfo />},
  ];
  const ref = useRef();

  const mountedAnimated = useRef(new Animated.Value(0)).current;
  //   const activeIndex = useRef(new Animated.Value(0)).current;

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
    <View style={{flex: 1}}>
      <StatusBar translucent backgroundColor="transparent" />
      <View>
        <SharedElement id={`item.111111.icon`}>
          <Image
            source={{
              uri:
                'https://dry-forest-53707.herokuapp.com/kostdata/pendaftar/foto/UK75Xye6zv.jpeg',
            }}
            style={{
              width: screenWidth,
              height: (2 / 3) * screenWidth,
            }}
            resizeMode="cover"
          />
        </SharedElement>
      </View>
      <View style={{flex: 1, paddingTop: 15}}>
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

            // activeIndex.setValue(newIndex);
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
    </View>
  );
};

DetailPenyewa.sharedElements = (route, otherRoute, showing) => {
  // const {item} = route.params;
  // return DATA_ICON.map((item) => `item.${item.id}.icon`);

  return [`item.111111.icon`];
};

export default DetailPenyewa;

const styles = StyleSheet.create({});
