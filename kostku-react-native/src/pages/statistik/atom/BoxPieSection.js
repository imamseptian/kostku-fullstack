import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import axios from 'axios';

const BoxPieSection = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={{flexDirection: 'row'}}>
        <View style={[styles.tagBox, {backgroundColor: props.color}]}></View>
        <Text
          style={{
            marginLeft: 5,
            fontFamily: 'OpenSans-Regular',
            fontSize: 12,
            textTransform: 'capitalize',
          }}>
          {props.keyword == 'etc' ? 'Daerah Lain' : props.data.nama}
          {/* {props.keyword} */}
          {/* {JSON.stringify(props.data)} */}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default BoxPieSection;

const styles = StyleSheet.create({
  tagBox: {
    height: 15,
    width: 15,

    marginBottom: 8,
  },
});
