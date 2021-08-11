import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {myColor} from '../../../function/MyVar';

const TabCategory = (props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.onPress();
        // setcurrentPage(0);
        // ref.current.scrollToIndex({
        //   index: 0,
        //   animated: true,
        // });
      }}>
      <View
        style={{
          backgroundColor:
            props.selectedTab == props.currentTab ? myColor.myblue : 'white',
          //   width: 0.4 * screenWidth,
          flex: 1,
          minHeight: 30,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color:
              props.selectedTab == props.currentTab ? '#fff' : myColor.fbtx,
            fontSize: 12,
            fontFamily: 'OpenSans-Bold',
          }}>
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TabCategory;

const styles = StyleSheet.create({});
