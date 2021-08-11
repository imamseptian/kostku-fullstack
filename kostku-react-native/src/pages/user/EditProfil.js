import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Modal from 'react-native-translucent-modal';
import {myColor, screenHeight, screenWidth, APIUrl} from '../../function/MyVar';
import {ModalEditProfil} from './';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import {HeaderPage} from '../../components';
const EditProfil = ({navigation, route}) => {
  const dataRedux = useSelector((state) => state.AuthReducer);

  const [showModal, setshowModal] = useState(false);
  const [propModal, setpropModal] = useState({
    title: 'Edit Nama',
    edit: 'nama',
  });
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <StatusBar translucent backgroundColor="transparent" />
      <Modal
        visible={showModal}
        transparent={true}
        onRequestClose={() => setshowModal(false)}>
        <ModalEditProfil
          user={{
            nama: dataRedux.user.nama,
            foto_profil: dataRedux.user.foto_profil,
          }}
          token={dataRedux.token}
          styling={propModal}
          // fungsiubah={(item) => setuser(item)}
          tutup={() => setshowModal(false)}
        />
      </Modal>
      <HeaderPage title="Edit Profil" />

      <ScrollView>
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            paddingHorizontal: 0.1 * screenWidth,
            height: 70,
            alignItems: 'center',
          }}>
          <View
            style={{
              height: 40,
              width: 40,
              borderRadius: 5,
              backgroundColor: myColor.myblue,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Octicons name="settings" color={myColor.myWhite} size={25} />
          </View>
          <View style={{marginLeft: 10}}>
            <Text
              style={{fontSize: 14, fontWeight: 'bold', color: myColor.fbtx}}>
              Profil
            </Text>
            <Text
              style={{fontSize: 12, fontWeight: 'bold', color: myColor.fbtx1}}>
              Edit dan kelola data profil anda
            </Text>
          </View>
        </View>

        <View
          style={{
            marginHorizontal: 0.1 * screenWidth,

            backgroundColor: myColor.grayprofile,
            paddingHorizontal: 10,
            borderRadius: 5,
            paddingVertical: 10,
            marginBottom: 10,
          }}>
          <TouchableOpacity
            onPress={() => {
              setshowModal(true);
              setpropModal({
                ...propModal,
                title: 'Edit Foto Profil',
                edit: 'foto_profil',
              });
            }}>
            <View style={styles.wrapperFieldInfo}>
              <View>
                <Text style={styles.namaInfo}>Foto Profil</Text>
                <Image
                  source={{
                    uri:
                      APIUrl +
                      '/kostdata/pemilik/foto/' +
                      dataRedux.user.foto_profil,
                  }}
                  style={{height: 50, width: 50, borderRadius: 10}}
                />
              </View>

              <SimpleLineIcons
                name="arrow-right"
                color={myColor.graytextprof}
                size={25}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setshowModal(true);
              setpropModal({
                ...propModal,
                title: 'Nama',
                edit: 'nama',
              });
            }}>
            <View style={styles.wrapperFieldInfo}>
              <View>
                <Text style={styles.namaInfo}>Nama Depan</Text>
                <Text style={styles.contentInfo}>{dataRedux.user.nama}</Text>
              </View>
              <Text style={styles.contentInfo}>
                {/* {JSON.stringify(route.params)} */}
              </Text>
              <SimpleLineIcons
                name="arrow-right"
                color={myColor.graytextprof}
                size={25}
              />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfil;

const styles = StyleSheet.create({
  wrapperFieldInfo: {
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  namaInfo: {
    fontSize: 14,
    fontFamily: 'OpenSans-SemiBold',
    color: myColor.fbtx,
  },
  contentInfo: {
    fontSize: 12,
    fontFamily: 'OpenSans-Regular',

    color: myColor.fbtx,
    textAlign: 'justify',
  },
});
