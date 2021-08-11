import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {myColor} from '../../function/MyVar';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const HomeClipper = () => {
  return (
    <View
      style={{
        position: 'absolute',
        top: -0.5 * screenWidth,
        width: screenWidth,
        height: screenWidth,
        borderBottomLeftRadius: screenWidth / 2,
        borderBottomRightRadius: screenWidth / 2,
        backgroundColor: myColor.colorTheme,
        transform: [{scaleX: 2}],
      }}></View>
  );
};

export default HomeClipper;

const styles = StyleSheet.create({});
