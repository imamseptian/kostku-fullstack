import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  TouchableRipple,
  Switch,
  Text,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import {setAuthRedux, unsetAuthRedux} from '../../store';
import {fcmService} from '../../FCMService';
import {myColor, APIUrl} from '../../function/MyVar';
import {MyMenu, MySubMenu} from './component';

const CustomDrawer = (props) => {
  const dataRedux = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();

  const onAuthRedux = () => {
    dispatch(unsetAuthRedux());
  };

  const toLogin = () => {
    props.navigation.reset({
      index: 0,
      routes: [{name: 'AuthNavigator'}],
    });
  };

  const signOut = () => {
    let config = {
      headers: {Authorization: `Bearer ${dataRedux.token}`},
    };
    axios.get(APIUrl + '/api/logout', config).then((repos) => {
      let topic = 'kostku-' + dataRedux.user.kostku;
      console.log('unsub topic=' + topic);
      fcmService.unsubscribeToTopic(topic);
      clearAll();

      toLogin();
      // dispatch(unsetAuthRedux());
    });
  };

  // const MyMenu = (props) => (
  //   <TouchableRipple onPress={() => alert(props.title)}>
  //     <View
  //       style={{
  //         borderBottomWidth: 1,
  //         borderBottomColor: myColor.divider,
  //         paddingVertical: 10,
  //         paddingHorizontal: 20,
  //         flexDirection: 'row',
  //         alignItems: 'center',
  //       }}>
  //       <View style={styles.iconWrapper}>{props.children}</View>
  //       <Text
  //         style={{
  //           marginLeft: 35,
  //           fontSize: 12,
  //           fontFamily: 'OpenSans-SemiBold',
  //           color: myColor.grayGoogle,
  //         }}>
  //         {props.title}
  //       </Text>
  //     </View>
  //   </TouchableRipple>
  // );

  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      // clear error
    }
    console.log('Done.');
  };

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 15,
                alignItems: 'center',
              }}>
              {dataRedux.isAuth ? (
                <Avatar.Image
                  source={{
                    uri:
                      APIUrl +
                      '/storage/images/users/' +
                      dataRedux.user.foto_profil,
                  }}
                  size={50}
                />
              ) : null}

              <View style={{marginLeft: 15}}>
                <Title style={styles.title}>
                  {dataRedux.isAuth ? `${dataRedux.user.nama}` : null}
                </Title>
                <Caption style={styles.caption}>
                  {dataRedux.isAuth ? `${dataRedux.user.namakost}` : null}
                </Caption>
              </View>
            </View>
          </View>

          {/* Menu Section  */}

          {/* Home Section */}
          <MyMenu>
            <MySubMenu
              title="Beranda"
              onPress={() => {
                props.navigation.navigate('HomeStackScreen', {
                  screen: 'HomeScreen',
                });
              }}>
              <MaterialIcons name="home" color={myColor.grayGoogle} size={25} />
            </MySubMenu>
          </MyMenu>

          {/* Menu Kost Section  */}

          <MyMenu>
            <MySubMenu
              title="Kamar"
              onPress={() => {
                props.navigation.navigate('KamarStackScreen', {
                  screen: 'ListKamar',
                });
              }}>
              <Icon name="bed" color={myColor.grayGoogle} size={25} />
            </MySubMenu>

            <MySubMenu
              title="Penghuni"
              onPress={() => {
                props.navigation.navigate('PenghuniStackScreen', {
                  screen: 'ListPenghuni',
                });
              }}>
              <FontAwesome5 name="users" color={myColor.grayGoogle} size={25} />
            </MySubMenu>

            <MySubMenu
              title="Pendaftar"
              onPress={() => {
                props.navigation.navigate('PendaftarStackScreen', {
                  screen: 'ListPendaftar',
                });
              }}>
              <Foundation
                name="clipboard-pencil"
                color={myColor.grayGoogle}
                size={25}
              />
            </MySubMenu>
            <MySubMenu
              title="Statistik Kost"
              onPress={() => {
                // alert('statistik');
                props.navigation.navigate('StatistikStackScreen', {
                  screen: 'KostStatistik',
                });
              }}>
              <Foundation
                name="graph-trend"
                color={myColor.grayGoogle}
                size={25}
              />
            </MySubMenu>
          </MyMenu>

          {/* Keuangan Section  */}
          <MyMenu>
            <MySubMenu
              title="Pembayaran Sewa"
              onPress={() => {
                props.navigation.navigate('PembayaranStackScreen', {
                  screen: 'HalamanBayar',
                });
              }}>
              <Icon
                name="home-currency-usd"
                color={myColor.grayGoogle}
                size={25}
              />
            </MySubMenu>

            <MySubMenu
              title="Riwayat Keuangan"
              onPress={() => {
                props.navigation.navigate('KeuanganStackScreen', {
                  screen: 'DetailKeuangan',
                  params: {
                    page: 0,
                  },
                });
              }}>
              <Ionicons name="newspaper" color={myColor.grayGoogle} size={25} />
            </MySubMenu>

            <MySubMenu
              title="Unduh Laporan Bulanan"
              onPress={() => {
                props.navigation.navigate('KeuanganStackScreen', {
                  screen: 'Laporan',
                });
              }}>
              <FontAwesome5 name="print" color={myColor.grayGoogle} size={25} />
            </MySubMenu>
          </MyMenu>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <View style={styles.iconWrapper}>
              <Icon name="exit-to-app" color={myColor.grayGoogle} size={25} />
            </View>
          )}
          label={() => <Text style={styles.textMenu}>Keluar</Text>}
          onPress={() => {
            signOut();
          }}
        />
      </Drawer.Section>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
    marginBottom: 10,
  },
  title: {
    marginTop: 3,
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 16,
  },
  caption: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 5,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  iconWrapper: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textMenu: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 12,
    color: myColor.grayGoogle,
  },
});
