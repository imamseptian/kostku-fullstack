import React, {useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {myColor, APIUrl, defaultAsset} from '../../function/MyVar';

const BlackImage = ({urlImg}) => {
  const [img, setimg] = useState(APIUrl + '/storage/images/kelas/' + urlImg);
  return (
    <View>
      <Image
        source={{
          // uri: APIUrl + '/image_kelas/' + item.foto,
          uri: img,
        }}
        style={{height: '100%', width: '100%', borderRadius: 10}}
        onError={(e) => setimg(defaultAsset.kelas_kamar)}
      />
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'black',
          position: 'absolute',
          opacity: 0.4,
          borderRadius: 10,
        }}></View>
    </View>
  );
};

export default BlackImage;

const styles = StyleSheet.create({});
