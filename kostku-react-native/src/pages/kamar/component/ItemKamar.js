import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableNativeFeedback,
} from 'react-native';
import {myColor, APIUrl} from '../../../function/MyVar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import OptionsMenu from 'react-native-option-menu';
import Feather from 'react-native-vector-icons/Feather';

const screenWidth = Dimensions.get('window').width;

const ItemKamar = (props) => {
  // const [status, setstatus] = useState(0);
  // const [kamar, setKamar] = useState(props.item);

  const hapusKamar = () => {
    props.hapusKamar(props.item.id);
  };

  const editKamar = () => {
    props.editKamar(props.item);
  };

  return (
    <TouchableNativeFeedback onPress={props.onPress}>
      <View
        style={{
          marginBottom: 20,

          backgroundColor: 'white',
          borderWidth: 1,
          borderColor: myColor.divider,
          borderRadius: 10,
        }}>
        <View
          style={{
            minHeight: 100,
            flexDirection: 'row',
          }}>
          <Image
            style={{
              height: 100,
              width: 100,
              borderTopLeftRadius: 10,
              // backgroundColor: 'yellow',
            }}
            source={{
              uri: APIUrl + '/storage/images/kelas/' + props.foto,
            }}
          />
          {/* <View
            style={{
              flex: 1,
              padding: 10,
              position: 'relative',
              justifyContent: 'center',
            }}> */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 10,
              justifyContent: 'space-between',
              flex: 1,
            }}>
            <View>
              <Text
                numberOfLines={1}
                style={{
                  maxWidth: 0.9 * screenWidth - 130,
                  fontSize: 14,
                  fontFamily: 'OpenSans-Bold',
                  color: myColor.fbtx,
                  marginBottom: 3,
                }}>
                {props.item.nama}
                {/* {props.item.id} */}
              </Text>

              <Text
                numberOfLines={1}
                style={{
                  maxWidth: 0.9 * screenWidth - 130,
                  fontSize: 12,
                  fontFamily: 'OpenSans-SemiBold',
                  color: myColor.darkText,
                }}>
                Kapasitas : {props.item.penghuni.length}/{props.item.kapasitas}
              </Text>
            </View>
            <OptionsMenu
              customButton={
                <Feather name="more-vertical" size={25} color="#900" />
              }
              destructiveIndex={1}
              options={['EditKamar', 'Hapus Kelas', 'Batal']}
              actions={[editKamar, hapusKamar]}
            />
          </View>

          {/* <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                position: 'absolute',
                bottom: 5,
                right: 0,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'OpenSans-Regular',
                  color: myColor.darkText,
                }}>
                Detail
              </Text>
              <MaterialIcons
                name="navigate-next"
                style={{marginRight: -13}}
                color={myColor.darkText}
                size={20}
              />
              <MaterialIcons
                name="navigate-next"
                style={{marginRight: -13}}
                color={myColor.darkText}
                size={20}
              />
              <MaterialIcons
                name="navigate-next"
                color={myColor.darkText}
                size={20}
              />
            </View> */}
          {/* </View> */}
        </View>
        <View
          style={{
            height: 50,
            borderTopWidth: 1.5,
            borderTopColor: myColor.darkText,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          {props.item.penghuni.length >= props.item.kapasitas ? (
            <View
              style={[styles.tagKapasitas, {backgroundColor: myColor.alert}]}>
              <Text style={[styles.tagText, {color: '#fff'}]}>Penuh</Text>
            </View>
          ) : (
            <View
              style={[styles.tagKapasitas, {backgroundColor: myColor.success}]}>
              <Text style={[styles.tagText, {color: myColor.fbtx}]}>
                Tersedia
              </Text>
            </View>
          )}

          <View
            style={{
              marginLeft: 10,
              flexDirection: 'row-reverse',
            }}>
            {props.item.penghuni.length > 2 ? (
              <View
                style={{
                  backgroundColor: myColor.etcbuble,
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: 'white',
                  borderWidth: 1,
                  elevation: 3,
                  marginLeft: -10,
                }}>
                <Text style={{fontSize: 12, fontWeight: 'bold'}}>...</Text>
              </View>
            ) : null}

            {props.item.penghuni.map((item, index) => {
              if (index > 1) {
                return null;
              } else {
                return (
                  <View
                    key={index}
                    style={{
                      backgroundColor: 'red',
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderColor: 'white',
                      borderWidth: 1,
                      elevation: 3,
                      marginLeft: -10,
                    }}>
                    {/* <Text>{index}</Text> */}
                    <Image
                      style={{height: 30, width: 30, borderRadius: 15}}
                      source={{
                        uri:
                          APIUrl +
                          '/storage/images/pendaftar/' +
                          item.foto_diri,
                      }}
                    />
                  </View>
                );
              }
            })}
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default ItemKamar;

const styles = StyleSheet.create({
  tagKapasitas: {
    paddingVertical: 3,
    borderRadius: 5,
    paddingHorizontal: 10,

    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    borderWidth: 0.5,
    borderColor: myColor.divider,
  },
  tagText: {
    fontSize: 11,
    fontFamily: 'OpenSans-SemiBold',
  },
});
