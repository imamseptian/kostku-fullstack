import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {myColor} from '../../../function/MyVar';

const MyMenu = (props) => {
  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderBottomColor: myColor.divider,
        paddingVertical: 10,
      }}>
      {props.children}
    </View>
  );
};

export default MyMenu;

const styles = StyleSheet.create({});
