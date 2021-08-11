import {createDrawerNavigator} from '@react-navigation/drawer';
import React, {useEffect} from 'react';
import {Easing, StyleSheet} from 'react-native';
// import FirstTimeNavigator from './FirstTimeNavigator';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {CardStyleInterpolators} from '@react-navigation/stack';
import {fcmService} from '../FCMService';
import {localNotificationService} from '../LocalNotificationService';
import CustomDrawer from '../pages/Drawer/CustomDrawer';
import {HomeScreen} from '../pages/home';
import {
  CreateKamar,
  DaftarKamar,
  DetailKamar,
  DetailKelasKamar,
  EditKamar,
  EditKelasKamar,
  FormKelasKamar,
  ListKamar,
  EditFasilitas,
} from '../pages/kamar';
import {PageDL} from '../pages/download';
import {
  DetailPendaftar,
  ListPendaftar,
  ProfilPendaftar,
} from '../pages/pendaftar';
import {DetailKeuangan} from '../pages/pengeluaran';
import {
  DetailPenghuni,
  ListPenghuni,
  ProfilPenghuni,
  EditPenghuni,
  PilihKelas,
  PilihKamar,
} from '../pages/penghuni';
import {
  Profile,
  EditProfil,
  EditKost,
  EditProfilePage,
  EditKostPage,
} from '../pages/user';
import {HalamanBayar} from '../pages/transaksi';
import {KostStatistik} from '../pages/statistik';
import FirstTimeNavigator from './FirstTimeNavigator';

const BundleStack = createSharedElementStackNavigator();

const MainStack = createSharedElementStackNavigator();
const HomeStack = createSharedElementStackNavigator();
const KamarStack = createSharedElementStackNavigator();
const PendaftarStack = createSharedElementStackNavigator();
const PenghuniStack = createSharedElementStackNavigator();
const KeuanganStack = createSharedElementStackNavigator();
const PembayaranStack = createSharedElementStackNavigator();
const StatistikStack = createSharedElementStackNavigator();

const Drawer = createDrawerNavigator();

const DrawerScreen = () => (
  <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
    <Drawer.Screen name="HomeStackScreen" component={HomeStackScreen} />
    <Drawer.Screen name="KamarStackScreen" component={KamarStackScreen} />
    <Drawer.Screen
      name="PendaftarStackScreen"
      component={PendaftarStackScreen}
    />
    <Drawer.Screen name="PenghuniStackScreen" component={PenghuniStackScreen} />
    <Drawer.Screen name="KeuanganStackScreen" component={KeuanganStackScreen} />
    <Drawer.Screen
      name="PembayaranStackScreen"
      component={PembayaranStackScreen}
    />
    <Drawer.Screen
      name="StatistikStackScreen"
      component={StatistikStackScreen}
    />
  </Drawer.Navigator>
);

const HomeStackScreen = ({navigation, route}) => {
  return (
    <HomeStack.Navigator headerMode={false}>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
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
              config: {duration: 500, easing: Easing.linear},
            },
          },
        })}
      />
      <HomeStack.Screen name="Profil" component={Profile} />
      <HomeStack.Screen name="EditProfil" component={EditProfilePage} />
      <HomeStack.Screen name="EditKost" component={EditKostPage} />
      {/* <PendaftarStack.Screen
        name="DetailPendaftar"
        component={DetailPendaftar}
      /> */}
    </HomeStack.Navigator>
  );
};

const KamarStackScreen = ({navigation, route}) => {
  return (
    <KamarStack.Navigator headerMode={false}>
      <KamarStack.Screen
        name="ListKamar"
        component={ListKamar}
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
              config: {duration: 500, easing: Easing.linear},
            },
          },
        })}
      />
      <KamarStack.Screen name="CreateKelas" component={FormKelasKamar} />
      <KamarStack.Screen
        name="DetailKelas"
        component={DetailKelasKamar}
        // sharedElementsConfig={(route, otherRoute, showing) => {
        //   const {item} = route.params;
        //   console.log(otherRoute.name);
        //   // console.log(item);
        //   return [`item.${item.id}.foto_kamar`];
        // }}
        // options={() => ({
        //   gestureEnabled: false,
        //   cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        //   transitionSpec: {
        //     open: {
        //       animation: 'timing',
        //       config: {duration: 500, easing: Easing.linear},
        //     },
        //     close: {
        //       animation: 'timing',
        //       config: {duration: 500, easing: Easing.linear},
        //     },
        //   },
        // })}
      />
      <KamarStack.Screen name="CreateKamar" component={CreateKamar} />
      <KamarStack.Screen name="EditKelas" component={EditKelasKamar} />
      <KamarStack.Screen name="EditFasilitas" component={EditFasilitas} />
      <KamarStack.Screen
        name="DaftarKamar"
        component={DaftarKamar}
        sharedElementsConfig={(route, otherRoute, showing) => {
          console.log('----DAFTARKAMAR----');
          const {id} = route.params;
          console.log(id);
          // showing(false);
          showing.valueOf(false);
          return [`item.${id}.foto_kamar`];
        }}
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
              config: {duration: 500, easing: Easing.linear},
            },
          },
        })}
      />
      <KamarStack.Screen name="FormKelasKamar" component={FormKelasKamar} />
      <KamarStack.Screen name="DetailKamar" component={DetailKamar} />
      <KamarStack.Screen name="EditKamar" component={EditKamar} />
    </KamarStack.Navigator>
  );
};

