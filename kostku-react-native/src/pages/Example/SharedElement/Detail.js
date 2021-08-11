import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
  Animated,
} from 'react-native';
import {Icon} from './';
const screenWidth = Math.round(Dimensions.get('window').width);
import {SharedElement} from 'react-navigation-shared-element';
const DATA_ICON = [
  {
    id: '1a',
    uriImage:
      'https://liquipedia.net/commons/images/thumb/6/66/AdmiralBulldog_EPICENTER_XL.jpg/600px-AdmiralBulldog_EPICENTER_XL.jpg',
  },
  {
    id: '1b',
    uriImage: 'https://liquipedia.net/commons/images/b/bd/AdmiralBulldog.png',
  },
  {
    id: '1c',
    uriImage:
      'https://liquipedia.net/commons/images/thumb/6/66/AdmiralBulldog_EPICENTER_XL.jpg/600px-AdmiralBulldog_EPICENTER_XL.jpg',
  },
  {
    id: '1d',
    uriImage: 'https://liquipedia.net/commons/images/b/bd/AdmiralBulldog.png',
  },
  {
    id: '1e',
    uriImage:
      'https://liquipedia.net/commons/images/thumb/6/66/AdmiralBulldog_EPICENTER_XL.jpg/600px-AdmiralBulldog_EPICENTER_XL.jpg',
  },
  {
    id: '1f',
    uriImage: 'https://liquipedia.net/commons/images/b/bd/AdmiralBulldog.png',
  },
  {
    id: '1i',
    uriImage:
      'https://liquipedia.net/commons/images/thumb/6/66/AdmiralBulldog_EPICENTER_XL.jpg/600px-AdmiralBulldog_EPICENTER_XL.jpg',
  },
  {
    id: '1j',
    uriImage: 'https://liquipedia.net/commons/images/b/bd/AdmiralBulldog.png',
  },
  {
    id: '1k',
    uriImage:
      'https://liquipedia.net/commons/images/thumb/6/66/AdmiralBulldog_EPICENTER_XL.jpg/600px-AdmiralBulldog_EPICENTER_XL.jpg',
  },
  {
    id: '1l',
    uriImage: 'https://liquipedia.net/commons/images/b/bd/AdmiralBulldog.png',
  },
  {
    id: '1m',
    uriImage:
      'https://liquipedia.net/commons/images/thumb/6/66/AdmiralBulldog_EPICENTER_XL.jpg/600px-AdmiralBulldog_EPICENTER_XL.jpg',
  },
  {
    id: '1n',
    uriImage: 'https://liquipedia.net/commons/images/b/bd/AdmiralBulldog.png',
  },
];

const Detail = ({navigation, route}) => {
  const {item} = route.params;
  const selectedItemIndex = DATA_ICON.findIndex((i) => i.id === item.id);
  const ref = useRef();
  const mountedAnimated = useRef(new Animated.Value(0)).current;
  const activeIndex = useRef(new Animated.Value(selectedItemIndex)).current;
  const activeIndexAnimation = useRef(new Animated.Value(selectedItemIndex))
    .current;

  const animation = (toValue, delay) =>
    Animated.timing(mountedAnimated, {
      toValue,
      duration: 500,
      delay,
      useNativeDriver: true,
    });

  useEffect(() => {
    console.log('a');
    Animated.parallel([
      Animated.timing(activeIndexAnimation, {
        toValue: activeIndex,
        duration: 1000,
        useNativeDriver: true,
      }),
      animation(1, 500),
    ]).start(() => {
      console.log('kntl');
    });
    console.log('b');
  });

  const translateY = mountedAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  const translateX = activeIndexAnimation.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [60, 0, -60],
  });

  return (
    <View style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
      <StatusBar translucent backgroundColor="transparent" />
      <Animated.View
        style={{
          flexDirection: 'row',
          flexWrap: 'nowrap',
          marginVertical: 20,
          marginLeft: screenWidth / 2 - 40 / 2 - 10,
          transform: [{translateX}],
        }}>
        {DATA_ICON.map((item, index) => {
          const inputRange = [index - 1, index, index + 1];
          const opacity = activeIndexAnimation.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          return (
            <TouchableOpacity
              key={item.id}
              style={{padding: 10}}
              onPress={() => {
                console.log(activeIndex);
                activeIndex.setValue(index);
                ref.current.scrollToIndex({
                  index,
                  animated: true,
                });
              }}>
              <Animated.View style={{alignItems: 'center', opacity}}>
                <SharedElement id={`item.${item.id}.icon`}>
                  <Icon uriImage={item.uriImage} />
                </SharedElement>
              </Animated.View>
              <Text>{item.id}</Text>
            </TouchableOpacity>
          );
        })}
      </Animated.View>
      <Animated.FlatList
        style={{opacity: mountedAnimated, transform: [{translateY}]}}
        ref={ref}
        data={DATA_ICON}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        initialScrollIndex={activeIndex}
        nestedScrollEnabled
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
          console.log(selectedItemIndex);

          activeIndex.setValue(newIndex);
        }}
        renderItem={({item, index, separator}) => {
          return (
            <ScrollView
              style={{
                width: 0.9 * screenWidth,
                margin: 0.05 * screenWidth,
                backgroundColor: 'green',
                borderRadius: 16,
              }}>
              <View style={{padding: 20}}>
                <Text style={{fontSize: 16}}>
                  {Array(50).fill(`${item.id} inner text \n`)}
                </Text>
              </View>
            </ScrollView>
          );
        }}
      />
    </View>
  );
};

Detail.sharedElements = (route, otherRoute, showing) => {
  // const {item} = route.params;
  return DATA_ICON.map((item) => `item.${item.id}.icon`);

  // return [`item.${item.id}.photo`];
};

export default Detail;

const styles = StyleSheet.create({});
