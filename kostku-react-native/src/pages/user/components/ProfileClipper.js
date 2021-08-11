import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {myColor, screenWidth, screenHeight} from '../../../function/MyVar';

const ProfileClipper = () => {
  return (
    <View
      style={{
        backgroundColor: myColor.colorTheme,
        height: 0.2 * screenHeight,
        width: screenWidth,
        borderBottomRightRadius: 40,
        borderBottomLeftRadius: 40,
        position: 'absolute',
        top: 0,
        left: 0,
      }}></View>
  );
};

export default ProfileClipper;

const styles = StyleSheet.create({});
