import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {FlatListDalamKamar, HeaderPage, PureModal} from '../../components';
import {myColor, APIUrl} from '../../function/MyVar';
import ImageViewer from 'react-native-image-zoom-viewer';
import Modal from 'react-native-translucent-modal';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const DetailKamar = ({navigation, route}) => {
  const {item} = route.params;
  const images = [
    {
      url: APIUrl + '/storage/images/kelas/' + route.params.foto,

      props: {
        // headers: ...
      },
    },
  ];
  const [showImg, setshowImg] = useState(false);
  return (
    <View style={{flex: 1, backgroundColor: '#f6f6f6'}}>
      <StatusBar translucent backgroundColor="transparent" />
      <Modal
        visible={showImg}
        transparent={true}
        onRequestClose={() => setshowImg(false)}>
        <ImageViewer
          imageUrls={images}
          enableSwipeDown={true}
          onSwipeDown={() => setshowImg(false)}
        />
      </Modal>

      <TouchableNativeFeedback
        onPress={() => {
          setshowImg(true);
        }}>
        <Image
          source={{
            uri: APIUrl + '/storage/images/kelas/' + route.params.foto,
          }}
          style={{height: (2 / 3) * screenWidth, width: screenWidth}}
        />
      </TouchableNativeFeedback>
      <View
        style={{
          flex: 1,
          paddingTop: 10,
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'OpenSans-Bold',
            fontSize: 24,
            color: myColor.blackText,
          }}>
          {item.nama}
        </Text>

        <Text
          style={{
            fontFamily: 'OpenSans-Bold',
            fontSize: 14,
            marginTop: 10,
            color: myColor.blackText,
            marginLeft: 15,
          }}>
          Penghuni :
        </Text>

        <ScrollView style={{paddingHorizontal: 15}}>
          {/* <Text>{JSON.stringify(item)}</Text> */}
          {item.penghuni.map((item, index) => {
            return (
              <FlatListDalamKamar
                key={index}
                data={item}
                tanggal={new Date(item.tanggal_masuk)}
                onPress={() => {
                  navigation.navigate('PenghuniStackScreen', {
                    screen: 'ProfilPenghuni',
                    params: {
                      item: item,
                    },
                  });
                }}
              />
            );
          })}
          {/* <FlatListDalamKamar />
          <FlatListDalamKamar />
          <FlatListDalamKamar />
          <FlatListDalamKamar />
          <FlatListDalamKamar /> */}
        </ScrollView>
      </View>

      {/* <TouchableNativeFeedback>
        <View
          style={{
            backgroundColor: myColor.alert,
            height: 50,
            width: 50,
            borderRadius: 25,
            position: 'absolute',
            top: (2 / 3) * screenWidth - 25,
            right: 0.08 * screenWidth,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 5,
          }}>
          <FontAwesome name="pencil" color="#fff" size={20} />
        </View>
      </TouchableNativeFeedback> */}
    </View>
  );
};

export default DetailKamar;

const styles = StyleSheet.create({});
