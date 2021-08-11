import React from 'react';
import {StyleSheet, Text, View, StatusBar, Button} from 'react-native';

const PageThree = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <StatusBar translucent backgroundColor="transparent" />
      <Text>333333</Text>
      <Button title="Go Nexxt" onPress={() => navigation.popToTop()} />
    </View>
  );
};

export default PageThree;

const styles = StyleSheet.create({});
