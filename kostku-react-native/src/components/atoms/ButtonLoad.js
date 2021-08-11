import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  Dimensions,
} from 'react-native';
import {myColor} from '../../function/MyVar';

const screenWidth = Math.round(Dimensions.get('window').width);

const ButtonLoad = ({...rest}) => {
  return (
    <TouchableNativeFeedback style={{borderRadius: 25}} {...rest}>
      <View
        style={{
          backgroundColor: myColor.fab,
          height: 40,
          width: screenWidth * 0.5,
          alignSelf: 'center',

          elevation: 5,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{color: myColor.darkText, fontWeight: 'bold', fontSize: 14}}>
          Muat Lagi
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default ButtonLoad;

const styles = StyleSheet.create({});
