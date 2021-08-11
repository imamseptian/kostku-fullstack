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

const ItemKelas = (props) => {
  const [errorImage, seterrorImage] = useState(false);
  const [uriImage, seturiImage] = useState(
    // APIUrl + '/kostdata/kelas_kamar/foto/' + props.data.foto,
    defaultAsset.kelas_kamar,
  );

  return (
    <TouchableOpacity
      onPress={props.onPress}
      // onLongPress={() =>
      //   console.log(APIUrl + '/kostdata/kelas_kamar/foto/' + props.data.foto)
      // }
      // onPress={() => {
      //   console.log(APIUrl + '/kostdata/kelas_kamar/foto/' + props.data.foto);
      // }}
    >
      <View style={styles.item}>
        {/* <SharedElement id={`item.${props.data.id}.foto_kamar`}> */}
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
              : APIUrl + '/storage/images/kelas/' + props.data.foto,
          }}
          onError={() => {
            // seturiImage(defaultAsset.kelas_kamar);
            seterrorImage(true);
          }}
          resizeMode="stretch"
        />
        {/* </SharedElement> */}

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
              marginTop: 5,
              color: myColor.darkText,
            }}>
            {formatRupiah(props.data.harga.toString(), 'Rp.')}
          </Text>
        </View>
        {/* <View style={{position: 'absolute', top: 0, right: 0}}> */}

        {/* </View> */}

        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            position: 'absolute',
            bottom: 2,
            right: 8,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{width: 20}}>
              <FontAwesome5 name="door-closed" color={myColor.fbtx} size={12} />
            </View>
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'OpenSans-Bold',
              }}>
              {props.data.banyak}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 20,
            }}>
            <View style={{width: 20}}>
              <FontAwesome5 name="user-alt" color={myColor.fbtx} size={12} />
            </View>
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'OpenSans-Bold',
              }}>
              {props.data.penghuni}
            </Text>
          </View>
        </View> */}
      </View>
    </TouchableOpacity>
  );
};

export default ItemKelas;

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
