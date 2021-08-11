import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import {myColor} from '../../../function/MyVar';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const TabBayar = (props) => {
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View
        style={{
          width: props.lebar * 0.5,
          alignItems: 'center',
          justifyContent: 'center',
          //   backgroundColor: 'red',
        }}>
        <View
          style={{
            width: 0.35 * screenWidth,
            backgroundColor:
              props.selectedTab == props.id ? '#fff' : myColor.bgfb,
            marginTop: 5,
            alignItems: 'center',
            borderRadius: 10,
          }}>
          <Text
            style={{
              color:
                props.selectedTab == props.id ? myColor.fbtx : myColor.fbtx1,
              fontFamily: 'OpenSans-SemiBold',
              fontSize: 14,
              marginVertical: 2,
            }}>
            {props.title}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default TabBayar;

const styles = StyleSheet.create({});
