import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const Home = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={{flex: 2, backgroundColor: 'red'}}></View>
      <View style={{flex: 1}}>
        <TouchableOpacity onPress={() => navigation.push('Detail')}>
          <SharedElement id={`item.111111.icon`}>
            <Image
              source={{
                uri:
                  'https://dry-forest-53707.herokuapp.com/kostdata/pendaftar/foto/UK75Xye6zv.jpeg',
              }}
              style={{height: 100, width: 100, borderRadius: 50}}
            />
          </SharedElement>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
