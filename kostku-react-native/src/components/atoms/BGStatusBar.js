import React from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';

const BGStatusBar = (props) => {
  return (
    <View
      style={{
        height: StatusBar.currentHeight,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        opacity: 0.2,
        backgroundColor: 'black',
      }}></View>
  );
};

export default BGStatusBar;

const styles = StyleSheet.create({});
