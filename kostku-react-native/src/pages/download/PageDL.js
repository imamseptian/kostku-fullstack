import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {Permission, PERMISSION_TYPE} from '../../AppPermission';
import {myAxios} from '../../function/MyAxios';
import {Picker} from '@react-native-picker/picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LaporanSVG from '../../asset/icon/LaporanSVG.svg';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import {
  myColor,
  screenHeight,
  screenWidth,
  APIUrl,
  startingYear,
  dataBulan,
  dataTahun,
} from '../../function/MyVar';

const PageDL = ({navigation}) => {
  const [isPressed, setisPressed] = useState(false);
  const dataRedux = useSelector((state) => state.AuthReducer);
  const [isLoading, setIsLoading] = useState(false);
  const [namaPDF, setnamaPDF] = useState('');
  const [selectedBulan, setselectedBulan] = useState(new Date().getMonth() + 1);
  const [selectedTahun, setselectedTahun] = useState(new Date().getFullYear());
  const [myTahun, setmyTahun] = useState(dataTahun());

  useEffect(() => {
    const source = axios.CancelToken.source();
    console.log('tttt');

    setIsLoading(true);
    myAxios.getAxios(
      APIUrl + '/api/namapdf/' + selectedBulan + '/' + selectedTahun,
      dataRedux.token,
      source.token,
      onGet,
    );
    function onGet(status, data) {
      if (status == 'success') {
        setIsLoading(false);
        // console.log(data);
        setnamaPDF(data.nama);
      } else if (status == 'cancel') {
        console.log('cancel API');
        setIsLoading(false);
      } else {
        console.log(data);
        setIsLoading(false);
      }
    }

    return () => {
      source.cancel('Component got unmounted');
      console.log('Download unmounted');
    };
  }, [selectedTahun, selectedBulan]);

  useEffect(() => {
    Permission.requestMultiple([PERMISSION_TYPE.photo, PERMISSION_TYPE.camera]);
  }, []);

  const downloadPDF = () => {
    RNFetchBlob.fetch('GET', APIUrl + '/api/mypdf')
      .then((res) => {
        let status = res.info().status;
        console.log(status);

        if (status == 200) {
          // the conversion is done in native code
          let base64Str = res.base64();
          // the following conversions are done in js, it's SYNC
          let text = res.text();
          let json = res.json();
        } else {
          // handle other status codes
        }
      })
      // Something went wrong:
      .catch((errorMessage, statusCode) => {
        // error handling
      });
  };

  const DLPDF = () => {
    setIsLoading(true);
    const {config, fs} = RNFetchBlob;
    let DownloadDir = fs.dirs.DownloadDir;
    let date = new Date();
    // let options = {
    //   fileCache: true,
    //   addAndroidDownloads: {
    //     //Related to the Android only
    //     useDownloadManager: true,
    //     notification: true,
    //     path:
    //       DownloadDir +
    //       '/image_' +
    //       Math.floor(date.getTime() + date.getSeconds() / 2) +
    //       '.jpg',
    //     description: 'Downloading file.',
    //   },
    // };
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true, //uses the device's native download manager.
        notification: true,
        // Title of download notification.
        path: DownloadDir + '/ ' + namaPDF + '.pdf', // this is the path where your download file will be in
        description: 'Downloading file.',
      },
    };

    config(options)
      .fetch('GET', `${APIUrl}/api/mypdf/${selectedBulan}/${selectedTahun}`, {
        Authorization: `Bearer ${dataRedux.token}`,
        // more headers  ..
      })
      .then((res) => {
        //Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        alert('File Downloaded Successfully.');
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        console.log(dataRedux.token);
        setIsLoading(false);
      });
  };

  return (
    // <View style={{flex: 1}}>
    //   <StatusBar translucent backgroundColor="transparent" />
    //   <View style={{paddingTop: StatusBar.currentHeight + 5}}>
    //     <Text>NamaPdf : {namaPDF}</Text>
    //     <Button title="AYAYA" onPress={() => DLImage()} />
    //     {/* <Button title="Next" onPress={() => navigation.push('PageOne')} /> */}
    //   </View>
    // </View>
    <View style={{flex: 1}}>
      <StatusBar translucent backgroundColor="transparent" />
      <Spinner
        visible={isLoading}
        textContent={'Tunggu Sebentar'}
        textStyle={{color: '#FFF'}}
      />
      <View
        style={{
          backgroundColor: myColor.colorTheme,
          alignItems: 'center',
          justifyContent: 'center',
          width: screenWidth,
          paddingTop: StatusBar.currentHeight + 10,
          paddingBottom: 10,
          position: 'relative',
        }}>
        <Text style={{fontSize: 14, fontWeight: 'bold', color: '#fff'}}>
          Cetak Laporan
        </Text>
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          style={{position: 'absolute', left: 5, bottom: 10}}>
          <MaterialIcons name="menu" color="#ffffff" size={25} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          marginTop: 10,
          flexDirection: 'row',
          width: screenWidth,
          justifyContent: 'center',
        }}>
        <View
          style={{
            height: 30,
            width: 150,
            elevation: 5,
            backgroundColor: 'white',
            borderRadius: 10,
          }}>
          <Picker
            selectedValue={selectedBulan}
            style={{height: 30}}
            onValueChange={(itemValue, itemIndex) => {
              if (itemValue != null) {
                setselectedBulan(itemValue);
              }
            }}>
            <Picker.Item label="Pilih Bulan" />
            {dataBulan.map((item, index) => {
              return (
                <Picker.Item key={index} label={item.nama} value={item.id} />
              );
            })}
          </Picker>
        </View>
        <View
          style={{
            marginLeft: 10,
            height: 30,
            width: 110,
            elevation: 5,
            backgroundColor: 'white',
            borderRadius: 10,
          }}>
          <Picker
            selectedValue={selectedTahun}
            style={{height: 30}}
            onValueChange={(itemValue, itemIndex) => {
              if (itemValue != null) {
                setselectedTahun(itemValue);
              }
            }}>
            <Picker.Item label="Pilih Tahun" />
            {myTahun.map((item, index) => {
              return (
                <Picker.Item
                  key={index}
                  label={item.id.toString()}
                  value={item.id}
                />
              );
            })}
          </Picker>
        </View>
      </View>
      <View style={{width: screenWidth, alignItems: 'center', marginTop: 40}}>
        <Text style={{fontWeight: 'bold', fontSize: 13, color: myColor.fbtx}}>
          {namaPDF}
        </Text>
        <LaporanSVG width={200} height={200} />

        <TouchableWithoutFeedback onPress={() => DLPDF()} disabled={isLoading}>
          <View
            style={{
              marginTop: 10,
              width: 0.5 * screenWidth,
              height: 50,
              borderRadius: 10,
              backgroundColor: myColor.myblue,
              elevation: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 14, fontWeight: 'bold', color: '#fff'}}>
              Download Laporan
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default PageDL;

const styles = StyleSheet.create({});
