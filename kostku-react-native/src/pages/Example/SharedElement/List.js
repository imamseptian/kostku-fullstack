import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Icon, MarketSlider} from './';
import {SharedElement} from 'react-navigation-shared-element';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const DATA_ICON = [
  {
    id: '1a',
    uriImage:
      'https://liquipedia.net/commons/images/thumb/6/66/AdmiralBulldog_EPICENTER_XL.jpg/600px-AdmiralBulldog_EPICENTER_XL.jpg',
  },
  {
    id: '1b',
    uriImage: 'https://liquipedia.net/commons/images/b/bd/AdmiralBulldog.png',
  },
  {
    id: '1c',
    uriImage:
      'https://liquipedia.net/commons/images/thumb/6/66/AdmiralBulldog_EPICENTER_XL.jpg/600px-AdmiralBulldog_EPICENTER_XL.jpg',
  },
  {
    id: '1d',
    uriImage: 'https://liquipedia.net/commons/images/b/bd/AdmiralBulldog.png',
  },
  {
    id: '1e',
    uriImage:
      'https://liquipedia.net/commons/images/thumb/6/66/AdmiralBulldog_EPICENTER_XL.jpg/600px-AdmiralBulldog_EPICENTER_XL.jpg',
  },
  {
    id: '1f',
    uriImage: 'https://liquipedia.net/commons/images/b/bd/AdmiralBulldog.png',
  },
  {
    id: '1i',
    uriImage:
      'https://liquipedia.net/commons/images/thumb/6/66/AdmiralBulldog_EPICENTER_XL.jpg/600px-AdmiralBulldog_EPICENTER_XL.jpg',
  },
  {
    id: '1j',
    uriImage: 'https://liquipedia.net/commons/images/b/bd/AdmiralBulldog.png',
  },
  {
    id: '1k',
    uriImage:
      'https://liquipedia.net/commons/images/thumb/6/66/AdmiralBulldog_EPICENTER_XL.jpg/600px-AdmiralBulldog_EPICENTER_XL.jpg',
  },
  {
    id: '1l',
    uriImage: 'https://liquipedia.net/commons/images/b/bd/AdmiralBulldog.png',
  },
  {
    id: '1m',
    uriImage:
      'https://liquipedia.net/commons/images/thumb/6/66/AdmiralBulldog_EPICENTER_XL.jpg/600px-AdmiralBulldog_EPICENTER_XL.jpg',
  },
  {
    id: '1n',
    uriImage: 'https://liquipedia.net/commons/images/b/bd/AdmiralBulldog.png',
  },
];

const screenWidth = Math.round(Dimensions.get('window').width);
const List = ({navigation}) => {
  return (
    <View style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
      <StatusBar translucent backgroundColor="transparent" />
      <MarketSlider />
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: 20,
          //   backgroundColor: 'red',
        }}>
        {DATA_ICON.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={{padding: 20}}
              onPress={() => navigation.push('Detail', {item})}>
              <SharedElement id={`item.${item.id}.icon`}>
                <Icon uriImage={item.uriImage} />
              </SharedElement>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default List;

const styles = StyleSheet.create({});
