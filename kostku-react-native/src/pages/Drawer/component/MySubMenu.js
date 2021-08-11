import React from 'react';
import {StyleSheet, Text, View, TouchableNativeFeedback} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import {myColor} from '../../../function/MyVar';

const MySubMenu = (props) => {
  return (
    <TouchableNativeFeedback onPress={props.onPress}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}>
        <View style={styles.iconWrapper}>{props.children}</View>
        <Text
          style={{
            marginLeft: 35,
            fontSize: 12,
            fontFamily: 'OpenSans-SemiBold',
            color: myColor.grayGoogle,
          }}>
          {props.title}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default MySubMenu;

const styles = StyleSheet.create({
  iconWrapper: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
