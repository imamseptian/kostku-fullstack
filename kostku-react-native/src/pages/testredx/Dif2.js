import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

const Dif2 = ({navigation}) => {
  return (
    <View>
      <Text>DIF 2</Text>
      <Button title="BACK " onPress={() => navigation.goBack()} />
    </View>
  );
};

export default Dif2;

const styles = StyleSheet.create({});
