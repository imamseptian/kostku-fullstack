import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  NativeModules,
  Button,
  Image,
  Animated,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const DetailScreen = () => {
  const opaAvatar = new Animated.Value(1);
  const transView = useRef(new Animated.Value(0)).current;
  const [isHide, setisHide] = useState(false);

  const animAvatar = Animated.timing(opaAvatar, {
    toValue: 0,
    duration: 500,
    // useNativeDriver: true,
    useNativeDriver: true,
  });

  // const animHide =

  const hideImage = () => {
    if (isHide) {
      Animated.timing(transView, {
        toValue: 0,
        duration: 500,
        // useNativeDriver: true,
        useNativeDriver: true,
      }).start(() => {
        setisHide(!isHide);
      });
    } else {
      Animated.timing(transView, {
        toValue: 1,
        duration: 500,
        // useNativeDriver: true,
        useNativeDriver: true,
      }).start(() => {
        setisHide(!isHide);
      });
    }
  };

  return (
    <Animated.View
      style={{
        flex: 1,
        transform: [
          {
            translateY: transView.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -0.2 * height],
            }),
          },
        ],
      }}>
      <Animated.View style={styles.containerAtas}>
        <Animated.Image
          source={{
            uri:
              'https://liquipedia.net/commons/images/thumb/6/66/AdmiralBulldog_EPICENTER_XL.jpg/600px-AdmiralBulldog_EPICENTER_XL.jpg',
          }}
          style={{
            width: 70,
            height: 70,
            opacity: opaAvatar,
          }}
        />
      </Animated.View>
      <Animated.View style={{height: 0.85 * height, backgroundColor: 'blue'}}>
        <Button title="Hide Me" onPress={() => hideImage()} />
        <Button title="Show Me" onPress={() => showImage()} />

        {/* <Button title="Hide Image" onPress={() => hideImage()} /> */}
      </Animated.View>
    </Animated.View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  containerAtas: {height: 0.35 * height, backgroundColor: 'red'},
  avatar: {width: 70, height: 70},
});
