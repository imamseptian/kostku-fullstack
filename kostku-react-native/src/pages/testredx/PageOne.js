import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Button, TextInput} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {setForm, setJudul} from '../../store';

const PageOne = () => {
  const dataRedux = useSelector((state) => state.AsalReducer);
  const dispatch = useDispatch();

  const onInputChange = (value, input) => {
    dispatch(setForm(value, input));
  };

  //   useEffect(() => {
  //     console.log(dataRedux);
  //   }, [dataRedux]);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Judul : PageWan</Text>
      <Text>Fav Emote : {dataRedux.fav}</Text>
      {/* <Text>{dataRedux.fav}</Text> */}
      <TextInput
        placeholder="Emote 1"
        style={{borderWidth: 1}}
        onChangeText={(value) => onInputChange(value, 'emo1')}
      />
      <TextInput
        placeholder="Emote 2"
        style={{borderWidth: 1}}
        onChangeText={(value) => onInputChange(value, 'emo2')}
      />
      <TextInput
        placeholder="Emote 3"
        style={{borderWidth: 1}}
        onChangeText={(value) => onInputChange(value, 'emo3')}
      />

      <View style={{marginTop: 20}}>
        <Button title="BEST EMOTE" onPress={() => alert(dataRedux.lib.emo1)} />
      </View>
      <View style={{marginTop: 20}}>
        <Button
          title="Ganti Judul"
          onPress={() => {
            dispatch(setJudul());
          }}
        />
      </View>
      <View style={{marginTop: 30}}>
        <Text style={{marginTop: 10}}>{dataRedux.lib.emo1}</Text>
        <Text style={{marginTop: 10}}>{dataRedux.lib.emo2}</Text>
        <Text style={{marginTop: 10}}>{dataRedux.lib.emo3}</Text>
      </View>
    </View>
  );
};

export default PageOne;

const styles = StyleSheet.create({});
