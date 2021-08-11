import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {myColor, formatRupiah, dataBulan} from '../../../function/MyVar';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class FlatItemTagihan extends React.PureComponent {
  render() {
    let tanggal_tagihan = new Date(this.props.data.tanggal_tagihan);

    return (
      <TouchableOpacity
        onPress={() => {
          this.props.setSelected(
            !this.props.data.selected,
            this.props.index,
            'selected',
          );
        }}>
        <View
          style={{
            height: 100,
            flexDirection: 'row',
            // backgroundColor: 'red',
          }}>
          <View
            style={{
              height: 100,
              alignItems: 'center',
              justifyContent: 'center',
              borderRightWidth: 1,
              borderRightColor: myColor.myblue,
              width: 100,
              position: 'relative',
            }}>
            <Text style={styles.text}>
              {dataBulan[tanggal_tagihan.getMonth()].sort},{' '}
              {tanggal_tagihan.getFullYear()}
            </Text>
            <View
              style={{
                backgroundColor: 'white',
                height: 25,
                justifyContent: 'center',
                position: 'absolute',
                right: -(12 / 2),
              }}>
              <View
                style={{
                  width: 12,
                  height: 12,
                  backgroundColor: myColor.myblue,
                  borderRadius: 12 / 2,
                }}></View>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              alignItems: 'center',
              marginLeft: 20,
              flexDirection: 'row',
              position: 'relative',
            }}>
            {this.props.data.selected ? (
              <FontAwesome5
                name="check-circle"
                color={myColor.success}
                size={30}
                style={{
                  marginRight: 5,
                  position: 'absolute',
                  bottom: 10,
                  right: 30,
                }}
              />
            ) : null}

            <FontAwesome5
              name="money-bill-wave"
              color={myColor.blackText}
              size={15}
              style={{
                marginRight: 5,
              }}
            />
            <View style={{marginLeft: 5}}>
              <Text
                numberOfLines={2}
                style={[styles.text, {maxWidth: 0.7 * screenWidth - 100}]}>
                Tagihan sewa
              </Text>
              <Text style={styles.price}>
                {formatRupiah(this.props.data.jumlah.toString(), 'Rp. ')}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default FlatItemTagihan;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 13,
    color: myColor.blackText,
  },
  price: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    color: myColor.fbtx,
  },
});
