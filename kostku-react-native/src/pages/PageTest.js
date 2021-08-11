import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const PageTest = ({navigation, route}) => {
  return (
    <View>
      <Text>{route.params.nama}</Text>
    </View>
  );
};

export default PageTest;

const styles = StyleSheet.create({});
