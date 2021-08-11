import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';

const {width, height} = Dimensions.get('window');
const BerkasInfo = ({foto, email, noktp, notelp, ...rest}) => {
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 30,
        paddingHorizontal: 20,
        backgroundColor: '#fbfbfb',
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScrol={(event) => {
          console.log('ayaya');
        }}>
        <View style={styles.wrapperInfo}>
          <Text style={styles.subtitle}>No Telepon</Text>
          <Text style={styles.textInfo}>{notelp}</Text>
        </View>
        <View style={styles.wrapperInfo}>
          <Text style={styles.subtitle}>E-Mail</Text>
          <Text style={styles.textInfo}>{email}</Text>
        </View>
        <View style={styles.wrapperInfo}>
          <Text style={styles.subtitle}>No KTP</Text>
          <Text style={styles.textInfo}>{noktp}</Text>
        </View>
        <View style={styles.wrapperInfo}>
          <Text style={styles.subtitle}>Foto KTP</Text>
          <TouchableNativeFeedback {...rest}>
            <Image
              source={{
                uri: foto,
              }}
              style={{
                width: 0.7 * width,
                borderRadius: 10,
                height: 150,
                // opacity: opaAvatar,
              }}
            />
          </TouchableNativeFeedback>
        </View>
      </ScrollView>
    </View>
  );
};

export default BerkasInfo;

const styles = StyleSheet.create({
  subtitle: {
    color: '#676767',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textInfo: {
    color: '#676767',
    fontSize: 14,

    marginTop: 10,
  },
  wrapperInfo: {
    marginBottom: 20,
    borderBottomWidth: 0.5,
    paddingBottom: 10,
  },
});
