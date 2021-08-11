import React, {useState, useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {StyleSheet, Text, View, ScrollView, Dimensions} from 'react-native';
import {KostPenghuniChart, ModalPenghuni, ModalTransaksi} from './component';
import axios from 'axios';
import {myColor, formatRupiah, APIUrl} from '../../function/MyVar';
import {FlatListPendaftar, MiniHeader, PureModal} from '../../components';
import {PieSection, TestPie, GraphSection} from './';
import {HeaderTheme} from '../../components';
import {useSelector} from 'react-redux';
import Modal from 'react-native-translucent-modal';

const screenWidth = Math.round(Dimensions.get('window').width);
const KostStatistik = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const dataRedux = useSelector((state) => state.AuthReducer);

  const [isLoading, setisLoading] = useState(false);
  const [lebar, setlebar] = useState(screenWidth);
  // const dataPendapatan = [3000000, 500000, 5000000, 300000, 7000000];
  const [dataPendapatan, setdataPendapatan] = useState([]);
  const [linePendapatan, setlinePendapatan] = useState([]);
  const [selectedDotPendapatan, setSelectedDotPendapatan] = useState(null);
  const [showModalPendapatan, setshowModalPendapatan] = useState(false);

  const [dataPengeluaran, setdataPengeluaran] = useState([]);
  const [linePengeluaran, setlinePengeluaran] = useState([]);
  const [selectedDotPengeluaran, setSelectedDotPengeluaran] = useState(null);
  const [showModalPengeluaran, setshowModalPengeluaran] = useState(false);

  const setterChart = (retData, callback1, callback2, callback3) => {
    let tempArr = [];
    retData.forEach((x, i) => {
      tempArr.push(parseInt(x.value));
    });
    callback1(retData);
    callback2(tempArr);
    if (retData.length > 0) {
      callback3(0);
    }
  };

  useEffect(() => {
    if (isFocused) {
      setisLoading(true);
      axios
        .get(APIUrl + '/api/chart_keuangan/' + dataRedux.user.kostku, {
          headers: {
            Authorization: `Bearer ${dataRedux.token}`,
          },
        })
        .then((res) => {
          setterChart(
            res.data.pendapatan,
            setdataPendapatan,
            setlinePendapatan,
            setSelectedDotPendapatan,
          );
          setterChart(
            res.data.pengeluaran,
            setdataPengeluaran,
            setlinePengeluaran,
            setSelectedDotPengeluaran,
          );
          setisLoading(false);

          // setlabelpendapatan(res.data.label);
        })
        .catch((error) => {
          console.log(error);
          // alert(dataRedux.user.kostku);
          // alert('error chart keuangan');
          setisLoading(false);
        });
    }
  }, [isFocused]);

  return (
    <View
      onLayout={(event) => {
        const {x, y, width, height} = event.nativeEvent.layout;
        // console.log(width, width);
        setlebar(width);

        // do something here like set your initial animated value for the height
      }}>
      <HeaderTheme
        openDrawer={() => navigation.toggleDrawer()}
        title="Statistik Kost"
      />

      <Modal
        visible={showModalPendapatan}
        transparent={true}
        onRequestClose={() => setshowModalPendapatan(false)}>
        <PureModal>
          <ModalTransaksi
            lebar={lebar}
            data={dataPendapatan[selectedDotPendapatan]}
            jenis={1}
            token={dataRedux.token}
            closeModal={() => {
              setshowModalPendapatan(false);
            }}
          />
        </PureModal>
      </Modal>

      <Modal
        visible={showModalPengeluaran}
        transparent={true}
        onRequestClose={() => setshowModalPengeluaran(false)}>
        <PureModal>
          <ModalTransaksi
            lebar={lebar}
            data={dataPengeluaran[selectedDotPengeluaran]}
            jenis={2}
            token={dataRedux.token}
            closeModal={() => {
              setshowModalPengeluaran(false);
            }}
          />
        </PureModal>
      </Modal>

      {/*         
        <Text>{JSON.stringify(dataPendapatan)}</Text>
        <Text>{JSON.stringify(linePendapatan)}</Text> */}
      {/* <PieSection /> */}
      {/* <GraphSection /> */}
      <ScrollView style={{paddingVertical: 10}}>
        {/* <Text>{JSON.stringify(dataPendapatan)}</Text> */}
        <GraphSection
          isLoading={isLoading}
          data={dataPendapatan}
          // x_axis={labelpendapatan}
          graphLine={linePendapatan}
          // graphLine={[80000]}
          onDotPress={(v) => {
            setSelectedDotPendapatan(v);
            setshowModalPendapatan(true);
            // alert(v);
            // setShowModalPendapatan(true);
          }}
          selectedDot={selectedDotPendapatan}>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 14, fontFamily: 'OpenSans-Bold'}}>
              Statistik Pendapatan
            </Text>
            {dataPendapatan.length < 1 && (
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'OpenSans-Regular',
                  marginTop: 10,
                }}>
                Anda Belum Memiliki Data Riwayat Pendapatan
              </Text>
            )}
          </View>
        </GraphSection>

        <GraphSection
          isLoading={isLoading}
          data={dataPengeluaran}
          // x_axis={labelpendapatan}
          graphLine={linePengeluaran}
          onDotPress={(v) => {
            setSelectedDotPengeluaran(v);
            setshowModalPengeluaran(true);
            // alert(v);
            // setShowModalPendapatan(true);
          }}
          selectedDot={selectedDotPengeluaran}>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 14, fontFamily: 'OpenSans-Bold'}}>
              Statistik Pengeluaran
            </Text>
            {dataPengeluaran.length < 1 && (
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'OpenSans-Regular',
                  marginTop: 10,
                }}>
                Anda Belum Memiliki Data Riwayat Pengeluaran
              </Text>
            )}
          </View>
        </GraphSection>
        <PieSection id_kost={dataRedux.user.kostku} token={dataRedux.token} />

        <View style={{height: 100}}></View>

        {/* <TestPie /> */}
      </ScrollView>
    </View>
  );
};

export default KostStatistik;

const styles = StyleSheet.create({});
