import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import OptionsMenu from 'react-native-option-menu';
import Feather from 'react-native-vector-icons/Feather';
const MenuOption = () => {
  const editPost = () => {
    alert('Edit');
  };
  const deletePost = () => {
    alert('delete');
  };
  return (
    <View style={{flex: 1, paddingHorizontal: 15, paddingTop: 50}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderWidth: 1,
          paddingVertical: 10,
          paddingHorizontal: 10,
          alignItems: 'center',
        }}>
        <Text>AAAAA</Text>
        <OptionsMenu
          customButton={<Feather name="more-vertical" size={30} color="#900" />}
          destructiveIndex={1}
          options={['Edit', 'Delete', 'Cancel']}
          actions={[editPost, deletePost]}
        />
      </View>
    </View>
  );
};

export default MenuOption;

const styles = StyleSheet.create({});
