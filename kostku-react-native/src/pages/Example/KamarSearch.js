import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  ScrollView,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Avatar} from 'react-native-paper';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const KamarSearch = () => {
  const [dataImage, setdataImage] = useState({
    image1: 'https://liquipedia.net/commons/images/b/bd/AdmiralBulldog.png',
  });

  const ifImgError = () => (
    <Image
      source={{
        uri: dataImage.image1,
      }}
      style={{width: 300, height: 200}}
      onError={(e) => {
        setdataImage({
          ...dataImage,
          image1:
            'https://pbs.twimg.com/profile_images/1000303810642837504/LQmBgJmU.jpg',
        });
      }}
    />
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.containerTop}>
        <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>
          Daftar Kamar
        </Text>
        <View style={styles.searchBar}>
          <FontAwesome
            name="search"
            color="#636e72"
            size={25}
            style={{marginRight: 10}}
          />
          <TextInput
            placeholder="Cari Kamar"
            style={{flex: 1, paddingLeft: 20}}
          />
        </View>
      </View>
      <View style={styles.containerBot}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            marginHorizontal: 20,
            justifyContent: 'space-between',
          }}>
          <View style={{width: 0.5 * screenWidth}}>
            <Text>Hasil Pencarian</Text>
          </View>
          <Text>14 Hasil</Text>
        </View>

        <View style={{flex: 1, paddingHorizontal: 20, marginTop: 10}}>
          <View
            style={{
              borderBottomWidth: 1,
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              flexDirection: 'row-reverse',
              paddingVertical: 20,
            }}>
            <View style={{alignItems: 'center'}}>
              <Avatar.Image
                source={{
                  uri:
                    'https://liquipedia.net/commons/images/b/bd/AdmiralBulldog.png',
                }}
                size={75}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={{marginRight: 5}}>
                <Text
                  style={{
                    color: '#636e72',
                    fontSize: 12,
                    fontWeight: 'bold',
                  }}>
                  Kamar
                </Text>
                <Text
                  style={{
                    color: '#636e72',
                    fontSize: 12,
                    fontWeight: 'bold',
                  }}>
                  Penghuni
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: '#636e72',
                    fontSize: 12,
                    fontWeight: 'bold',
                  }}>
                  : Kamar Putra 1
                </Text>
                <Text
                  style={{
                    color: '#636e72',
                    fontSize: 12,
                    fontWeight: 'bold',
                  }}>
                  : Imam Septian
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              borderBottomWidth: 1,
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              paddingVertical: 20,
              flexDirection: 'row-reverse',
            }}>
            <FontAwesome5 name="user-alt-slash" color="#636e72" size={60} />

            <View style={{flexDirection: 'row'}}>
              <View style={{marginRight: 5}}>
                <Text
                  style={{
                    color: '#636e72',
                    fontSize: 12,
                    fontWeight: 'bold',
                  }}>
                  Kamar
                </Text>
                <Text
                  style={{
                    color: '#636e72',
                    fontSize: 12,
                    fontWeight: 'bold',
                  }}>
                  Penghuni
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: '#636e72',
                    fontSize: 12,
                    fontWeight: 'bold',
                  }}>
                  : Kamar Putra 2
                </Text>
                <Text
                  style={{
                    color: '#636e72',
                    fontSize: 12,
                    fontWeight: 'bold',
                  }}>
                  : Kosong
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default KamarSearch;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  containerTop: {
    flex: 1,
    backgroundColor: '#46ce7c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerBot: {
    flex: 4,
  },
  searchBar: {
    width: 0.9 * screenWidth,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 0.9 * 0.25 * screenWidth,
    marginTop: 10,
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
});
