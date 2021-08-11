import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Provider} from 'react-redux';
import AppNavigator from './AppNavigator';
import {store} from './store';
import {HomeRec} from './pages/home/component';
import {EditProfilePage} from './pages/user';
import MenuOption from './pages/testredx/MenuOption';

export default function App() {
  return (
    <Provider store={store}>
      {/* <HomeRec /> */}
      {/* <EditProfilePage /> */}
      {/* <MenuOption /> */}
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
}
