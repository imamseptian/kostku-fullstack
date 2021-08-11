import React, {forwardRef} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {myColor, defaultAsset, screenWidth} from '../function/MyVar';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CardForm = forwardRef(
  ({title, children, pesanError, multiline, ...rest}, ref) => {
    return (
      <View style={styles.fieldWrapper}>
        <View style={styles.wrapperCard}>
          <View style={styles.wrapperTitle}>
            {/* <Entypo name="calendar" size={20} color={myColor.grayGoogle} /> */}
            {children}

            <Text
              style={{
                fontSize: 12,
                fontFamily: 'OpenSans-SemiBold',
                color: myColor.darkText,
                marginLeft: 3,
              }}>
              {title}
            </Text>
          </View>
          <TextInput
            ref={ref}
            //   placeholder={props.title}
            style={{
              fontFamily: 'OpenSans-Regular',
              color: myColor.fbtx,
              fontSize: 12,
              textAlign: 'justify',
              paddingRight: 10,
              paddingLeft: 33,
              height: multiline ? 100 : 45,
            }}
            //   value={props.value}
            //   onChangeText={props.onChangeText}
            multiline={multiline ? true : false}
            {...rest}
          />
        </View>
        {pesanError !== null && (
          <Text
            style={{
              paddingLeft: 33,
              paddingRight: 10,
              fontFamily: 'OpenSans-SemiBold',
              color: myColor.alert,
              fontSize: 12,
            }}>
            {pesanError}
          </Text>
        )}
      </View>
    );
  },
);

export default CardForm;

const styles = StyleSheet.create({
  fieldWrapper: {
    marginBottom: 25,
  },
  wrapperCard: {
    borderWidth: 1,
    borderColor: myColor.divider,
    backgroundColor: 'white',
    borderRadius: 5,

    position: 'relative',
  },
  wrapperTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: -22,
    left: 10,
  },
});
