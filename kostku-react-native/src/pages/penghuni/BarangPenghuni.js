import React, {useState} from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import {PureModal} from '../../components';
import {formatRupiah, myColor, screenWidth} from '../../function/MyVar';
import {ModalEditBarang, ModalTambahBarang} from './components';
const BarangPenghuni = ({data, id_penghuni, refresh}) => {
  const [showModalTambah, setShowModalTambah] = useState(false);
  const [showModalEdit, setshowModalEdit] = useState(false);

  const [selectedItem, setselectedItem] = useState({
    nama: '',
    qty: 1,
    total: 0,
    id_penghuni: id_penghuni,
  });

  return (
    <View
      style={{
        width: screenWidth,
        paddingHorizontal: 0.05 * screenWidth,
        paddingVertical: 5,
        flex: 1,
      }}>
      <Modal
        visible={showModalTambah}
        transparent={true}
        onRequestClose={() => setShowModalTambah(false)}>
        <PureModal>
          <ModalTambahBarang
            id_penghuni={id_penghuni}
            refreshFunction={() => {
              setShowModalTambah(false);
              refresh();
            }}
            closeModal={() => {
              setShowModalTambah(false);
            }}
          />
        </PureModal>
      </Modal>

      <Modal
        visible={showModalEdit}
        transparent={true}
        onRequestClose={() => setshowModalEdit(false)}>
        <PureModal>
          <ModalEditBarang
            id_penghuni={id_penghuni}
            data={selectedItem}
            refreshFunction={() => {
              setshowModalEdit(false);
              refresh();
            }}
            closeModal={() => {
              setshowModalEdit(false);
            }}
          />
        </PureModal>
      </Modal>

      <FlatList
        style={{paddingHorizontal: 3}}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index, separator}) => {
          return (
            <TouchableNativeFeedback
              onPress={() => {
                setselectedItem(data[index]);
                setshowModalEdit(true);
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 5,

                  backgroundColor: '#fff',
                  elevation: 5,
                  paddingHorizontal: 0.05 * screenWidth,
                  margin: 3,
                  borderRadius: 5,
                  borderColor: myColor.bgfb,
                  borderWidth: 1,
                  justifyContent: 'space-between',
                  paddingVertical: 10,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={[styles.textBarang, {color: myColor.fbtx}]}>{`${
                    index + 1
                  }. `}</Text>
                  <Text
                    style={[
                      styles.textBarang,
                      {width: 0.3 * screenWidth, color: myColor.fbtx},
                    ]}>{`${item.nama} `}</Text>
                  <Text
                    style={[
                      styles.textBarang,
                      {color: myColor.darkText},
                    ]}>{`${item.qty} buah =`}</Text>
                </View>
                <View>
                  <Text style={[styles.textBarang, {color: myColor.darkText}]}>
                    {`${formatRupiah(item.total.toString(), 'Rp')}`}
                  </Text>
                </View>

                {/* <Text>{`x ${JSON.stringify(x)}`}</Text> */}
              </View>
            </TouchableNativeFeedback>
            // <View style={{marginBottom: 10}}>
            //   <Text>{JSON.stringify(item)}</Text>
            // </View>
          );
        }}
      />
      <TouchableOpacity
        onPress={() => {
          setShowModalTambah(true);
        }}>
        <View
          style={{
            width: 0.8 * screenWidth,
            backgroundColor: myColor.addfacility,
            height: 40,
            marginHorizontal: 0.05 * screenWidth,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'OpenSans-SemiBold',
              fontSize: 14,
              color: '#fff',
            }}>
            Tambah Barang
          </Text>
        </View>
      </TouchableOpacity>

      {/* {data.map((x, i) => {
        return (
         
        );
      })} */}
    </View>
  );
};

export default BarangPenghuni;

const styles = StyleSheet.create({
  textBarang: {
    fontSize: 12,
    fontFamily: 'OpenSans-SemiBold',
  },
});
