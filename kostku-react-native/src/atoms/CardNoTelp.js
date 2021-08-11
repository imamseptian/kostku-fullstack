import React, {forwardRef} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {myColor, defaultAsset, screenWidth} from '../function/MyVar';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CardNoTelp = forwardRef(({title, children, pesanError, ...rest}, ref) => {
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

        <Text
          style={{
            fontFamily: 'OpenSans-Regular',
            fontSize: 12,
            marginRight: 5,
          }}>
          +62
        </Text>

        <TextInput
          ref={ref}
          //   placeholder={props.title}
          style={{
            fontFamily: 'OpenSans-Regular',
            color: myColor.fbtx,
            fontSize: 12,
            flex: 1,
            textAlign: 'justify',
            paddingHorizontal: 10,
          }}
          //   value={props.value}
          //   onChangeText={props.onChangeText}
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
});

export default CardNoTelp;

const styles = StyleSheet.create({
  fieldWrapper: {
    marginBottom: 25,
  },
  wrapperCard: {
    borderWidth: 1,
    borderColor: myColor.divider,
    backgroundColor: 'white',
    borderRadius: 5,
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  wrapperTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: -22,
    left: 10,
  },
});