const PenghuniStackScreen = ({navigation, route}) => {
  return (
    <PenghuniStack.Navigator headerMode={false}>
      <PenghuniStack.Screen
        name="ListPenghuni"
        component={ListPenghuni}
        // options={() => ({
        //   gestureEnabled: false,
        //   cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        //   transitionSpec: {
        //     open: {
        //       animation: 'timing',
        //       config: {duration: 500, easing: Easing.linear},
        //     },
        //     close: {
        //       animation: 'timing',
        //       config: {duration: 500, easing: Easing.linear},
        //     },
        //   },
        // })}
      />

      <PenghuniStack.Screen
        name="ProfilPenghuni"
        component={ProfilPenghuni}
        // options={() => ({
        //   gestureEnabled: false,
        //   transitionSpec: {
        //     open: {
        //       animation: 'timing',
        //       config: {duration: 500, easing: Easing.inOut(Easing.ease)},
        //     },
        //     close: {
        //       animation: 'spring',
        //       config: {duration: 500, easing: Easing.inOut(Easing.linear)},
        //     },
        //   },
        //   cardStyleInterpolator: ({current: {progress}}) => {
        //     return {
        //       cardStyle: {
        //         opacity: progress,
        //       },
        //     };
        //   },
        // })}
      />
      <PenghuniStack.Screen name="EditPenghuni" component={EditPenghuni} />
      <PenghuniStack.Screen name="PilihKelas" component={PilihKelas} />
      <PenghuniStack.Screen name="PilihKamar" component={PilihKamar} />
    </PenghuniStack.Navigator>
  );
};

const PendaftarStackScreen = ({navigation, route}) => {
  return (
    <PendaftarStack.Navigator headerMode={false}>
      <PendaftarStack.Screen
        name="ListPendaftar"
        component={ListPendaftar}
        // options={() => ({
        //   gestureEnabled: false,
        //   cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        //   transitionSpec: {
        //     open: {
        //       animation: 'timing',
        //       config: {duration: 500, easing: Easing.linear},
        //     },
        //     close: {
        //       animation: 'timing',
        //       config: {duration: 500, easing: Easing.linear},
        //     },
        //   },
        // })}
      />
      <PendaftarStack.Screen
        name="DetailPendaftar"
        component={ProfilPendaftar}
        // options={() => ({
        //   gestureEnabled: false,
        //   transitionSpec: {
        //     open: {
        //       animation: 'timing',
        //       config: {duration: 500, easing: Easing.inOut(Easing.ease)},
        //     },
        //     close: {
        //       animation: 'spring',
        //       config: {duration: 500, easing: Easing.inOut(Easing.linear)},
        //     },
        //   },
        //   cardStyleInterpolator: ({current: {progress}}) => {
        //     return {
        //       cardStyle: {
        //         opacity: progress,
        //       },
        //     };
        //   },
        // })}
      />
    </PendaftarStack.Navigator>
  );
};

const KeuanganStackScreen = ({navigation, route}) => {
  return (
    <KeuanganStack.Navigator headerMode={true}>
      <KeuanganStack.Screen name="DetailKeuangan" component={DetailKeuangan} />
      <KeuanganStack.Screen name="Laporan" component={PageDL} />
    </KeuanganStack.Navigator>
  );
};

const PembayaranStackScreen = ({navigation, route}) => {
  return (
    <PembayaranStack.Navigator headerMode={false}>
      <PembayaranStack.Screen
        name="HalamanBayar"
        component={HalamanBayar}
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
              config: {duration: 500, easing: Easing.linear},
            },
          },
        })}
      />
    </PembayaranStack.Navigator>
  );
};

const StatistikStackScreen = ({navigation, route}) => {
  return (
    <StatistikStack.Navigator headerMode={true}>
      <StatistikStack.Screen name="KostStatistik" component={KostStatistik} />
    </StatistikStack.Navigator>
  );
};

const MainStackScreen = ({navigation, route}) => {
  useEffect(() => {
    if (route.state !== undefined) {
      // console.log(route.state);
      if (
        route.state.routes[route.state.routes.length - 1].name ==
        'DetailPenghuni'
      ) {
        navigation.setOptions({gestureEnabled: false});
      } else {
        navigation.setOptions({gestureEnabled: true});
      }
      // console.log(route.state.routes[route.state.routes.length - 1]);
    }
    // route.state !== undefined
    //   ? route.state.name == 'DetailPenghuni'
    //     ? navigation.setOptions({gestureEnabled: false})
    //     : navigation.setOptions({gestureEnabled: true})
    //   : null;
  }, [navigation, route]);

  return <MainStack.Navigator headerMode={false}></MainStack.Navigator>;
};

const MainNavigator = ({navigation}) => {
  useEffect(() => {
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);

    function onRegister(token) {
      console.log('[App] onRegister:', token);
    }

    function onNotification(notify) {
      console.log('[App] onNotification :', notify);
      const options = {
        soundName: 'default',
        playSound: true,
      };
      localNotificationService.showNotification(
        0,
        notify.notification.title,
        notify.notification.body,
        notify.data,
        options,
      );
    }

    function onOpenNotification(notify) {
      if (Object.keys(notify).length != 0) {
        if (notify.data.stack != null) {
          console.log('----------------');
          console.log(notify.data.stack);
          console.log(notify.data.screen);
          console.log('----------------Kontol');

          navigation.navigate(notify.data.stack, {
            screen: notify.data.screen,
          });
        }
        // else {
        //   console.log('bruh');
        // }
      }

      // console.log('[App] ON APP ONOPENNOTIFY', notify);
    }

    return () => {
      console.log('[App] unRegister');
      fcmService.unRegister();
      localNotificationService.unregister();
    };
  }, []);
  return (
    <BundleStack.Navigator headerMode={false}>
      <BundleStack.Screen name="MainScreen" component={DrawerScreen} />
      <BundleStack.Screen name="FirstScreen" component={FirstTimeNavigator} />
    </BundleStack.Navigator>
  );
};

export default MainNavigator;

const styles = StyleSheet.create({});
