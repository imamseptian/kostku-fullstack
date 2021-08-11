import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, StatusBar} from 'react-native';
import KostkuSVG from '../asset/image/splash2.svg';
import HomeSVG from '../asset/image/home.svg';
import * as Animatable from 'react-native-animatable';
import {myColor} from '../function/MyVar';

const Splash = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Animatable.View style={{flex: 1}} animation="fadeIn">
        <View
          style={{
            flex: 5,
            justifyContent: 'flex-end',
            paddingBottom: 30,
            alignItems: 'center',
          }}>
          <HomeSVG width={100} height={100} />
          <Text
            style={{
              color: 'white',
              fontSize: 32,
            }}>
            KostKu
          </Text>
        </View>
        <View style={{flex: 6}}>
          <KostkuSVG width={355} height={247} />
        </View>
      </Animatable.View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: myColor.colorTheme,
  },
});
