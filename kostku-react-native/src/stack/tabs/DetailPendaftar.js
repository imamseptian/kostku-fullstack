import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {DetailInfo, BerkasInfo} from '../../pages';

const DetailPendaftar = () => {
  return (
    <Tab.Navigator swipeEnabled={false}>
      <Tab.Screen
        name="Info"
        component={DetailInfo}
        listeners={() => ({
          tabPress: (e) => {
            animateNow(1, 4);
          },
        })}
      />
      <Tab.Screen
        name="Berkas"
        component={BerkasInfo}
        listeners={() => ({
          tabPress: (e) => {
            animateNow(0, 1);
          },
        })}
      />
    </Tab.Navigator>
  );
};

export default DetailPendaftar;

const styles = StyleSheet.create({
  subtitle: {
    color: '#676767',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textInfo: {
    color: '#676767',
    fontSize: 14,

    marginTop: 10,
  },
  wrapperInfo: {
    marginBottom: 20,
    borderBottomWidth: 0.5,
    paddingBottom: 10,
  },
});
