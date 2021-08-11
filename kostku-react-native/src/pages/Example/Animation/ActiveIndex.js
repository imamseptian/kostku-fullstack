import React, {useRef, useState, useEffect} from 'react';
import {StyleSheet, Text, View, Animated} from 'react-native';

const ActiveIndex = () => {
  const mountedAnimated = useRef(new Animated.Value(0)).current;
  const activeIndex = useRef(new Animated.Value(0)).current;
  const activeIndexAnimation = useRef(new Animated.Value(0));
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
  return (
    <View style={{flex: 1}}>
      <Animated.View
        style={{
          opacity: mountedAnimated,
          height: 500,
          width: 340,
          backgroundColor: 'red',
        }}></Animated.View>
    </View>
  );
};

export default ActiveIndex;

const styles = StyleSheet.create({});
