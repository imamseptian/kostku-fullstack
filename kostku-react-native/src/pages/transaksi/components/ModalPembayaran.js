import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import {
  myColor,
  screenWidth,
  screenHeight,
  formatRupiah,
  APIUrl,
} from '../../../function/MyVar';
import axios from 'axios';
import {myAxios} from '../../../function/MyAxios';
import {useSelector} from 'react-redux';
import {AccordionComponent} from '../../CobaDate';
import {Transition, Transitioning} from 'react-native-reanimated';
import data from './data';
import {AccordionPembayaran} from '../atoms';

const ModalPembayaran = (props) => {
  const [total, settotal] = useState(0);
  const dataRedux = useSelector((state) => state.AuthReducer);

  const [currentIndex, setCurrentIndex] = useState(null);
  const ref = React.useRef();

  useEffect(() => {
    let tempTotal = 0;
    props.data.forEach((x, i) => {
      if (x.selected) {
        tempTotal = tempTotal + parseInt(x.jumlah);
      }
      // tempList.push(formatRupiah('0', 'Rp. '));
    });
    settotal(tempTotal);
  }, [props.data]);

  const transition = (
    <Transition.Together>
      <Transition.In type="fade" durationMs={200} />
      <Transition.Change />
      <Transition.Out type="fade" durationMs={200} />
    </Transition.Together>
  );

  const catatTransaksi = () => {
    let arrBayar = [];
    props.data.forEach((x, i) => {
      if (x.selected) {
        arrBayar.push(x);
      }
      // tempList.push(formatRupiah('0', 'Rp. '));
    });

    axios
      .post(APIUrl + '/api/catattransaksi', {
        data_bayar: arrBayar,
        id_kost: dataRedux.user.kostku,
        id_penghuni: props.penghuni.id,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.code == 200) {
          alert('sukses');
          props.refreshData();
          props.closeModal();
          props.setPenghuni(res.data.penghuni);
        } else {
          alert('aaaaa');
        }
      })
      .catch((error) => {
        alert('error catat');
        console.log(arrBayar);
        console.log(dataRedux.user.kostku);
        console.log(props.penghuni.id);
      });

    // alert(nominalBayar);
    // const source = axios.CancelToken.source();
    // if (penghuni !== undefined) {
    //   myAxios.postAxios(
    //     APIUrl + '/api/bayartagihan',
    //     {
    //       bayar: nominalBayar,
    //       id_penghuni: penghuni.id,
    //       perbulan: penghuni.harga_kamar,
    //       id_kost: dataRedux.user.kostku,
    //     },
    //     dataRedux.token,
    //     source.token,
    //     onPost,
    //   );
    //   function onPost(status, data) {
    //     if (status == 'success') {
    //       alert('Pembayaran Sukses');
    //       setshowModalBayar(false);
    //       console.log('pembayaran sukses' + penghuni);
    //       console.log(penghuni);
    //       refreshPenghuni();
    //     } else if (status == 'cancel') {
    //       console.log('caught cancel filter');
    //     } else {
    //       console.log(data);
    //     }
    //   }
    // }
  };
  return (
    <Transitioning.View
      ref={ref}
      transition={transition}
      style={{
        backgroundColor: '#f6f6f6',
        width: 0.9 * screenWidth,
        maxHeight: '90%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: screenWidth * 0.03,
      }}>
      <Text style={styles.modalTitle}>Bayar Tagihan</Text>
      <ScrollView>
        {props.data.map((item, index) => {
          if (item.selected) {
            return (
              <AccordionPembayaran
                key={index}
                data={item}
                index={index}
                onPress={() => {
                  ref.current.animateNextTransition();
                  setCurrentIndex(index === currentIndex ? null : index);
                }}
                currentIndex={currentIndex}
              />
            );
          }
        })}
      </ScrollView>
      <View style={styles.summaryLine}>
        <Text style={styles.plusSign}>+</Text>
      </View>
      <View style={styles.lineTotal}>
        <Text style={styles.totalText}>Total</Text>
        <Text style={[styles.totalText, {color: myColor.grayGoogle}]}>
          {formatRupiah(total.toString(), 'Rp. ')}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          catatTransaksi();
        }}>
        <View
          style={[styles.actionButton, {backgroundColor: myColor.addfacility}]}>
          <Text style={styles.textButton}>Catat Transaksi</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          props.closeModal();
        }}>
        <View style={styles.actionButton}>
          <Text style={styles.textButton}>Tutup</Text>
        </View>
      </TouchableOpacity>
    </Transitioning.View>
  );
};

export default ModalPembayaran;

const styles = StyleSheet.create({
  modalTitle: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },

  plusSign: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
    color: myColor.fbtx,
  },
  summaryLine: {
    flexDirection: 'row-reverse',
    borderBottomWidth: 1,
    borderBottomColor: myColor.fbtx,
    marginBottom: 10,
  },
  actionButton: {
    height: 40,
    backgroundColor: myColor.alert,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  textButton: {
    fontFamily: 'OpenSans-SemiBold',
    color: '#ffffff',
    fontSize: 14,
  },
  lineTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  totalText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 14,
    color: myColor.fbtx,
  },
});
