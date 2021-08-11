import React, {forwardRef} from 'react';
import {StyleSheet, Text, View, TextInput, Dimensions} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {myColor, screenWidth, screenHeight} from '../../function/MyVar';

const FormFieldIcon = forwardRef((props, ref) => {
  return (
    <View
      style={{
        height: 40,
        // width: 0.8 * screenWidth,
        borderWidth: 0.5,
        borderRadius: 10,

        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
      }}>
      <FontAwesome5 name={props.icon} color={myColor.fbtx} size={15} />
      <TextInput ref={ref} style={{marginLeft: 5, flex: 1}} {...props} />
    </View>
  );
});

export default FormFieldIcon;

const styles = StyleSheet.create({});
