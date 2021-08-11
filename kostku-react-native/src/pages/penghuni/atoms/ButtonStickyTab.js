import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {defaultAsset, myColor, screenWidth} from '../../../function/MyVar';

const ButtonStickyTab = (props) => {
  return (
    <TouchableOpacity
      style={[
        styles.tombolTab,
        {borderBottomWidth: props.selectedTab === props.index ? 2 : 0.2},
      ]}
      onPress={props.onPress}>
      <Text
        style={[
          styles.textTab,
          {
            color:
              props.selectedTab === props.index
                ? myColor.fbtx
                : myColor.darkText,
          },
        ]}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonStickyTab;

const styles = StyleSheet.create({
  tombolTab: {
    flexGrow: 1,
    paddingBottom: 10,
    alignItems: 'center',
  },
  textTab: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 12,
  },
});
