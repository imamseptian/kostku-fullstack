import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

const Dif1 = ({navigation}) => {
  return (
    <View>
      <Text>Dif 1</Text>
      <Button title="Ke Dif 2" onPress={() => navigation.push('Dif2')} />
    </View>
  );
};

export default Dif1;

const styles = StyleSheet.create({});
