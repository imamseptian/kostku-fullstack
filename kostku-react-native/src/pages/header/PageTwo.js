import React from 'react';
import {StyleSheet, Text, View, StatusBar, Button} from 'react-native';

const PageTwo = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <StatusBar translucent backgroundColor="transparent" />
      <Text>PageTU</Text>
      <Button title="Go Nexxt" onPress={() => navigation.push('PageThree')} />
    </View>
  );
};

export default PageTwo;

const styles = StyleSheet.create({});
