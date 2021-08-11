import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {myColor} from '../../function/MyVar';

const GetBackButton = ({...rest}) => {
  return (
    <TouchableNativeFeedback {...rest}>
      <View
        style={{
          position: 'absolute',
          top: StatusBar.currentHeight + 10,
          left: 10,
        }}>
        <Ionicons
          name="arrow-back"
          color={myColor.myWhite}
          size={30}
          style={{marginRight: 5}}
        />
      </View>
    </TouchableNativeFeedback>
  );
};

export default GetBackButton;

const styles = StyleSheet.create({});
