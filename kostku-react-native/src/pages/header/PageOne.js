import React from 'react';
import {StyleSheet, Text, View, StatusBar, Button} from 'react-native';

const PageOne = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <StatusBar translucent backgroundColor="transparent" />
      <Text>PageWan</Text>
      <Button title="Go Nexxt" onPress={() => navigation.push('PageTwo')} />
    </View>
  );
};

export default PageOne;

const styles = StyleSheet.create({});
