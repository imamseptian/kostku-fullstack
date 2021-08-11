import axios from 'axios';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-translucent-modal';
import {HeaderPage, PureModal} from '../../components';
import {APIUrl, myColor, screenWidth} from '../../function/MyVar';
import {ModalEditFasilitas, ModalTambahFasilitas} from './component';
import {useSelector} from 'react-redux';

const EditFasilitas = ({navigation, route}) => {
  const dataRedux = useSelector((state) => state.AuthReducer);
  const [dataFasilitas, setdataFasilitas] = useState(route.params.fasilitas);
  const [showModalEdit, setshowModalEdit] = useState(false);
  const [showModalTambah, setshowModalTambah] = useState(false);
  const [selectedFasilitas, setselectedFasilitas] = useState(0);

  const [isLoading, setisLoading] = useState(false);

  const refreshFasilitas = () => {
    setisLoading(true);
    axios
      .get(APIUrl + '/api/getfasilitas/' + route.params.data.id)
      .then((res) => {
        if (res.data.success) {
          setdataFasilitas(res.data.data);
          setisLoading(false);
        } else {
          alert('error');
          setisLoading(false);
        }
      })
      .catch((error) => {
        setisLoading(false);
      });
  };

  const hapusFasilitas = (id) => {
    setisLoading(true);
    axios
      .delete(APIUrl + '/api/hapuskamarfasilitas/' + id, {
        headers: {
          Authorization: `Bearer ${dataRedux.token}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          alert('sukses');
          setisLoading(false);
          refreshFasilitas();
        } else {
          alert('nihil');
          console.log(res.data);
          setisLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setisLoading(false);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#f6f6f6'}}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      {/* <Spinner
        visible={isSubmit}
        textContent={'Tunggu Sebentar'}
        textStyle={{color: '#FFF'}}
      /> */}
      <HeaderPage title="Edit Fasilitas" />

      {dataFasilitas.length > 0 ? (
        <Modal
          visible={showModalEdit}
          transparent={true}
          onRequestClose={() => setshowModalEdit(false)}>
          <PureModal>
            <ModalEditFasilitas
              id_kelas={route.params.data.id}
              data={dataFasilitas[selectedFasilitas]}
              closeModal={() => {
                setshowModalEdit(false);
              }}
              token={dataRedux.token}
              refreshFasilitas={() => {
                setshowModalEdit(false);
                refreshFasilitas();
              }}
            />
          </PureModal>
        </Modal>
      ) : null}

      <Modal
        visible={showModalTambah}
        transparent={true}
        onRequestClose={() => setshowModalTambah(false)}>
        <PureModal>
          <ModalTambahFasilitas
            id_kelas={route.params.data.id}
            closeModal={() => {
              setshowModalTambah(false);
            }}
            token={dataRedux.token}
            refreshFasilitas={() => {
              setshowModalTambah(false);
              refreshFasilitas();
            }}
          />
        </PureModal>
      </Modal>

      <View style={{paddingHorizontal: 0.05 * screenWidth, flex: 1}}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: 'OpenSans-SemiBold',
            marginVertical: 10,
            color: myColor.fbtx,
          }}>
          Fasilitas {route.params.data.nama}
        </Text>

        <FlatList
          // style={{flexGrow:1}}
          data={dataFasilitas}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          // contentContainerStyle={{flexGrow: 1}}
          renderItem={({item, index, separator}) => {
            return (
              <View
                style={{
                  height: 40,
                  borderColor: myColor.divider,
                  borderRadius: 5,
                  borderWidth: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 5,
                  marginBottom: 10,
                  backgroundColor: '#ffffff',
                }}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text style={[styles.itemText, {marginRight: 5}]}>
                    {index + 1 + '.'}
                  </Text>
                  <Text style={styles.itemText}>{item.nama}</Text>
                </View>
                <TouchableOpacity
                  style={{marginRight: 10}}
                  onPress={() => {
                    setselectedFasilitas(index);
                    setshowModalEdit(true);
                  }}>
                  <View
                    style={[
                      styles.iconbox,
                      {backgroundColor: myColor.success},
                    ]}>
                    <FontAwesome name="pencil" color={myColor.fbtx} size={15} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{marginRight: 10}}
                  onPress={() => {
                    setisLoading(true);
                    Alert.alert(
                      'Konfirmasi',
                      'Hapus fasilitas ini ?',
                      [
                        {
                          text: 'Batal',
                          onPress: () => setisLoading(false),
                          style: 'cancel',
                        },
                        {text: 'Ya', onPress: () => hapusFasilitas(item.id)},
                      ],
                      {cancelable: false},
                    );
                  }}>
                  <View
                    style={[styles.iconbox, {backgroundColor: myColor.alert}]}>
                    <FontAwesome name="trash" color="#ffffff" size={15} />
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />

        <TouchableOpacity
          onPress={() => {
            setshowModalTambah(true);
          }}>
          <View
            style={{
              height: 40,
              backgroundColor: myColor.addfacility,
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
            }}>
            <Text
              style={{
                fontFamily: 'OpenSans-SemiBold',
                fontSize: 12,
                color: '#ffffff',
              }}>
              Tambah Fasilitas
            </Text>
          </View>
        </TouchableOpacity>
        <ActivityIndicator
          animating={isLoading}
          size="large"
          color={myColor.myblue}
          style={styles.loading}
        />
      </View>
      {/* <Text>{JSON.stringify(dataFasilitas)}</Text> */}
    </View>
  );
};

export default EditFasilitas;

const styles = StyleSheet.create({
  itemText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    color: myColor.fbtx,
  },
  iconbox: {
    height: 30,
    width: 30,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
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
