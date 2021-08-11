import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {myColor, defaultAsset, screenWidth} from '../../../function/MyVar';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const CardText = (props) => {
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
      <Text
        style={{
          fontFamily: 'OpenSans-Regular',
          color: myColor.fbtx,
          fontSize: 12,
          textAlign: 'justify',
          textTransform: props.address ? 'capitalize' : null,
        }}>
        {props.content}
      </Text>
    </View>
  );
};

export default CardText;

const styles = StyleSheet.create({
  wrapperCard: {
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: myColor.divider,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingRight: 10,
    paddingLeft: 33,
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
