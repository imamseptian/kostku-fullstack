import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Shimmer} from './';

const CobaView = () => {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <View
        style={{
          width: 300,
          height: 200,
          elevation: 5,
          backgroundColor: 'white',
        }}>
        <Shimmer />
      </View>
    </View>
  );
};

export default CobaView;

const styles = StyleSheet.create({});
