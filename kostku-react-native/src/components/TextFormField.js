import React, {forwardRef} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {screenWidth, screenHeight, myColor} from '../function/MyVar';

const TextFormField = forwardRef((props, ref) => {
  return (
    <View style={styles.formWrapper}>
      <Text style={styles.titleField}>
        {props.title} {props.awalan}
      </Text>
      <TextInput
        ref={ref}
        style={[
          styles.formField,
          {height: props.multiline != undefined ? 80 : 40},
        ]}
        {...props}
      />
      {props.pesanError != '' ? (
        <Text style={styles.textError}>{props.pesanError}</Text>
      ) : null}
    </View>
  );
});

export default TextFormField;

const styles = StyleSheet.create({
  formWrapper: {
    marginHorizontal: 0.05 * screenWidth,
    marginBottom: 5,
  },
  titleField: {
    marginLeft: 10,
    marginBottom: 5,
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 12,
  },
  formField: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: myColor.divider,
    paddingHorizontal: 10,
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
  },
  textError: {
    marginLeft: 10,
    color: myColor.alert,
    fontSize: 12,
    fontFamily: 'OpenSans-SemiBold',
  },
});
