import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {
  myColor,
  defaultAsset,
  dataBulan,
  APIUrl,
} from '../../../function/MyVar';

// class CardProfile extends React.PureComponent {
//   render() {

//   }
// }

const CardProfile = (props) => {
  const [foto_diri, setfoto_diri] = useState(
    APIUrl + '/storage/images/pendaftar/' + props.item.foto_diri,
  );

  // let foto_diri = APIUrl + '/kostdata/pendaftar/' + props.item.foto_diri;
  const jumlahUmur = () => {
    let dateNow = new Date();

    let dateReg = new Date(props.item.tanggal_lahir);
    dateReg.setHours(dateReg.getHours() + dateReg.getTimezoneOffset() / 60);
    let dif = dateNow.getTime() - dateReg.getTime();

    // let beda_waktu = dif / (1000 * 3600 * 24 * 365);

    return Math.floor(dif / (1000 * 3600 * 24 * 365));
  };

  const waktu_daftar = () => {
    let dateNow = new Date();

    let dateReg = new Date(props.item.tanggal_daftar);
    dateReg.setHours(dateReg.getHours() + dateReg.getTimezoneOffset() / 60);

    let dif = dateNow.getTime() - dateReg.getTime();
    // let beda_waktu = dif / (1000 * 3600 * 24);
    let beda_waktu = dif / (1000 * 3600);
    // if(dateNow.getDate())

    // return dateReg.toString();

    if (beda_waktu <= 24) {
      if (dateNow.getDate() === dateReg.getDate()) {
        return 'Hari Ini';
      } else {
        return 'Kemarin';
      }
    } else if (beda_waktu > 24 && beda_waktu <= 48) {
      return 'Kemarin';
    } else if (beda_waktu > 48 && beda_waktu <= 24 * 7) {
      return Math.floor(dif / (1000 * 3600 * 24)) + ' Hari Lalu';
    } else {
      return `${dateReg.getDate()} ${
        dataBulan[dateReg.getMonth()].nama
      } ${dateReg.getFullYear()}`;
    }
  };

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.cardWrapper}>
        <View style={styles.wrapperTop}>
          <Text style={styles.textNama}>{props.item.nama}</Text>
          <View style={styles.wrapperDate}>
            <Text
              style={{
                fontFamily: 'OpenSans-SemiBold',
                fontSize: 12,
                color: '#fff',
              }}>
              {waktu_daftar()}
            </Text>
          </View>
        </View>
        <View style={styles.wrapperBot}>
          <View style={styles.wrapperStatus}>
            <View style={styles.pillStatus}>
              <Text
                style={{
                  fontFamily: 'OpenSans-SemiBold',
                  fontSize: 12,
                  color: '#fff',
                }}>
                Status :{' '}
                {props.item.status_pekerjaan == 1 ? 'Pelajar' : 'Pekerja'} &{' '}
                {props.item.status_hubungan == 1 ? 'Lajang' : 'Menikah'}
              </Text>
            </View>
          </View>
          <View style={styles.wrapperAvatar}>
            <View
              style={{
                height: 60,
                width: 60,
                borderRadius: 30,
                borderWidth: 2,
                borderColor: '#fff',
                backgroundColor: myColor.divider,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={{uri: foto_diri}}
                style={styles.avatar}
                onError={(e) => setfoto_diri(defaultAsset.foto_profil)}
              />
            </View>

            <View style={{paddingTop: 30, marginLeft: 5}}>
              <Text
                style={{
                  fontFamily: 'OpenSans-Regular',
                  fontSize: 12,
                  color: myColor.darkText,
                }}>
                {props.item.kelamin == 1 ? 'Pria' : 'Wanita'}, {jumlahUmur()}{' '}
                Tahun
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardProfile;

const styles = StyleSheet.create({
  cardWrapper: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderWidth: 1,

    borderColor: myColor.divider,
    marginVertical: 10,
  },
  wrapperTop: {
    height: 50,
    backgroundColor: myColor.colorTheme,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    justifyContent: 'flex-end',
    position: 'relative',
  },
  textNama: {
    marginLeft: 80,
    fontFamily: 'OpenSans-SemiBold',
    color: '#fff',
    fontSize: 14,
  },
  wrapperDate: {position: 'absolute', top: 5, right: 5},
  wrapperBot: {
    position: 'relative',
    height: 60,
    justifyContent: 'flex-end',
  },
  wrapperStatus: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  pillStatus: {
    paddingVertical: 5,
    marginHorizontal: 8,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: myColor.darkText,
    alignItems: 'flex-end',
    paddingHorizontal: 5,
    width: 180,
    borderTopLeftRadius: 90,
    borderBottomLeftRadius: 90,
    backgroundColor: myColor.alert,
  },
  wrapperAvatar: {
    position: 'absolute',
    top: -30,
    left: 15,
    flexDirection: 'row',
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#fff',
  },
});
