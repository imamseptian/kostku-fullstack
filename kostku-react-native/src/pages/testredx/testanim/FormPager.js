import React, {useState} from 'react';
import {StyleSheet, View, Text, Button, Dimensions} from 'react-native';
import ViewPager from '@react-native-community/viewpager';

const screenWidth = Math.round(Dimensions.get('window').width);

const FormPager = () => {
  const [page, setPage] = useState(0);
  return (
    <View style={{flex: 1, backgroundColor: '#46ce7c', alignItems: 'center'}}>
      <ViewPager
        style={styles.viewPager}
        initialPage={0}
        onPageSelected={(e) => setPage(e.nativeEvent.position + 1)}>
        <View
          key="1"
          style={{
            backgroundColor: 'white',
            alignItems: 'center',
            borderRadius: 300 / 8,
            padding: 10,
            position: 'relative',
          }}>
          <View style={{position: 'absolute', top: 10, left: 30}}>
            <Text style={{fontSize: 25, color: '#70a1ff', textAlign: 'left'}}>
              Selamat Datang
            </Text>
            <Text style={{fontSize: 18, color: '#70a1ff', textAlign: 'right'}}>
              di Aplikasi KostKu
            </Text>
          </View>
        </View>
        <View
          key="2"
          style={{
            backgroundColor: 'white',
            alignItems: 'center',
            borderRadius: 300 / 8,
            padding: 10,
            position: 'relative',
          }}>
          <View style={{position: 'absolute', top: 10, left: 30}}>
            <Text style={{fontSize: 25, color: '#70a1ff', textAlign: 'left'}}>
              Selamat Datang
            </Text>
            <Text style={{fontSize: 18, color: '#70a1ff', textAlign: 'right'}}>
              di Aplikasi KostKu
            </Text>
          </View>
        </View>
      </ViewPager>
    </View>
  );
};

export default FormPager;

const styles = StyleSheet.create({
  viewPager: {
    width: screenWidth - 80,
    height: 300,
    marginTop: 40,
  },
});
