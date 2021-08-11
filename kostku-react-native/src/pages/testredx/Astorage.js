import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const Astorage = () => {
  const [utoken, setUtoken] = useState('');

  useEffect(() => {
    getData();
    console.log('Login');
  }, [utoken]);

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@storage_Key', value);
      alert(value);
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      if (value !== null) {
        // value previously stored
        setUtoken(value);
      }
    } catch (e) {
      // error reading value
    }
  };

  return (
    <View>
      <Text>AsinStorage</Text>
      <Button title="GET TOKEN" onPress={() => storeData('Bruh')} />
      <Text>TOKEN : {utoken}</Text>
    </View>
  );
};

export default Astorage;

const styles = StyleSheet.create({});
