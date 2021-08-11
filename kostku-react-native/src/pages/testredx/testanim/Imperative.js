import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Buttonm,
  Dimensions,
  Animated,
  Button,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

const Imperative = () => {
  const screenWidth = Math.round(Dimensions.get('window').width);
  const screenHeight = Math.round(Dimensions.get('window').height);

  const movement = useState(new Animated.Value(0))[0];
  const [page, setPage] = useState(0);

  const slideAnim = Animated.timing(movement, {
    toValue: page,
    duration: 1000,
    useNativeDriver: true,
  });

  useEffect(() => {
    slideAnim.start();
  }, [page]);

  const goNext = async () => {
    console.log(page);
    if (page > -(screenWidth * 3)) {
      console.log('goNext');
      setPage((prevState) => prevState - screenWidth);
    }
  };

  const goBack = () => {
    if (page < 0) {
      console.log('goBack');
      setPage((prevState) => prevState + screenWidth);
    }
  };

  return (
    <View style={{flex: 1}}>
      <Animated.View
        style={{
          flexDirection: 'row',
          transform: [
            {
              translateX: movement,
            },
          ],
          height: screenHeight - 100,
          backgroundColor: '#46ce7c',
        }}>
        <View
          style={{
            width: screenWidth,
            height: 100,
            backgroundColor: 'red',
          }}></View>
        <View
          style={{
            width: screenWidth,
            height: 100,
            backgroundColor: 'blue',
          }}></View>
        <View
          style={{
            width: screenWidth,
            height: 100,
            backgroundColor: 'green',
          }}></View>
        <View
          style={{
            width: screenWidth,
            height: 100,
            backgroundColor: 'yellow',
          }}></View>
      </Animated.View>
      <View
        style={{
          width: 150,
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <Button title="Prev" onPress={goBack} />
        <Text>{page}</Text>
        <Button title="Next" onPress={goNext} />
      </View>
    </View>
  );
};

export default Imperative;

const styles = StyleSheet.create({});
