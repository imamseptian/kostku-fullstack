import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const screenWidth = Math.round(Dimensions.get('window').width);
const Icon = ({uriImage}) => {
  return (
    // <TouchableOpacity style={{padding: 20}} onPress={() => {}}>
    <View
      style={{
        height: screenWidth / 4 - 40,
        width: screenWidth / 4 - 40,
        borderRadius: (screenWidth / 4 - 40) / 2,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        source={{uri: uriImage}}
        style={{
          height: screenWidth / 4 - 38,
          width: screenWidth / 4 - 38,
          borderRadius: (screenWidth / 4 - 38) / 2,
        }}
      />
    </View>
    // </TouchableOpacity>
  );
};

export default Icon;

const styles = StyleSheet.create({});
