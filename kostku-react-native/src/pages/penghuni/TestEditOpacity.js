import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {APIUrl, defaultAsset, myColor, screenWidth} from '../../function/MyVar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const TestEditOpacity = () => {
  const sizefoto = 120;

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View>
        <View style={{position: 'relative'}}>
          <Image
            source={{uri: defaultAsset.foto_profil}}
            style={{
              width: sizefoto,
              height: sizefoto,
              borderRadius: sizefoto / 2,
            }}
          />
          <View
            style={{
              position: 'absolute',
              width: sizefoto,
              height: sizefoto,
              borderRadius: sizefoto / 2,
              backgroundColor: 'black',
              opacity: 0.4,
              justifyContent: 'center',
              alignItems: 'center',
            }}></View>
          <MaterialCommunityIcons
            name="camera-plus"
            size={20}
            color={'#fff'}
            style={{
              position: 'absolute',
              top: sizefoto / 2 - 10,
              left: sizefoto / 2 - 10,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default TestEditOpacity;

const styles = StyleSheet.create({});
