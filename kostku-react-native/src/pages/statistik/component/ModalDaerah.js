import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from 'react-native';
import PenghuniSVG from '../../../asset/image/penghuni.svg';
import {
  myColor,
  screenHeight,
  screenWidth,
  APIUrl,
} from '../../../function/MyVar';
import axios from 'axios';
import {ModalItemPenghuni} from '../atom';

const ModalDaerah = ({data, closeModal, daerah, token, ...rest}) => {
  const [datapenghuni, setdatapenghuni] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [judul, setjudul] = useState('');

  useEffect(() => {
    setisLoading(true);
    // alert();
    // console.log(typeof [0, 3, 4, 5, 2]);

    if (typeof data.id === 'string') {
      // axios
      //   .get(
      //     `https://dev.farizdotid.com/api/daerahindonesia/${daerah}/${data[daerah]}`,
      //   )
      //   .then((res) => {
      //     console.log(res.data.nama);
      //     setjudul(res.data.nama);
      //     // alert(res.data);
      //     // alert('asu');
      //   });
      setjudul(data.nama);
      axios
        .post(
          APIUrl + '/api/filter_penghuni',
          {
            id_kost: 1,
            // kelamin: data.kelamin,
            [daerah]: data.id,
            multi: false,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((res) => {
          // console.log(res.data);
          setdatapenghuni(res.data.data);
          setisLoading(false);
          // setdatapenghuni(res.data.data);
          // // console.log(res.data.data);
          // // alert('ayaya');
          // setisLoading(false);
        });
    } else {
      setjudul('Daerah Lain');
      axios
        .post(
          APIUrl + '/api/filter_penghuni',
          {
            id_kost: 1,
            // kelamin: data.kelamin,
            [daerah]: data.id,
            multi: true,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((res) => {
          console.log(res.data);
          // alert(data[daerah]);
          // alert(data.id);
          setdatapenghuni(res.data.data);
          setisLoading(false);
          // setdatapenghuni(res.data.data);
          // // console.log(res.data.data);
          // // alert('ayaya');
          // setisLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [data]);

  return (
    <View
      style={{
        paddingBottom: 10,
        width: screenWidth * 0.88,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 5,
        backgroundColor: 'white',
        elevation: 5,
        paddingHorizontal: 0.03 * screenWidth,
        paddingTop: 5,
        maxHeight: '90%',
      }}>
      <View
        style={{
          position: 'relative',
          paddingBottom: 5,
          borderBottomWidth: 1,
          borderBottomColor: myColor.divider,
        }}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'OpenSans-Bold',
            color: myColor.fbtx,
            textTransform: 'capitalize',
          }}>
          {judul}
          {/* {JSON.stringify(data)} */}
          {/* {(() => {
            if (data.kelamin == 1) {
              return 'Wanita';
            } else {
              return 'Pria';
            }
          })()} */}
        </Text>
        <Text
          style={{
            marginTop: 10,
            fontSize: 16,
            fontFamily: 'OpenSans-Bold',
            color: myColor.fbtx,
          }}>
          {data.quantity} Orang
        </Text>
        <View style={{position: 'absolute', top: 0, right: 0}}>
          <PenghuniSVG width={50} height={50} />
        </View>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color={myColor.colorTheme} />
      ) : (
        // <ListPenghuni />
        <FlatList
          data={datapenghuni}
          keyExtractor={(item) => item.id.toString()}
          // extraData={selectedId}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index, separator}) => {
            return <ModalItemPenghuni data={item} />;
          }}
        />
      )}

      <TouchableOpacity onPress={closeModal}>
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 10,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
            borderWidth: 1,
          }}>
          <Text
            style={{
              fontSize: 14,
              color: myColor.fbtx,
              fontFamily: 'OpenSans-Bold',
            }}>
            Tutup
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ModalDaerah;

const styles = StyleSheet.create({});
