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
import Modal from 'react-native-translucent-modal';
import {useDispatch, useSelector} from 'react-redux';
import {myColor, screenHeight, screenWidth, APIUrl} from '../../function/MyVar';
import {ModalEditKost} from './';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
const EditKost = ({navigation, route}) => {
  const dataRedux = useSelector((state) => state.AuthReducer);
  const [kost, setkost] = useState({
    nama: route.params.nama,
    alamat: route.params.alamat,
    notelp: route.params.notelp,
    deskripsi: route.params.deskripsi,
    foto_kost: route.params.foto_kost,
  });
  const [showModal, setshowModal] = useState(false);
  const [propModal, setpropModal] = useState({
    title: 'Edit Nama ',
    edit: 'nama',
  });
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#f6f6f6',
      }}>
      <StatusBar translucent backgroundColor="transparent" />
      <Modal
        visible={showModal}
        transparent={true}
        onRequestClose={() => setshowModal(false)}>
        <ModalEditKost
          kost={kost}
          token={dataRedux.token}
          styling={propModal}
          fungsiubah={(item) => setkost(item)}
          tutup={() => setshowModal(false)}
        />
      </Modal>
      <View
        style={{
          height: StatusBar.currentHeight + 50,
          backgroundColor: 'white',
          borderBottomWidth: 1,
          paddingTop: StatusBar.currentHeight,
          alignItems: 'center',
          paddingHorizontal: 10,
          flexDirection: 'row',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" color={myColor.fbtx} size={25} />
        </TouchableOpacity>
        <Text
          style={{
            marginLeft: 15,
            fontSize: 20,
            fontWeight: 'bold',
            color: myColor.fbtx,
          }}>
          Edit Data Kost
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            marginHorizontal: 0.1 * screenWidth,
            width: 0.8 * screenWidth,
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
              style={{
                fontSize: 14,
                fontFamily: 'OpenSans-SemiBold',
                color: myColor.fbtx,
              }}>
              Edit Kost
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'OpenSans-Regular',
                color: myColor.fbtx,
              }}>
              Edit dan kelola data kost anda
            </Text>
          </View>
        </View>

        <View
          style={{
            marginHorizontal: 0.1 * screenWidth,

            backgroundColor: myColor.grayprofile,
            paddingHorizontal: 0.05 * screenWidth,
            borderRadius: 5,
            paddingVertical: 10,
            borderWidth: 0.5,
            borderColor: myColor.divider,
            marginBottom: 10,
          }}>
          <TouchableOpacity
            onPress={() => {
              setshowModal(true);
              setpropModal({
                ...propModal,
                title: 'Edit Foto Kost',
                edit: 'foto_kost',
              });
            }}>
            <View style={styles.wrapperFieldInfo}>
              <View>
                <Text style={styles.namaInfo}>Foto Kost</Text>
                <Image
                  source={{
                    uri: APIUrl + '/kostdata/kost/foto/' + kost.foto_kost,
                  }}
                  style={{height: 50, width: 50, borderRadius: 10}}
                  onError={() => {
                    console.log(
                      APIUrl + '/kostdata/kost/foto/' + kost.foto_kost,
                    );
                  }}
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
                title: 'Edit Nama Kost',
                edit: 'nama',
              });
            }}>
            <View style={styles.wrapperFieldInfo}>
              <View>
                <Text style={styles.namaInfo}>Nama Kost</Text>
                <Text style={styles.contentInfo}>{kost.nama}</Text>
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
                title: 'Edit Alamat Kost',
                edit: 'alamat',
              });
            }}>
            <View style={styles.wrapperFieldInfo}>
              <View>
                <Text style={styles.namaInfo}>Alamat Kost</Text>
                <Text style={styles.contentInfo}>{kost.alamat}</Text>
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
                title: 'Edit Nomor Telepon Kost',
                edit: 'notelp',
              });
            }}>
            <View style={styles.wrapperFieldInfo}>
              <View>
                <Text style={styles.namaInfo}>No Telepon Kost</Text>
                <Text style={styles.contentInfo}>{kost.notelp}</Text>
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
                title: 'Edit Nama Kost',
                edit: 'deskripsi',
              });
            }}>
            <View style={styles.wrapperFieldInfo}>
              <View>
                <Text style={styles.namaInfo}>Deskripsi Kost</Text>
                <Text style={styles.contentInfo}>{kost.deskripsi}</Text>
              </View>
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

export default EditKost;

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
