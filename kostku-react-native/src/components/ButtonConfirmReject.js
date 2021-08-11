import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  Alert,
} from 'react-native';
import {myColor} from '../function/MyVar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ButtonConfirmReject = ({terima, tolak}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: 5,
        width: 230,
        justifyContent: 'space-between',
      }}>
      <TouchableNativeFeedback
        onPress={terima}
        // onPress={() => {
        //   Alert.alert(
        //     'Konfirmasi',
        //     'Apakah anda yakin menerima orang berikut menjadi penghuni kost anda ?',
        //     [
        //       {
        //         text: 'Batal',
        //         onPress: () => alert('cancel'),
        //         style: 'cancel',
        //       },
        //       {text: 'Ya', onPress: () => alert('ayayay')},
        //     ],
        //     {cancelable: false},
        //   );
        // }}
      >
        <View
          style={{
            height: 40,
            width: 100,
            backgroundColor: myColor.success,
            borderRadius: 10,
            elevation: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row'}}>
            <MaterialCommunityIcons
              name="check-bold"
              color={myColor.blackText}
              size={20}
              style={{
                marginRight: 5,
              }}
            />
            <Text
              style={{
                color: myColor.blackText,
                fontSize: 14,
                fontWeight: 'bold',
              }}>
              Terima
            </Text>
          </View>
        </View>
      </TouchableNativeFeedback>

      <TouchableNativeFeedback onPress={tolak}>
        <View
          style={{
            height: 40,
            width: 100,
            backgroundColor: myColor.alert,
            borderRadius: 10,
            elevation: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row'}}>
            <MaterialCommunityIcons
              name="cancel"
              color={myColor.myWhite}
              size={20}
              style={{
                marginRight: 5,
              }}
            />
            <Text
              style={{
                color: myColor.myWhite,
                fontSize: 14,
                fontWeight: 'bold',
              }}>
              Tolak
            </Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default ButtonConfirmReject;

const styles = StyleSheet.create({});
