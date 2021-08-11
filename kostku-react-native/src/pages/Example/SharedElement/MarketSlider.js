import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {myColor} from '../../../function/MyVar';

const SLIDER_DATA = [
  {color: myColor.colorTheme, title: 'itemsatu'},
  {color: myColor.success, title: 'item dua'},
  {color: myColor.myblue, title: 'item selanjutnya'},
  {color: myColor.alert, title: 'item selanjutnya'},
];

const screenWidth = Math.round(Dimensions.get('window').width);
const MarketSlider = () => {
  return (
    <View style={{flex: 1, paddingTop: StatusBar.currentHeight + 10}}>
      <FlatList
        data={SLIDER_DATA}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.color}
        contentContainerStyle={{paddingRight: screenWidth - 200 - 20}}
        decelerationRate={'fast'}
        snapToInterval={200 + 20}
        renderItem={({item, index, separator}) => {
          return (
            <View
              style={[
                styles.itemContainer,
                {backgroundColor: item.color},
              ]}></View>
          );
        }}
      />
    </View>
  );
};

export default MarketSlider;

const styles = StyleSheet.create({
  itemContainer: {
    height: 200 * 0.6,
    width: 200,
    backgroundColor: 'red',
    borderRadius: 16,
    marginHorizontal: 10,
  },
});
