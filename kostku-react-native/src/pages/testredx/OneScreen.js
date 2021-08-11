import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

const OneScreen = ({navigation}) => {
  return (
    <View>
      <Text>ONE</Text>
      <Button title="2 Page" onPress={() => navigation.push('TwoScreen')} />
    </View>
  );
};

export default OneScreen;

const styles = StyleSheet.create({});
