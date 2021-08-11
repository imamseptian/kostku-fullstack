// import React from 'react';
import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import {APIUrl, myColor, dataBulan} from '../function/MyVar';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class FlatListPenghuni extends React.PureComponent {
  render() {
    const {item, ...rest} = this.props;
    let tanggal_masuk = new Date(item.tanggal_masuk);

    return (
      <TouchableOpacity {...rest}>
        <View
          style={{
            marginTop: 15,
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
              {tanggal_masuk.getDate()}-
              {dataBulan[tanggal_masuk.getMonth()].nama}-
              {tanggal_masuk.getFullYear()}
            </Text>
          </View>
          <SharedElement id={`item.${item.id}.icon`}>
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
            />
          </SharedElement>

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

export default FlatListPenghuni;

const styles = StyleSheet.create({
  textCard: {
    color: myColor.fbtx,
    marginBottom: 5,
    fontSize: 12,
    fontFamily: 'OpenSans-Regular',
  },
});
