import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const TestGradient = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={['#4E73DF', '#395FCF', '#234BBE']}
        style={styles.linearGradient}>
        <Text style={styles.buttonText}>Login</Text>
      </LinearGradient>
      <Text>AYAY</Text>
    </View>
  );
};

export default TestGradient;

const styles = StyleSheet.create({
  linearGradient: {
    paddingHorizontal: 10,
    paddingRight: 15,
    borderRadius: 5,
    width: 200,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});
