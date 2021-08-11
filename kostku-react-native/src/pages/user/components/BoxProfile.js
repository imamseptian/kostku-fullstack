import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {APIUrl, myColor, screenHeight} from '../../../function/MyVar';

const BoxProfile = (props) => {
  const dataRedux = useSelector((state) => state.AuthReducer);
  const navigation = useNavigation();
  return (
    <View
      style={{
        marginTop: 0.2 * screenHeight - 125 / 2,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: myColor.divider,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={{
            uri: APIUrl + '/storage/images/users/' + dataRedux.user.foto_profil,
          }}
          style={{height: 100, width: 100, borderRadius: 10}}
        />
        <View style={{marginLeft: 15, flex: 1}}>
          <Text style={styles.namaprofil}>
            {dataRedux.user.nama}
            {/* {JSON.stringify(dataRedux)} */}
          </Text>
          <Text style={styles.email}>{dataRedux.user.email}</Text>

          <View
            style={{
              backgroundColor: myColor.grayprofile,
              flex: 1,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 10,
              borderRadius: 5,
            }}>
            <View>
              <Text style={styles.subTitle}>Kelas</Text>
              <Text style={styles.subContent}>{props.attribut.kelas}</Text>
            </View>
            <View>
              <Text style={styles.subTitle}>Kamar</Text>
              <Text style={styles.subContent}>{props.attribut.kamar}</Text>
            </View>
            <View>
              <Text style={styles.subTitle}>Penghuni</Text>
              <Text style={styles.subContent}>{props.attribut.penghuni}</Text>
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity onPress={() => navigation.push('EditProfil')}>
        <View
          style={{
            backgroundColor: myColor.addfacility,
            borderRadius: 5,
            height: 50,
            marginTop: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'OpenSans-SemiBold',
              color: '#fff',
            }}>
            Edit Profil
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BoxProfile;

const styles = StyleSheet.create({
  namaprofil: {
    fontSize: 16,
    fontFamily: 'OpenSans-SemiBold',
    color: myColor.fbtx,
    marginBottom: 3,
  },
  email: {
    fontSize: 11,
    fontFamily: 'OpenSans-Regular',
    color: myColor.fbtx1,
    marginBottom: 7,
  },
  subTitle: {
    fontSize: 14,
    fontFamily: 'OpenSans-SemiBold',
    color: myColor.fbtx,
  },
  subContent: {
    fontSize: 12,
    fontFamily: 'OpenSans-Regular',
    color: myColor.fbtx,
  },
});
