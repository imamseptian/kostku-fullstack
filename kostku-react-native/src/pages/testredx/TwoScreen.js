import React from 'react';
import {StyleSheet, Text, View, TextInput, Alert, Button} from 'react-native';
import {CommonActions} from '@react-navigation/native';

const TwoScreen = ({navigation}) => {
  const [text, setText] = React.useState('');
  const hasUnsavedChanges = Boolean(text);

  React.useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        if (!hasUnsavedChanges) {
          // If we don't have unsaved changes, then we don't need to do anything
          return;
        }

        // Prevent default behavior of leaving the screen
        e.preventDefault();

        // Prompt the user before leaving the screen
        Alert.alert(
          'Discard changes?',
          'You have unsaved changes. Are you sure to discard them and leave the screen?',
          [
            {text: "Don't leave", style: 'cancel', onPress: () => {}},
            {
              text: 'Discard',
              style: 'destructive',
              // If the user confirmed, then we dispatch the action we blocked earlier
              // This will continue the action that had triggered the removal of the screen
              onPress: () => navigation.dispatch(e.data.action),
            },
          ],
        );
      }),
    [navigation, hasUnsavedChanges],
  );

  return (
    <View>
      <TextInput
        value={text}
        placeholder="Type something…"
        onChangeText={setText}
        style={{borderWidth: 1}}
      />
      <Button
        title="goback"
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{name: 'MainApp'}],
          });
        }}
      />
    </View>
  );
};

export default TwoScreen;

const styles = StyleSheet.create({});
