import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {screenHeight, screenWidth, myColor} from '../function/MyVar';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

const HeaderPage = (props) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        height: StatusBar.currentHeight + 50,
        backgroundColor: '#f6f6f6',
        borderBottomWidth: 1,
        borderBottomColor: myColor.grayGoogle,
        paddingTop: StatusBar.currentHeight,
        alignItems: 'center',
        paddingHorizontal: 10,
        flexDirection: 'row',
      }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" color={myColor.fbtx} size={25} />
      </TouchableOpacity>
      <View style={{flex: 1}}>
        <Text
          style={{
            marginHorizontal: 15,
            fontSize: 18,

            color: myColor.fbtx,
            textAlign: 'center',
            fontFamily: 'OpenSans-SemiBold',
            // backgroundColor: 'red',
          }}>
          {props.title}
        </Text>
      </View>

      <View style={{width: 25, height: 25}}></View>
    </View>
  );
};

export default HeaderPage;

const styles = StyleSheet.create({});
