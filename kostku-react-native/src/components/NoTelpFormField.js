import React, {forwardRef} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {screenWidth, screenHeight, myColor} from '../function/MyVar';

const NoTelpFormField = forwardRef((props, ref) => {
  return (
    <View style={styles.formWrapper}>
      <Text style={styles.titleField}>{props.title}</Text>
      <View style={styles.formField}>
        <View style={styles.awalan}>
          <Text style={styles.textAwalan}>+62</Text>
        </View>
        <TextInput ref={ref} style={styles.textInput} {...props} />
      </View>
      {props.pesanError != '' ? (
        <Text style={styles.textError}>{props.pesanError}</Text>
      ) : null}
    </View>
  );
});

export default NoTelpFormField;

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
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: myColor.divider,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textError: {
    marginLeft: 10,
    color: myColor.alert,
    fontSize: 12,
    fontFamily: 'OpenSans-SemiBold',
  },
  awalan: {
    borderRightWidth: 1,
    borderRightColor: myColor.divider,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10,
  },
  textAwalan: {
    fontSize: 12,
    fontFamily: 'OpenSans-SemiBold',
  },
  textInput: {
    flex: 1,
    height: 40,
    paddingLeft: 10,
    fontSize: 12,
    fontFamily: 'OpenSans-SemiBold',
  },
});
