import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import {APIUrl, myColor} from '../function/MyVar';
import {CircleAvatar} from './atoms';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const HomePenghuniSection = (props) => {
  const navigation = useNavigation();

  // let content;

  // if (props.data.length < 1) {
  //   content = (
  //     <View
  //       style={{
  //         alignItems: 'center',
  //         justifyContent: 'center',
  //       }}>
  //       <Text
  //         style={{
  //           color: myColor.darkText,
  //           fontWeight: 'bold',
  //           fontSize: 18,
  //           paddingVertical: 15,
  //         }}>
  //         Penghuni kost masih kosong
  //       </Text>
  //     </View>
  //   );
  // } else {
  //   content = (
  //     <ScrollView
  //       horizontal={true}
  //       showsHorizontalScrollIndicator={false}
  //       style={{paddingLeft: 0.05 * screenWidth}}>
  //       {props.data.map((item, index) => {
  //         return (
  //           <View key={index}>
  //             <CircleAvatar
  //               data={item}
  //               onPress={() => {
  //                 // navigation.navigate('PenghuniScreen', {
  //                 //   screen: 'DetailPenghuni',
  //                 //   params: {
  //                 //     penghuni: item,
  //                 //   },
  //                 // });
  //                 console.log(
  //                   APIUrl + '/kostdata/pendaftar/foto/' + item.foto_diri,
  //                 );
  //                 // navigation.push('DetailPenghuni', {penghuni: item});
  //                 console.log(item);
  //                 navigation.push('DetailPenghuni', {item});
  //               }}
  //             />
  //           </View>
  //         );
  //       })}
  //     </ScrollView>
  //   );
  // }

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',

          alignItems: 'center',
          paddingHorizontal: 0.05 * screenWidth,
        }}>
        <Text style={styles.sectionTitle}>Penghuni</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('PenghuniStackScreen', {
              screen: 'ListPenghuni',
            });
          }}>
          <Text style={styles.seeAll}>Lihat Semua</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          justifyContent: 'center',
          position: 'relative',
        }}>
        {props.data.length < 1 ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: myColor.darkText,
                fontWeight: 'bold',
                fontSize: 18,
                paddingVertical: 15,
              }}>
              Penghuni kost masih kosong
            </Text>
          </View>
        ) : (
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{paddingLeft: 0.05 * screenWidth, paddingTop: 10}}>
            {props.data.map((item, index) => {
              return (
                <CircleAvatar
                  key={index}
                  data={item}
                  onPress={() => {
                    navigation.navigate('PenghuniStackScreen', {
                      screen: 'ProfilPenghuni',
                      params: {
                        item,
                      },
                    });
                    // console.log(
                    //   APIUrl + '/kostdata/pendaftar/foto/' + item.foto_diri,
                    // );
                    // navigation.push('DetailPenghuni', {penghuni: item});
                    // console.log(item);
                    // navigation.push('DetailPenghuni', {item});
                  }}
                />
              );
            })}
          </ScrollView>
        )}

        {/* {props.status ? (
          <ActivityIndicator size="large" color={myColor.colorTheme} />
        ) : (
          content
        )} */}
        {/* {content} */}
        <ActivityIndicator
          animating={props.status}
          size="large"
          color={myColor.myblue}
          style={styles.loading}
        />
      </View>
    </View>
  );
};

export default HomePenghuniSection;

const styles = StyleSheet.create({
  sectionTitle: {
    color: myColor.titleHome,
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
  },
  seeAll: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 12,
    color: myColor.myblue,
  },
  imageScrollWrapper: {height: 60, width: 60, borderRadius: 30, elevation: 5},
  avatarScroll: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    borderWidth: 2,
    borderColor: 'white',
    // elevation: 5,
  },
  avatarName: {
    fontSize: 12,
    maxWidth: 70,
    color: myColor.darkText,
  },
  scrollWrapper: {
    alignItems: 'center',
    marginRight: 15,
    marginTop: 10,
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
