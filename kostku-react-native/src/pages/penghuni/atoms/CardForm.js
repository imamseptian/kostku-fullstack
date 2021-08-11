import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {myColor, defaultAsset, screenWidth} from '../../../function/MyVar';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CardForm = (props) => {
  return (
    <View style={styles.wrapperCard}>
      <View style={styles.wrapperTitle}>
        {/* <Entypo name="calendar" size={20} color={myColor.grayGoogle} /> */}
        {props.children}

        <Text
          style={{
            fontSize: 12,
            fontFamily: 'OpenSans-SemiBold',
            color: myColor.darkText,
            marginLeft: 3,
          }}>
          {props.title}
        </Text>
      </View>
      <TextInput
        placeholder={props.title}
        style={{
          fontFamily: 'OpenSans-Regular',
          color: myColor.fbtx,
          fontSize: 12,
          textAlign: 'justify',
          paddingRight: 10,
          paddingLeft: 33,
        }}
        value={props.value}
        onChangeText={props.onChangeText}
      />
    </View>
  );
};

export default CardForm;

const styles = StyleSheet.create({
  wrapperCard: {
    borderWidth: 1,
    borderColor: myColor.divider,
    backgroundColor: 'white',
    borderRadius: 5,

    position: 'relative',
    marginBottom: 25,
  },
  wrapperTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: -22,
    left: 10,
  },
});
