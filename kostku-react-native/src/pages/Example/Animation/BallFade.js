import React, {useState} from 'react';
import {StyleSheet, Text, View, Animated, TouchableOpacity} from 'react-native';

const BallFade = () => {
  const opacity = useState(new Animated.Value(0))[0];

  function fadeInBall() {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }

  function fadeOutBall() {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }
  return (
    <View style={styles.container}>
      {/* <View style={{backgroundColor: 'green'}}> */}
      <Animated.View
        style={{
          width: 100,
          height: 100,
          opacity: opacity,

          borderRadius: 100 / 2,
          backgroundColor: 'red',
        }}></Animated.View>
      {/* </View> */}
      <TouchableOpacity onPress={fadeInBall}>
        <Text>Fade In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={fadeOutBall}>
        <Text>Fade Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BallFade;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
