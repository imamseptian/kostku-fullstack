import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {myColor, screenWidth} from '../../function/MyVar';
import {ListData} from './';

const ListHari = (props) => {
  return (
    <View
      style={{
        marginTop: 10,

        minHeight: 100,
        // elevation: 5,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: myColor.divider,
      }}>
      <View
        style={{
          paddingVertical: 5,
          borderBottomWidth: 1,
          borderBottomColor: myColor.divider,
          justifyContent: 'center',
          paddingHorizontal: 10,
          marginBottom: 5,
        }}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: 'OpenSans-SemiBold',
            color: myColor.fbtx,
          }}>
          {props.data.hari}-{props.bulan.nama}-{props.tahun}
        </Text>
      </View>
      {props.data.data.map((item, index) => {
        return (
          <ListData
            key={index}
            data={item}
            onClickPemasukan={() => {
              props.onClickPemasukan(item);
            }}
          />
        );
      })}
      {/* <ListData key={index} data={item} /> */}
    </View>
  );
};

export default ListHari;

const styles = StyleSheet.create({});
