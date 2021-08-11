import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {SharedElement} from 'react-navigation-shared-element';
import OptionsMenu from 'react-native-option-menu';
import Feather from 'react-native-vector-icons/Feather';
import {
  APIUrl,
  defaultAsset,
  formatRupiah,
  myColor,
} from '../../../function/MyVar';

const ItemKamar = (props) => {
  const [errorImage, seterrorImage] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => {
        props.onPress(props.data.id);
      }}>
      <View style={styles.item}>
        <Image
          style={{
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            height: 100,
            width: 120,
          }}
          source={{
            uri: errorImage
              ? defaultAsset.kelas_kamar
              : APIUrl + '/storage/images/kelas/' + props.kelas.foto,
          }}
          onError={() => {
            // seturiImage(defaultAsset.kelas_kamar);
            seterrorImage(true);
          }}
          resizeMode="stretch"
        />

        <View
          style={{
            marginLeft: 20,
            flex: 1,
          }}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'OpenSans-SemiBold',
              color: myColor.fbtx,
            }}>
            {props.data.nama}
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontFamily: 'OpenSans-Regular',
              color: myColor.fbtx,
              marginTop: 5,
            }}>
            Kapasitas {`${props.isi}/${props.kelas.kapasitas}`}
          </Text>

          {/* <Text
            style={{
              fontSize: 12,
              fontFamily: 'OpenSans-Regular',
              marginTop: 5,
              color: myColor.darkText,
            }}>
            {formatRupiah(props.data.harga.toString(), 'Rp.')}
          </Text> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemKamar;

const styles = StyleSheet.create({
  item: {
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 100,
    position: 'relative',
    borderWidth: 1,
    borderColor: myColor.divider,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
