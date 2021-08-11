// import React from 'react';
import React, {PureComponent} from 'react';

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';
import {myColor, APIUrl, dataBulan} from '../function/MyVar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {SharedElement} from 'react-navigation-shared-element';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class FlatListPendaftar extends React.PureComponent {
  render() {
    const {item, ...rest} = this.props;

    let tanggal_daftar = new Date(item.tanggal_daftar);

    return (
      <TouchableOpacity {...rest}>
        <View
          style={{
            marginTop: 15,
            marginHorizontal: 3,
            borderRadius: 10,
            backgroundColor: 'white',
            flexDirection: 'row',
            position: 'relative',
            borderWidth: 1,
            borderColor: myColor.divider,
          }}>
          <View
            style={{
              backgroundColor: 'white',
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
              right: 5,
              borderRadius: 3,
              bottom: -10,
              borderWidth: 1,
              borderColor: myColor.divider,
              paddingVertical: 3,
              paddingHorizontal: 10,
            }}>
            <Text
              style={{
                fontFamily: 'OpenSans-Regular',
                fontSize: 12,
                color: myColor.fbtx,
              }}>
              {/* {item.hari}-{item.bulan}-{item.tahun} */}
              {tanggal_daftar.getDate()}-
              {dataBulan[tanggal_daftar.getMonth()].nama}-
              {tanggal_daftar.getFullYear()}
            </Text>
          </View>

          {item.isread ? null : (
            <MaterialIcons
              name="new-releases"
              color={myColor.alert}
              size={30}
              style={{
                position: 'absolute',
                right: -5,
                top: -10,
              }}
            />
          )}
          {/* <SharedElement id={`item.${item.id}.foto_pendaftar`}> */}
          <Image
            source={{
              uri: APIUrl + '/kostdata/pendaftar/foto/' + item.foto_diri,
            }}
            style={{
              width: 70,
              height: 70,
              marginVertical: 15,
              marginLeft: 10,
              borderRadius: 15,
            }}
            resizeMode="stretch"
          />
          {/* </SharedElement> */}

          <View
            style={{
              flex: 1,
              height: 20,
              marginHorizontal: 10,
              marginVertical: 15,
              flexDirection: 'row',
            }}>
            <View style={{marginRight: 10}}>
              <Text
                style={[
                  styles.textCard,
                  {fontSize: 16, fontFamily: 'OpenSans-SemiBold'},
                ]}>
                {item.nama_depan} {item.nama_belakang}
              </Text>

              <Text style={styles.textCard}>
                {item.kelamin == 2 ? 'Wanita' : 'Pria'} | {item.umur} Tahun
              </Text>
              <Text style={styles.textCard}>
                {item.status == 1 ? 'Pelajar' : 'Pekerja'}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default FlatListPendaftar;

const styles = StyleSheet.create({
  textCard: {
    color: myColor.darkText,
    marginBottom: 5,

    fontSize: 12,
    fontFamily: 'OpenSans-Regular',
  },
});
