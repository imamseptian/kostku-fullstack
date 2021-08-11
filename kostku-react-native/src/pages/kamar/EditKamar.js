import React, {useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

const EditKamar = ({navigation, route}) => {
  const [kamar, setKamar] = useState(route.params.kamar);
  return (
    <View>
      <TextInput value={kamar.nama} />
    </View>
  );
};

export default EditKamar;

const styles = StyleSheet.create({});
