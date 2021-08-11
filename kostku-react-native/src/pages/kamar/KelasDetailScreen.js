import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Paragraph} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const KelasDetailScreen = () => {
  console.log(screenWidth);
  return (
    <View style={{flex: 1}}>
      <View style={{backgroundColor: '#46ce7c', flex: 1}}></View>
      <View style={{backgroundColor: 'white', flex: 3}}></View>
      <View
        style={{
          backgroundColor: 'white',
          width: 0.8 * screenWidth,
          height: 0.8 * screenHeight,
          position: 'absolute',
          top: 0.05 * screenHeight,
          left: 0.1 * screenWidth,
          borderRadius: 20,
          elevation: 5,
        }}>
        <View style={{position: 'relative'}}>
          <Image
            source={{
              uri:
                'http://dry-forest-53707.herokuapp.com/image_kelas/EzVgiiU5lW.jpeg',
            }}
            style={{
              width: '100%',
              height: (2 / 3) * 0.8 * screenWidth,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          />
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'black',
              position: 'absolute',
              opacity: 0.2,
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
            }}></View>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              position: 'absolute',
              bottom: 5,
              left: 10,
              fontSize: 20,
            }}>
            Kost Putra A
          </Text>
        </View>
        <View
          style={{
            paddingHorizontal: 20,
            marginTop: 20,
            height: 0.8 * screenHeight - (2 / 3) * 0.8 * screenWidth,
            paddingBottom: 50,
            position: 'relative',
          }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Ionicons name="pricetag" color="#05375A" size={25} />
              <Text
                style={{
                  marginLeft: 10,
                  color: '#636e72',
                  fontWeight: 'bold',
                  fontSize: 18,
                }}>
                Rp 500.000 / Bulan
              </Text>
            </View>

            <Paragraph style={{textAlign: 'justify', color: '#05375A'}}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s,
            </Paragraph>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <MaterialIcons name="room-service" color="#05375A" size={25} />
              <Text
                style={{
                  marginLeft: 10,
                  color: '#636e72',
                  fontWeight: 'bold',
                  fontSize: 18,
                }}>
                Fasilitas Kamar
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
                marginLeft: 20,
              }}>
              <Text
                style={{
                  color: '#636e72',
                  fontWeight: 'bold',
                  fontSize: 14,
                }}>
                1.
              </Text>
              <Text
                style={{
                  marginLeft: 10,
                  color: '#636e72',
                  fontWeight: 'bold',
                  fontSize: 14,
                }}>
                Fasilitas Kamar
              </Text>
            </View>
          </ScrollView>
        </View>
        <View
          style={{
            width: '90%',
            height: 50,
            alignSelf: 'center',
            position: 'absolute',
            bottom: -25,
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <TouchableOpacity onPress={() => alert('Todo')}>
            <View
              style={{
                height: 50,
                width: 110,
                backgroundColor: '#46ce7c',
                borderRadius: 110 / 4,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 14}}>
                Kembali
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert('Todo')}>
            <View
              style={{
                height: 50,
                width: 110,
                backgroundColor: '#46ce7c',
                borderRadius: 110 / 4,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 14}}>
                Edit
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default KelasDetailScreen;

const styles = StyleSheet.create({});
