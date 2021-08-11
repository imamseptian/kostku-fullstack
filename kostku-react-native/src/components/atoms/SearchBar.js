import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import {myColor} from '../../function/MyVar';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const SearchBar = (props) => {
  return (
    <View style={styles.searchWrapper}>
      <FontAwesome
        name="search"
        color={myColor.grayGoogle}
        size={20}
        style={{marginRight: 10}}
      />
      <TextInput {...props} style={styles.searchTextInput} />
      {props.value.length > 0 ? (
        <TouchableOpacity
          onPress={() => {
            props.clearText();
          }}>
          <Entypo
            name="circle-with-cross"
            color={myColor.grayGoogle}
            size={20}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchWrapper: {
    flexDirection: 'row',
    marginTop: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  searchTextInput: {
    flex: 1,

    fontSize: 12,
    fontFamily: 'OpenSans-Regular',
    marginRight: 5,
  },
});
