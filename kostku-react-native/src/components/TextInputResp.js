import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {myColor} from '../function/MyVar';

const TextInputResp = (props) => {
  return (
    <View style={styles.formWrapper}>
      <Text style={styles.titleField}>{props.title}</Text>
      <TextInput
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
};

export default TextInputResp;

const styles = StyleSheet.create({
  formWrapper: {
    marginBottom: 5,
  },
  titleField: {
    marginBottom: 5,
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 12,
    color: 'black',
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
