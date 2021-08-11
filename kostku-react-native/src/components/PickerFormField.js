import React, {forwardRef} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {screenWidth, screenHeight, myColor} from '../function/MyVar';
import {Picker} from '@react-native-picker/picker';
const PickerFormField = forwardRef((props, ref) => {
  return (
    <View style={styles.formWrapper}>
      <Text style={styles.titleField}>{props.title}</Text>
      <View style={styles.formField}>
        <Picker
          selectedValue={user.kota}
          textStyle={{fontSize: 12}}
          onValueChange={(itemValue, itemIndex) => {
            if (itemValue != null) {
              setinvalidKota(false);
              setForm('kota', itemValue);
            }
          }}>
          <Picker.Item label="Pilih Kota" />
          {kota.map((item, index) => {
            return (
              <Picker.Item key={index} label={item.nama} value={item.id} />
            );
          })}
        </Picker>
      </View>
      {props.pesanError != '' ? (
        <Text style={styles.textError}>{props.pesanError}</Text>
      ) : null}
    </View>
  );
});

export default PickerFormField;

const styles = StyleSheet.create({
  formWrapper: {
    marginHorizontal: 0.05 * screenWidth,
    marginBottom: 10,
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
    marginBottom: 5,
    paddingHorizontal: 10,
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
