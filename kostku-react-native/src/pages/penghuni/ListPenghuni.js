import {useIsFocused} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState, useRef} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {CardProfile} from './atoms';
import {useSelector} from 'react-redux';
import {FlatListPenghuni} from '../../components';
import {
  ButtonLoad,
  SearchBar,
  SearchResult,
  TagSearch,
} from '../../components/atoms';
import {myAxios} from '../../function/MyAxios';
import {APIUrl, myColor} from '../../function/MyVar';

const screenWidth = Math.round(Dimensions.get('window').width);

const ListPenghuni = ({navigation}) => {
  const isFocused = useIsFocused();
  const scrollRef = useRef();
  const [selectedTag, setSelectedTag] = useState(1);
  const dataRedux = useSelector((state) => state.AuthReducer);
  const [penghuni, setPenghuni] = useState([]);
  const [banyakData, setbanyakData] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState({
    namakeyword: '',
    sortname: 'nama',
    orderby: 'asc',
    id_kost: dataRedux.user.kostku,
  });
  const [maxLimit, setmaxLimit] = useState(0);

  // let cancelToken;

  const changeFilter = (inputType, value) => {
    setFilter({
      ...filter,
      [inputType]: value,
    });
  };

  const ambilApi = (myToken) => {
    setIsLoading(true);
    myAxios.postAxios(
      APIUrl + '/api/daftarpenghuni?page=1',
      filter,
      dataRedux.token,
      myToken,
      onPost,
    );
    function onPost(status, data) {
      if (status == 'success') {
        setPenghuni(data.data.data);
        setmaxLimit(data.data.last_page);
        setbanyakData(data.data.total);
        setIsLoading(false);
      } else if (status == 'cancel') {
        console.log('caught cancel filter');
      } else {
        console.log('error ambil api list penghuni');
        console.log(filter);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    if (isFocused) {
      ambilApi(source.token);
    }
    return () => {
      console.log('LOST FOCUS LIST PENGHUNI');

      setFilter({
        ...filter,
        namakeyword: '',
        sortname: 'nama',
        orderby: 'asc',
      });
      setSelectedTag(1);

      setbanyakData(0);
      source.cancel('Penghuni Screen got unmounted');
    };
  }, [isFocused]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    if (page != 1) {
      setIsLoading(true);
      myAxios.postAxios(
        APIUrl + '/api/daftarpenghuni?page=' + page,
        filter,
        dataRedux.user.token,
        source.token,
        onPost,
      );
      function onPost(status, data) {
        if (status == 'success') {
          setPenghuni(penghuni.concat(data.data.data));
          setmaxLimit(data.data.last_page);
          setbanyakData(data.data.total);
          setIsLoading(false);
        } else if (status == 'cancel') {
          console.log('caught cancel filter');
        } else {
          console.log(data);
          setIsLoading(false);
        }
      }
    }

    return () => {
      source.cancel('Penghuni Screen got unmounted');
    };
  }, [page]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    if (isFocused) {
      goToTop();
      ambilApi(source.token);
    }
    return () => {
      source.cancel('FIlter CANCELED');
    };
  }, [filter]);

  const goToTop = () => {
    if (penghuni.length > 0) {
      scrollRef.current.scrollToIndex({animated: true, index: 0});
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />

      {/* Header and SearchBar Section  */}
      <View style={styles.wrapperHeader}>
        <Text style={styles.title}>Daftar Penghuni</Text>

        <SearchBar
          value={filter.namakeyword}
          placeholder={'Cari Penghuni'}
          onChangeText={(value) => changeFilter('namakeyword', value)}
          clearText={() => {
            changeFilter('namakeyword', '');
          }}
        />
      </View>

      {/* Content Section  */}
      <View style={{flex: 1}}>
        <View style={styles.sortWrapper}>
          <Text style={styles.sortTitle}>Urutkan</Text>

          {/* Sort Option Section  */}
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <TagSearch
              tagColor={selectedTag == 1 ? myColor.myblue : 'white'}
              textColor={selectedTag == 1 ? 'white' : myColor.darkText}
              onPress={() => {
                setSelectedTag(1);
                changeFilter('sortname', 'nama');
              }}
              tagName="Nama"
            />
            <TagSearch
              tagColor={selectedTag == 2 ? myColor.myblue : 'white'}
              textColor={selectedTag == 2 ? 'white' : myColor.darkText}
              onPress={() => {
                setSelectedTag(2);
                changeFilter('sortname', 'tanggal_masuk');
              }}
              tagName="Tanggal Masuk"
            />
            <TagSearch
              tagColor={selectedTag == 3 ? myColor.myblue : 'white'}
              textColor={selectedTag == 3 ? 'white' : myColor.darkText}
              onPress={() => {
                setSelectedTag(3);
                changeFilter('sortname', 'tanggal_lahir');
              }}
              tagName="Umur"
            />
            <TagSearch
              tagColor={selectedTag == 4 ? myColor.myblue : 'white'}
              textColor={selectedTag == 4 ? 'white' : myColor.darkText}
              onPress={() => {
                setSelectedTag(4);
                changeFilter('sortname', 'kelamin');
              }}
              tagName="Kelamin"
            />
          </ScrollView>
        </View>

        <SearchResult
          sortCondition={filter.orderby}
          banyak={banyakData}
          onPress={() => {
            if (filter.orderby === 'asc') {
              changeFilter('orderby', 'desc');
            } else {
              changeFilter('orderby', 'asc');
            }
          }}
        />

        {/* List Kamar Section  */}
        <FlatList
          ref={scrollRef}
          style={{marginTop: 10, paddingHorizontal: 15}}
          data={penghuni}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            page < maxLimit && !isLoading ? (
              <ButtonLoad
                onPress={() => {
                  setPage((prevState) => prevState + 1);
                }}
              />
            ) : null
          }
          renderItem={({item, index, separator}) => {
            return (
              <CardProfile
                item={item}
                onPress={() => {
                  navigation.push('ProfilPenghuni', {item});
                }}
              />
            );
          }}
        />
      </View>

      <ActivityIndicator
        animating={isLoading}
        size="large"
        color={myColor.myblue}
        style={styles.loading}
      />
    </View>
  );
};

export default ListPenghuni;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },

  title: {
    fontSize: 24,
    fontFamily: 'OpenSans-Bold',
    color: '#fff',
    fontWeight: 'bold',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapperHeader: {
    backgroundColor: myColor.colorTheme,
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 15,
  },
  sortWrapper: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    marginBottom: 10,

    paddingLeft: 15,
  },
  sortTitle: {
    marginRight: 10,
    fontSize: 14,
    fontFamily: 'OpenSans-SemiBold',
    color: myColor.fbtx,
  },
});
