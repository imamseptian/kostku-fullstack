import React, {useState, useEffect} from 'react';
import {
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {MiniHeader, PureModal} from '../../components';
import {myColor, formatRupiah} from '../../function/MyVar';
import {ChartPendapatan, ChartPenghuni} from './';
import {
  MyLineChart,
  ModalPendapatan,
  ModalPengeluaran,
  MyPieChart,
  ModalPenghuni,
  MyRandomPieChart,
} from './component';
import axios from 'axios';

const MainStatistik = () => {
  const [dataProvinsi, setdataProvinsi] = useState([]);
  // var page
  const [showModalPendapatan, setShowModalPendapatan] = useState(false);
  const [showModalPengeluaran, setShowModalPengeluaran] = useState(false);
  const [showModalPenghuni, setShowModalPenghuni] = useState(false);

  // var chart pendapatan
  // const dataPendapatan = [3000000, 500000, 5000000, 300000, 7000000];
  const [datapendapatan, setdatapendapatan] = useState([]);
  const [linePendapatan, setlinePendapatan] = useState([]);
  // const [labelpendapatan, setlabelpendapatan] = useState([]);
  // const bulanPendapatan = ['Sept', 'Okt', 'Nov', 'Desc', 'Jan'];
  const [selectedDotPendapatan, setSelectedDotPendapatan] = useState(0);

  // var chart pengeluaran
  // const dataPengeluaran = [100000, 100000, 300000, 150000, 100000];
  // const bulanPengeluaran = ['Sept', 'Okt', 'Nov', 'Desc', 'Jan'];
  const [dataPengeluaran, setdataPengeluaran] = useState([]);
  const [linePengeluaran, setlinePengeluaran] = useState([]);
  const [selectedDotPengeluaran, setSelectedDotPengeluaran] = useState(0);

  // var chart pengeluaran
  // const pieData = [50, 10];
  const [pieData, setpieData] = useState([]);
  const pieColor = [myColor.myblue, myColor.colorTheme];
  const [selectedPiePenghuni, setSelectedPiePenghuni] = useState(0);

  const [showModalProvinsi, setshowModalProvinsi] = useState(false);
  const [pieProvinsi, setpieProvinsi] = useState([]);
  const [selectedPieProvinsi, setselectedPieProvinsi] = useState(0);
  const [colorProv, setcolorProv] = useState([]);
  // const pieData = [
  //   {id: 0, label: 'Pria', color: myColor.myblue, value: 50},
  //   {id: 1, label: 'Wanita', color: myColor.colorTheme, value: 40},
  // ];
  // const pieColor = [myColor.myblue, myColor.colorTheme];

  const randomColor = () =>
    ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(
      0,
      7,
    );

  useEffect(() => {
    axios
      .post('https://dry-forest-53707.herokuapp.com/api/statistik_pie', {
        id_kost: 1,
      })
      .then((res) => {
        setpieData(res.data.penghuni);
        setpieProvinsi(res.data.provinsi);
        console.log(res.data.provinsi);
      });

    // axios
    //   .get('http://dev.farizdotid.com/api/daerahindonesia/provinsi')
    //   .then((res) => {
    //     // setdataProvinsi(res.data)
    //     console.log(res.data);
    //   });

    axios
      .post('https://dry-forest-53707.herokuapp.com/api/chart_keuangan', {
        jenis: 1,
        id_kost: 1,
      })
      .then((res) => {
        setdatapendapatan(res.data.pendapatan);
        // setlabelpendapatan(res.data.label);
      });

    axios
      .post('https://dry-forest-53707.herokuapp.com/api/chart_keuangan', {
        jenis: 2,
        id_kost: 1,
      })
      .then((res) => {
        setdataPengeluaran(res.data.pendapatan);
        // setlabelpendapatan(res.data.label);
      });
  }, []);

  useEffect(() => {
    let temp_data = [];
    datapendapatan.forEach((value, index) => {
      // console.log(value.label);
      temp_data.push(value.value);
    });

    setlinePendapatan(temp_data);
  }, [datapendapatan]);

  useEffect(() => {
    let tempArr = [];
    pieProvinsi.map((item, index) => {
      tempArr.push(randomColor());
    });
    setcolorProv(tempArr);
  }, [pieProvinsi]);

  useEffect(() => {
    let temp_data = [];
    dataPengeluaran.forEach((value, index) => {
      // console.log(value.label);
      temp_data.push(value.value);
    });

    setlinePengeluaran(temp_data);
  }, [dataPengeluaran]);

  return (
    <View style={{flex: 1}}>
      <StatusBar translucent backgroundColor="transparent" />
      <Modal
        visible={showModalPendapatan}
        transparent={true}
        onRequestClose={() => setShowModalPendapatan(false)}>
        <PureModal>
          <ModalPendapatan
            data={datapendapatan[selectedDotPendapatan]}
            closeModal={() => setShowModalPendapatan(false)}
          />
        </PureModal>
      </Modal>

      <Modal
        visible={showModalPengeluaran}
        transparent={true}
        onRequestClose={() => setShowModalPengeluaran(false)}>
        <PureModal>
          <ModalPengeluaran
            data={dataPengeluaran[selectedDotPengeluaran]}
            closeModal={() => setShowModalPengeluaran(false)}
          />
        </PureModal>
      </Modal>

      <Modal
        visible={showModalPenghuni}
        transparent={true}
        onRequestClose={() => setShowModalPenghuni(false)}>
        <PureModal>
          <ModalPenghuni
            closeModal={() => setShowModalPenghuni(false)}
            title={(() => {
              if (pieData.length > 0) {
                if (pieData[selectedPiePenghuni].kelamin == 1) {
                  return 'Wanita';
                } else {
                  return 'Pria';
                }
              } else {
                return 'Wanita';
              }
            })()}
            data={pieData[selectedPiePenghuni]}
            keyword={'kelamin'}
          />
        </PureModal>
      </Modal>

      <Modal
        visible={showModalProvinsi}
        transparent={true}
        onRequestClose={() => setshowModalProvinsi(false)}>
        <PureModal>
          <ModalPenghuni
            closeModal={() => setshowModalProvinsi(false)}
            title={(() => {
              if (pieProvinsi.length > 0) {
                return pieProvinsi[selectedPieProvinsi].provinsi;
              } else {
                return '1';
              }
            })()}
            data={pieProvinsi[selectedPieProvinsi]}
            keyword={'provinsi'}
          />
        </PureModal>
      </Modal>

      <MiniHeader title="Statistik Kost" />
      <ScrollView showsVerticalScrollIndicator={false} style={{paddingTop: 10}}>
        <MyLineChart
          data={datapendapatan}
          // x_axis={labelpendapatan}
          graphLine={linePendapatan}
          onDotPress={(v) => {
            setSelectedDotPendapatan(v);
            setShowModalPendapatan(true);
          }}
          selectedDot={selectedDotPendapatan}>
          <Text style={{fontSize: 14, fontFamily: 'OpenSans-Bold'}}>
            Statistik Pendapatan
          </Text>
        </MyLineChart>

        <MyLineChart
          data={dataPengeluaran}
          // x_axis={labelpendapatan}
          graphLine={linePengeluaran}
          onDotPress={(v) => {
            setSelectedDotPengeluaran(v);
            setShowModalPengeluaran(true);
          }}
          selectedDot={selectedDotPengeluaran}>
          <Text style={{fontSize: 14, fontFamily: 'OpenSans-Bold'}}>
            Statistik Pengeluaran
          </Text>
        </MyLineChart>

        {/* <MyLineChart
          data={dataPendapatan}
          x_axis={bulanPendapatan}
          onDotPress={(v) => {
            setSelectedDot(v);
            setShowModalPendapatan(true);
          }}
          selectedDot={selectedDot}>
          <Text style={{fontSize: 14, fontFamily: 'OpenSans-Bold'}}>
            Statistik Pendapatan
          </Text>
        </MyLineChart> */}

        {/* <MyLineChart
          data={dataPengeluaran}
          x_axis={bulanPengeluaran}
          onDotPress={(v) => {
            setSelectedDotPengeluaran(v);
            setShowModalPengeluaran(true);
          }}
          selectedDot={selectedDotPengeluaran}>
          <Text style={{fontSize: 14, fontFamily: 'OpenSans-Bold'}}>
            Statistik Pengeluaran
          </Text>
        </MyLineChart> */}

        <MyPieChart
          data={pieData}
          colorData={pieColor}
          onPiePress={(v) => {
            setSelectedPiePenghuni(v);
            setShowModalPenghuni(true);
          }}
          selectedPie={selectedPiePenghuni}
        />

        <MyRandomPieChart
          data={pieProvinsi}
          colorData={colorProv}
          onPiePress={(v) => {
            setselectedPieProvinsi(v);
            setshowModalProvinsi(true);
            // alert(v);
          }}
          selectedPie={selectedPieProvinsi}
        />

        {/* <ChartPendapatan
          dataBulan={dataBulan}
          dataPendapatan={data}
          selectedPoint={selectedPoint}
          dotFunction={(v) => {
            setselectedPoint(v);
          }}
          popModal={(v) => setshowModal(v)}>
          <Text style={{fontSize: 14, fontFamily: 'OpenSans-SemiBold'}}>
            Statistik Pendapatan
          </Text>
        </ChartPendapatan>

        <ChartPendapatan
          dataBulan={dataBulan}
          dataPendapatan={data}
          selectedPoint={selectedPoint}
          dotFunction={(v) => {
            setselectedPoint(v);
          }}>
          <Text style={{fontSize: 14, fontFamily: 'OpenSans-SemiBold'}}>
            Statistik Pengeluaran
          </Text>
        </ChartPendapatan>

        <ChartPenghuni dataPie={pieData} colorPie={pieColor} /> */}
      </ScrollView>
    </View>
  );
};

export default MainStatistik;

const styles = StyleSheet.create({});
