import React, {useState} from 'react';
import {StyleSheet, Text, View, Animated, TouchableOpacity} from 'react-native';

const Ball = () => {
  // ---- AWAL -----
  const value = useState(new Animated.ValueXY({x: 0, y: 0}))[0];

  function moveBall() {
    Animated.timing(value, {
      toValue: {x: 100, y: 100},
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }

  return (
    <View>
      <Animated.View style={value.getLayout()}>
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 100 / 2,
            backgroundColor: 'red',
          }}></View>
      </Animated.View>
      <TouchableOpacity onPress={moveBall}>
        <Text>Click ME</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Ball;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
});
