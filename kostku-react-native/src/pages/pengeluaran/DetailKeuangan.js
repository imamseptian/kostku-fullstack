import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {myColor, screenWidth} from '../../function/MyVar';
import {TabPemasukan, TabPengeluaran} from './';
import {TabCategory} from './components';
import {HeaderTheme} from '../../components';

const DetailKeuangan = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const [lebar, setlebar] = useState(screenWidth);
  const dataRedux = useSelector((state) => state.AuthReducer);
  const mountedAnimated = useRef(new Animated.Value(0)).current;

  const [currentPage, setcurrentPage] = useState(0);
  let page = route.params.page;
  const ref = useRef();
  const datapage = [
    {
      id: 'page0',
      page: (
        <TabPengeluaran
          lebar={lebar}
          token={dataRedux.token}
          id_kost={dataRedux.user.kostku}
        />
      ),
    },
    {
      id: 'page1',
      page: (
        <TabPemasukan
          lebar={lebar}
          token={dataRedux.token}
          id_kost={dataRedux.user.kostku}
        />
      ),
    },
  ];

  useEffect(() => {
    ref.current.scrollToIndex({
      index: currentPage,
      animated: true,
    });
    // const wait = new Promise((resolve) => setTimeout(resolve, 500));
    // wait.then(() => {
    //   ref.current.scrollToIndex({
    //     index: currentPage,
    //     animated: true,
    //   });
    // });
  }, [currentPage]);
  // useFocusEffect(() => {
  //   console.log('#######');
  //   console.log(route.params.page);
  //   console.log('#######');
  //   const wait = new Promise((resolve) => setTimeout(resolve, 100));
  //   wait.then(() => {
  //     setcurrentPage(route.params.page);
  //   });
  //   // ambilApi(source.token);
  //   return () => {
  //     console.log('unmounted detail keuangan');
  //     // console.log('unmounted');
  //   };
  //   // console.log('ayaya');
  // }, []);
  useEffect(() => {
    const wait = new Promise((resolve) => setTimeout(resolve, 100));
    wait.then(() => {
      setcurrentPage(route.params.page);
    });
  }, [isFocused]);

  const animation = (toValue, delay) =>
    Animated.timing(mountedAnimated, {
      toValue,
      duration: 500,
      delay,
      useNativeDriver: true,
    }).start();

  useEffect(() => {
    console.log('wololo');
    animation(1, 500);
  }, []);

  const translateY = mountedAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  return (
    <View
      onLayout={(event) => {
        const {x, y, width, height} = event.nativeEvent.layout;
        // console.log(width, width);
        setlebar(width);

        // do something here like set your initial animated value for the height
      }}
      style={{flex: 1, backgroundColor: '#f6f6f6'}}>
      <StatusBar translucent backgroundColor="transparent" />
      <HeaderTheme
        openDrawer={() => navigation.toggleDrawer()}
        title="Pemasukan dan Pengeluaran Kost"
      />
      {/* <View
        style={{
          backgroundColor: myColor.colorTheme,
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: StatusBar.currentHeight + 10,
          paddingBottom: 10,
          paddingHorizontal: 5,
          flexDirection: 'row',
        }}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <MaterialIcons name="menu" color="#ffffff" size={25} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 14,
            fontFamily: 'OpenSans-Bold',
            color: '#fff',
          }}>
          Pemasukan dan Pengeluaran Kost
        </Text>
        <View style={{width: 25}}></View>
      </View> */}
      <View
        style={{
          paddingVertical: 10,
          borderBottomWidth: 2,
          borderBottomColor: myColor.darkText,
          paddingHorizontal: 0.1 * screenWidth,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: currentPage == 0 ? myColor.myblue : 'white',
            flex: 1,
            paddingVertical: 10,
            alignItems: 'center',
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            borderWidth: 1,
            borderColor: myColor.divider,
          }}
          onPress={() => {
            setcurrentPage(0);
            // ref.current.scrollToIndex({
            //   index: 0,
            //   animated: true,
            // });
          }}>
          <Text
            style={{
              color: currentPage == 0 ? '#fff' : myColor.fbtx,
              fontSize: 12,
              fontFamily: 'OpenSans-Bold',
            }}>
            Pengeluaran
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: currentPage == 1 ? myColor.myblue : 'white',
            flex: 1,
            paddingVertical: 10,
            alignItems: 'center',
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            borderWidth: 1,
            borderColor: myColor.divider,
            borderLeftWidth: 0,
          }}
          onPress={() => {
            setcurrentPage(1);
            // ref.current.scrollToIndex({
            //   index: 1,
            //   animated: true,
            // });
          }}>
          <Text
            style={{
              color: currentPage == 1 ? '#fff' : myColor.fbtx,
              fontSize: 12,
              fontFamily: 'OpenSans-Bold',
            }}>
            Pemasukan
          </Text>
        </TouchableOpacity>
      </View>

      <Animated.FlatList
        style={{opacity: mountedAnimated, transform: [{translateY}]}}
        ref={ref}
        data={datapage}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        initialScrollIndex={0}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(ev) => {
          const newIndex = Math.floor(ev.nativeEvent.contentOffset.x / lebar);
          console.log(newIndex);
          setcurrentPage(newIndex);
        }}
        renderItem={({item, index, separator}) => {
          return item.page;
        }}
      />
    </View>
  );
};

export default DetailKeuangan;

const styles = StyleSheet.create({});
