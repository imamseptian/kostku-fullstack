import React from 'react';
import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import {
  formatRupiah,
  myColor,
  rupiahToInt,
  screenWidth,
} from '../../../function/MyVar';

const BarangTambahan = ({dataChange, ubahHarga}) => {
  return (
    <View
      style={{
        marginTop: 10,
        width: screenWidth,
        paddingHorizontal: 0.05 * screenWidth,
      }}>
      {/* <Text>{JSON.stringify(arrBiaya)}</Text> */}
      <View
        style={{
          marginBottom: 15,
        }}>
        {/* <Text>{JSON.stringify(dataChange)}</Text> */}

        <FlatList
          style={{paddingHorizontal: 3}}
          data={dataChange}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index, separator}) => {
            return (
              <View style={styles.cardItem}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={[
                      styles.text,
                      {width: 0.3 * screenWidth},
                    ]}>{`${item.nama} `}</Text>
                  <Text
                    style={[
                      styles.text,
                      {marginLeft: 5},
                    ]}>{`x ${item.qty} Buah`}</Text>
                </View>
                {/* <Text>{`x ${JSON.stringify(x)}`}</Text> */}
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={[styles.text, {marginLeft: 5}]}>{'='}</Text>
                  <TextInput
                    value={formatRupiah(item.total.toString(), 'Rp. ')}
                    keyboardType="numeric"
                    style={styles.inputHarga}
                    onChangeText={(v) => {
                      if (v.length < 5) {
                        // setformatHarga(formatRupiah('0', 'Rp. '));
                        ubahHarga(0, index, 'total');
                      } else {
                        // setformatHarga(formatRupiah(v, 'Rp. '));
                        ubahHarga(rupiahToInt(v), index, 'total');
                      }
                      // handleInputChange(parseInt(v), i, 'total');

                      // setbarangPenghuni({...barangPenghuni, total: rupiahToInt(formatHarga)});
                    }}
                  />
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default BarangTambahan;

const styles = StyleSheet.create({
  textInfo: {fontSize: 13, fontFamily: 'OpenSans-Regular', marginLeft: 10},
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: myColor.divider,
  },
  inputHarga: {
    borderWidth: 1,
    marginLeft: 10,
    borderColor: myColor.divider,
    borderRadius: 5,
    height: 40,
    width: 0.3 * screenWidth,
    paddingHorizontal: 5,
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    color: myColor.fbtx,
  },
  text: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 12,
    color: myColor.fbtx,
  },
});
