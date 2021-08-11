import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {
  screenWidth,
  myColor,
  defaultAsset,
  APIUrl,
} from '../../../function/MyVar';
class ModalItemPenghuni extends React.PureComponent {
  render() {
    const {data, ...rest} = this.props;
    // let tanggal_lahir = new Date(data.tanggal_lahir);
    const jumlahUmur = () => {
      let dateNow = new Date();

      let dateReg = new Date(data.tanggal_lahir);
      dateReg.setHours(dateReg.getHours() + dateReg.getTimezoneOffset() / 60);
      let dif = dateNow.getTime() - dateReg.getTime();

      // let beda_waktu = dif / (1000 * 3600 * 24 * 365);

      return Math.floor(dif / (1000 * 3600 * 24 * 365));
    };
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottomColor: myColor.divider,
          borderBottomWidth: 1,
          paddingVertical: 5,
          alignItems: 'center',
        }}>
        <View style={{height: 50, width: 50, borderRadius: 50 / 2}}>
          <Image
            source={{
              uri: APIUrl + '/storage/images/pendaftar/' + data.foto_diri,
            }}
            style={{height: 50, width: 50, borderRadius: 50 / 2}}
          />
        </View>
        <View>
          <Text
            style={{
              fontFamily: 'OpenSans-SemiBold',
              fontSize: 12,
              color: myColor.fbtx,
              textAlign: 'right',
              maxWidth: 0.4 * screenWidth,
            }}>
            {data.nama}
          </Text>
          <Text
            style={{
              fontFamily: 'OpenSans-Regular',
              fontSize: 12,
              color: myColor.fbtx,
              textAlign: 'right',
              marginTop: 5,
            }}>
            {data.jenis == 1 ? 'Pelajar' : 'Pekerja'} - {jumlahUmur()} Tahun
          </Text>
        </View>
      </View>
    );
  }
}

export default ModalItemPenghuni;
