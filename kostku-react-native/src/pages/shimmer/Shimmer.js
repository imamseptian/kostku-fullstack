import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Modal,
  Animated,
  Button,
  FlatList,
} from 'react-native';
import {
  myColor,
  screenHeight,
  screenWidth,
  APIUrl,
  startingYear,
  dataBulan,
  dataTahun,
} from '../../function/MyVar';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import axios from 'axios';

const Shimmer = () => {
  const [fetched, setfetched] = useState(false);
  const fakeData = [
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 4},
    {id: 5},
    {id: 6},
    {id: 7},
  ];

  const [realData, setrealData] = useState([]);

  useEffect(() => {
    setfetched(false);
    axios
      .get('https://dry-forest-53707.herokuapp.com/api/alltagihan')
      .then((res) => {
        console.log('finished');
        // setpicking(false);
        setrealData(res.data.data);
        setfetched(true);
      });
  }, []);

  const ListItem = (props) => {
    return (
      <View
        style={{
          height: 100,
          width: 200,
          elevation: 5,
          borderRadius: 5,
          marginBottom: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          visible={fetched}
          style={{width: 100}}>
          <Text>{props.data.judul}</Text>
        </ShimmerPlaceHolder>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={fetched ? realData : fakeData}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 60}}
        renderItem={({item, index, separator}) => {
          return <ListItem data={item} />;
        }}
      />
    </View>
  );
};

export default Shimmer;
