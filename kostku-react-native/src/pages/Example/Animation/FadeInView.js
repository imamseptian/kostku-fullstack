import React, {useRef, useEffect} from 'react';
import {Animated, Text, View, StyleSheet} from 'react-native';

const FadeInView = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 10000,
    }).start();
  }, [fadeAnim]);

  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default FadeInView;

const styles = StyleSheet.create({});
