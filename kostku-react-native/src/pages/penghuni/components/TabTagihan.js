import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {
  myColor,
  defaultAsset,
  screenWidth,
  dataBulan,
  APIUrl,
} from '../../../function/MyVar';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import {myAxios} from '../../../function/MyAxios';
import {useSelector} from 'react-redux';
import {CardTagihan} from '../atoms';
import {Transition, Transitioning} from 'react-native-reanimated';
const TabTagihan = (props) => {
  const [dataTagihan, setdataTagihan] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(null);

  const dataRedux = useSelector((state) => state.AuthReducer);

  useEffect(() => {
    const source = axios.CancelToken.source();
    myAxios.getAxios(
      APIUrl + '/api/gettagihan/' + props.id_penghuni,
      dataRedux.token,
      source.token,
      onGet,
    );
    function onGet(status, data) {
      if (status == 'success') {
        setdataTagihan(data.tagihan);
      } else if (status == 'cancel') {
        console.log('caught cancel filter');
      } else {
        // console.log(data);
        console.log('ERROR PENGHUNI TAGIHAN');
        // setIsLoading(false);
      }
    }

    return () => {
      source.cancel('Component got unmounted');
      console.log('Tagihan unmounted');
    };
  }, [props.id_penghuni]);

  return (
    <View
      style={{
        width: props.lebar,
        paddingHorizontal: 10,
        paddingTop: 20,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 5,
        }}>
        <Text style={{fontFamily: 'OpenSans-SemiBold', fontSize: 12}}>
          Tagihan Aktif
        </Text>
        <Text style={{fontFamily: 'OpenSans-SemiBold', fontSize: 12}}>
          {dataTagihan.length} Tagihan
        </Text>
      </View>
      {dataTagihan.map((x, i) => {
        return (
          <CardTagihan
            key={i}
            data={x}
            index={i}
            onPress={() => {
              // alert(i);
              setCurrentIndex(i === currentIndex ? null : i);
            }}
            currentIndex={currentIndex}
          />
        );
      })}

      {/* <Text>{JSON.stringify(dataTagihan)}</Text> */}
    </View>
  );
};

export default TabTagihan;

const styles = StyleSheet.create({
  wrapperCard: {
    paddingVertical: 15,

    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    position: 'relative',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: myColor.divider,
  },
  wrapperTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: -20,
    left: 10,
  },
  image: {height: 150, borderRadius: 10},
});
