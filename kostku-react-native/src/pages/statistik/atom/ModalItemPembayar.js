import React from 'react';
import {Text, View} from 'react-native';
import {screenWidth, myColor, formatRupiah} from '../../../function/MyVar';
class ModalItemPembayar extends React.PureComponent {
  render() {
    const {data, title, ...rest} = this.props;

    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottomColor: myColor.divider,
          borderBottomWidth: 1,
          paddingVertical: 5,
        }}>
        <Text
          style={{
            fontFamily: 'OpenSans-SemiBold',
            fontSize: 12,
            color: myColor.fbtx,
          }}>
          {title}
        </Text>
        <Text
          style={{
            fontFamily: 'OpenSans-SemiBold',
            fontSize: 12,
            color: myColor.fbtx,
            textAlign: 'right',
          }}>
          {/* Rp 300.000 */}
          {formatRupiah(data.jumlah.toString(), 'Rp. ')}
        </Text>
      </View>
    );
  }
}

export default ModalItemPembayar;
