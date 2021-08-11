import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
  Button,
  Dimensions,
  LayoutAnimation,
  NativeModules,
} from 'react-native';
const {width, height} = Dimensions.get('window');

const {UIManager} = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

// UIManager.setLayoutAnimationEnabledExperimental &&
//   UIManager.setLayoutAnimationEnabledExperimental(true);

const CobaAnim = () => {
  const position = new Animated.Value(0);
  const position2 = new Animated.Value(0);

  const ubahukuran = new Animated.Value(180);
  const [ukuran, setUkuran] = useState({
    tinggi: 200,
    lebar: 200,
  });
  const [isPressed, setisPressed] = useState(false);

  //   const bruh = Animated.timing(position, {
  //     toValue: 1,
  //     duration: 2000,
  //     // useNativeDriver: true,
  //     useNativeDriver: true,
  //   });

  const animTranslate = Animated.timing(position, {
    toValue: 1,
    duration: 2000,
    // useNativeDriver: true,
    useNativeDriver: true,
  });

  const animScale = Animated.timing(position2, {
    toValue: 1,
    duration: 2000,
    // useNativeDriver: true,
    useNativeDriver: true,
  });

  const ubahView = Animated.timing(ubahukuran, {
    toValue: 300,
    duration: 2000,
    // useNativeDriver: true,
    useNativeDriver: true,
  });

  const animateNow = () => {
    setisPressed(true);
    LayoutAnimation.configureNext(
      {
        duration: 2000,
        create: {
          property: LayoutAnimation.Properties.opacity,
          type: LayoutAnimation.Types.linear,
        },
        update: {
          property: LayoutAnimation.Properties.opacity,
          type: LayoutAnimation.Types.linear,
        },
        delete: {
          property: LayoutAnimation.Properties.opacity,
          type: LayoutAnimation.Types.linear,
        },
      },
      endingAnimate,
    );
    setUkuran({
      ...ukuran,
      tinggi: ukuran.tinggi + 50,
      //   lebar: ukuran.lebar + 20,
    });
  };

  const endingAnimate = () => {
    setisPressed(false);
  };

  const animatedStyle = {
    width: ubahukuran,
    height: ubahukuran,
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {/* <Animated.View
        style={{
          transform: [
            {
              translateX: position.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 200],
              }),
            },
            {
              translateY: position.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 200],
              }),
            },
          ],
        }}> */}
      {/* <View
        style={[styles.box, {width: ukuran.lebar, height: ukuran.tinggi}]}
        // style={{
        //   height: 20,

        //   backgroundColor: 'red',
        //   transform: [
        //     {
        //       translateX: position.interpolate({
        //         inputRange: [0, 1],
        //         outputRange: [0, 200],
        //       }),
        //     },
        //     {
        //       translateY: position.interpolate({
        //         inputRange: [0, 1],
        //         outputRange: [0, 200],
        //       }),
        //     },
        //     {
        //       scaleX: position2.interpolate({
        //         inputRange: [0, 1],
        //         outputRange: [1, 15],
        //       }),
        //     },
        //     {
        //       scaleY: position2.interpolate({
        //         inputRange: [0, 1],
        //         outputRange: [1, 10],
        //       }),
        //     },
        //   ],
        // }}
      ></View> */}

      <View
        style={[
          styles.box,
          {width: ukuran.lebar, height: ukuran.tinggi},
        ]}></View>

      <Button title="Press Me" onPress={animateNow} disabled={isPressed} />
      <View>
        <Text>{ukuran.tinggi}</Text>
        <Text>{ukuran.lebar}</Text>
      </View>

      {/* </Animated.View> */}
    </View>
  );
};

export default CobaAnim;

const styles = StyleSheet.create({
  box: {
    width: 200,
    height: 200,
    backgroundColor: 'red',
  },
});
