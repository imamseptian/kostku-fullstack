import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';

const TestHome = ({navigation}) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    getData();
    console.log('Login');
  }, []);

  const pindah = () => {
    navigation.push('LoginPage');
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user_data');
      //   return jsonValue != null ? JSON.parse(jsonValue) : null;
      console.log('====');
      console.log(JSON.parse(jsonValue));
      setUser(JSON.parse(jsonValue));
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Ini Home</Text>
      <Text>Selamat datang {user.displayName}</Text>
      <Button title="Login Lagi/" onPress={pindah} />
      <Button title="CEK USER" onPress={() => console.log(user.displayName)} />
    </View>
  );
};

export default TestHome;

const styles = StyleSheet.create({});
