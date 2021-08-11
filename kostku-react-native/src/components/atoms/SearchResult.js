import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  Dimensions,
} from 'react-native';
import {myColor} from '../../function/MyVar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const screenWidth = Math.round(Dimensions.get('window').width);
const SearchResult = ({banyak, sortCondition, ...rest}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
      }}>
      <Text style={styles.resultText}>Total</Text>
      <TouchableNativeFeedback {...rest}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.resultText}>{banyak} Hasil</Text>
          {sortCondition == 'asc' ? (
            <MaterialCommunityIcons
              name="sort-ascending"
              color="#636e72"
              size={22}
              style={{marginLeft: 10}}
            />
          ) : (
            <MaterialCommunityIcons
              name="sort-descending"
              color="#636e72"
              size={22}
              style={{marginRight: 10, marginLeft: 10}}
            />
          )}
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default SearchResult;

const styles = StyleSheet.create({
  resultText: {
    color: myColor.darkText,
    fontSize: 14,
    fontFamily: 'OpenSans-SemiBold',
  },
});
