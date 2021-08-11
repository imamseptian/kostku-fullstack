import React, {useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Button,
  Easing,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const dataclown = [
  {id: '1a', nama: 'ayayay'},
  {id: '1b', nama: 'adsdsa'},
  {id: '1c', nama: 'dwdsad'},
  {id: '1d', nama: 'xzczxc'},
  {id: '1e', nama: 'qwsda'},
  {id: '1f', nama: 'ghvbvds'},
  {id: '1g', nama: 'qweqwesdd'},
];

const screenWidth = Math.round(Dimensions.get('window').width);
const Catlin1 = () => {
  // anim1
  const toogleOpacity = useRef(new Animated.Value(0)).current;
  // anim2
  const springRef = useRef(new Animated.Value(0)).current;

  //   anim combine
  const refCombine1 = useRef(new Animated.Value(0)).current;
  const refCombine2 = useRef(new Animated.Value(1)).current;

  //   interpoate
  const refInterpolate = useRef(new Animated.Value(0)).current;
  const activeIndex = useRef(new Animated.Value(0)).current;
  const activeIndexAnimation = useRef(new Animated.Value(0)).current;

  const translateX = activeIndexAnimation.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [60, 0, -60],
  });

  const timingAnime = Animated.timing(activeIndexAnimation, {
    toValue: activeIndex,
    duration: 1000,
    useNativeDriver: true,
  });

  const anim1 = (toValue) => {
    Animated.timing(toogleOpacity, {
      toValue: toValue,
      useNativeDriver: true,
      duration: 500,
    }).start(() => {
      toogleOpacity.setValue(toValue);
    });
    // xPosition.setValue(toValue);
  };

  const anim2 = (toValue) => {
    Animated.spring(springRef, {
      toValue: toValue,
      stiffness: 300,
      useNativeDriver: true,
    }).start(() => {
      springRef.setValue(toValue);
    });
    // xPosition.setValue(toValue);
  };

  const animCombine = (val1, val2) => {
    Animated.sequence([
      Animated.timing(refCombine1, {
        toValue: val1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(refCombine2, {
        toValue: val2,
        bounciness: 16,
        useNativeDriver: true,
      }),
    ]).start(() => {
      refCombine1.setValue(val1);
      refCombine2.setValue(val2);
    });
  };

  const animInter = (toValue) => {
    Animated.timing(refInterpolate, {
      toValue,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const Divider = () => (
    <View
      style={{
        height: 10,
        width: screenWidth,
        backgroundColor: 'black',
        marginVertical: 10,
      }}></View>
  );

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        {/* <Animated.View
          style={{
            opacity: toogleOpacity,
            height: 100,
            width: 100,
            borderRadius: 50,
            backgroundColor: 'blue',
          }}></Animated.View>
        <Button
          title="Muncul"
          onPress={() => {
            anim1(1);
          }}
        />
        <Button
          title="Hilang"
          onPress={() => {
            anim1(0);
          }}
        />
        <Divider />
        <View style={{alignItems: 'center', marginBottom: 20}}>
          <Animated.View
            style={{
              height: 10,
              width: 10,
              borderRadius: 5,
              backgroundColor: 'blue',
              transform: [{scale: springRef}],
            }}></Animated.View>
        </View>

        <Button
          title="Muncul"
          onPress={() => {
            anim2(5);
          }}
        />
        <Button
          title="Hilang"
          onPress={() => {
            anim2(0);
          }}
        />
        <Divider />

        <View style={{justifyContent: 'center', height: 100, marginBottom: 20}}>
          <Animated.View
            style={{
              height: 10,
              width: 10,
              borderRadius: 5,
              backgroundColor: 'blue',
              marginLeft: 10,
              transform: [{translateX: refCombine1}, {scale: refCombine2}],
            }}></Animated.View>
        </View>

        <Button
          title="Muncul"
          onPress={() => {
            animCombine(200, 2);
          }}
        />
        <Button
          title="Hilang"
          onPress={() => {
            animCombine(10, 4);
          }}
        />
        <Divider /> */}

        <View style={{justifyContent: 'center', height: 100, marginBottom: 20}}>
          <Animated.View style={{}}>
            {dataclown.map((item, index) => {
              const inputRange = [index - 1, index, index + 1];
              const opacity = activeIndexAnimation.interpolate({
                inputRange,
                outputRange: [0.3, 1, 0.3],
                extrapolate: 'clamp',
              });

              return (
                <TouchableOpacity>
                  <Animated.View
                    style={{
                      opacity,
                      height: 50,
                      width: 50,
                      borderRadius: 25,
                    }}></Animated.View>
                </TouchableOpacity>
              );
            })}
          </Animated.View>
        </View>

        <Button
          title="Muncul"
          onPress={() => {
            animInter(1);
          }}
        />
        <Button
          title="Hilang"
          onPress={() => {
            animInter(-1);
          }}
        />
        <Divider />
      </ScrollView>
    </View>
  );
};

export default Catlin1;

const styles = StyleSheet.create({});
