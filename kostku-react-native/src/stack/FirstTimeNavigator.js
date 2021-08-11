import React from 'react';
import {StyleSheet, Easing} from 'react-native';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {CardStyleInterpolators} from '@react-navigation/stack';
import {FormAwal, KostForm} from '../pages/firstTime';

const FirstStack = createSharedElementStackNavigator();

const FirstTimeNavigator = () => {
  return (
    <FirstStack.Navigator headerMode={false}>
      <FirstStack.Screen
        name="FirstDisplay"
        component={FormAwal}
        options={() => ({
          gestureEnabled: false,
          transitionSpec: {
            open: {
              animation: 'timing',
              config: {duration: 500, easing: Easing.inOut(Easing.ease)},
            },
            close: {
              animation: 'spring',
              config: {duration: 500, easing: Easing.inOut(Easing.linear)},
            },
          },
          cardStyleInterpolator: ({current: {progress}}) => {
            return {
              cardStyle: {
                opacity: progress,
              },
            };
          },
        })}
      />
      <FirstStack.Screen
        name="FirstForm"
        component={KostForm}
        options={() => ({
          gestureEnabled: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: {
              animation: 'timing',
              config: {duration: 500, easing: Easing.linear},
            },
            close: {
              animation: 'timing',
              config: {duration: 300, easing: Easing.linear},
            },
          },
        })}
      />
    </FirstStack.Navigator>
  );
};

export default FirstTimeNavigator;

const styles = StyleSheet.create({});
