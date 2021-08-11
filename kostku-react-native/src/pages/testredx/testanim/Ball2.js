import React, {useState} from 'react';
import {StyleSheet, Text, View, Animated, TouchableOpacity} from 'react-native';

const Ball2 = () => {
  const leftValue = useState(new Animated.Value(0))[0];

  //change timing to spring for bounce effect
  const anim = Animated.timing(leftValue, {
    toValue: 500,
    duration: 5000,
    useNativeDriver: true,
  });

  const opacity = Animated.timing(leftValue, {
    toValue: 1,
    duration: 3000,
    useNativeDriver: true,
  });

  function moveBall() {
    anim.start();
    // opacity.start();
  }

  return (
    <View style={styles.container}>
      {/* <View style={{backgroundColor: 'green'}}> */}
      <Animated.View
        style={{
          width: 100,
          height: 100,
          //   marginLeft: leftValue,
          //   opacity: leftValue,
          transform: [
            {
              translateX: leftValue,
            },
          ],
          borderRadius: 100 / 2,
          backgroundColor: 'red',
        }}></Animated.View>
      {/* </View> */}
      <TouchableOpacity onPress={moveBall}>
        <Text>GLICK ME</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Ball2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
