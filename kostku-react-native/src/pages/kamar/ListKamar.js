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
import {FAB} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {
  ButtonLoad,
  SearchBar,
  SearchResult,
  TagSearch,
} from '../../components/atoms';
import {myAxios} from '../../function/MyAxios';
import {APIUrl, myColor, screenHeight, screenWidth} from '../../function/MyVar';
import {ItemKelas} from './component';

const ListKamar = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const scrollRef = useRef();
  const dataRedux = useSelector((state) => state.AuthReducer);
  const [kamar, setKamar] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTag, setSelectedTag] = useState(1);
  const [maxLimit, setmaxLimit] = useState(0);
  const [banyakData, setbanyakData] = useState(0);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({
    id_kost: dataRedux.user.kostku,
    namakeyword: '',
    sortname: 'nama',
    orderby: 'asc',
  });

  const changeFilter = (inputType, value) => {
    setFilter({
      ...filter,
      [inputType]: value,
    });
  };

  const ambilApi = (myToken) => {
    setIsLoading(true);
    myAxios.postAxios(
      APIUrl + '/api/classes?page=1',
      filter,
      dataRedux.token,
      myToken,
      onPost,
    );
    function onPost(status, data) {
      if (status == 'success') {
        setKamar(data.data.data);
        setmaxLimit(data.data.last_page);
        setbanyakData(data.data.total);
        setIsLoading(false);
      } else if (status == 'cancel') {
        console.log('[LIST KAMAR ] Request Canceled');
      } else {
        alert('error');
        // console.log(data);
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
      setFilter({
        ...filter,
        namakeyword: '',
        sortname: 'nama',
        orderby: 'asc',
      });
      setSelectedTag(1);
      source.cancel('Component got unmounted');
    };
  }, [isFocused]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    if (isFocused) {
      goToTop();
      ambilApi(source.token);
    }
    return () => {
      source.cancel('Filter Cancel');
    };
  }, [filter]);

  useEffect(() => {
    if (page != 1) {
      const source = axios.CancelToken.source();
      setIsLoading(true);
      myAxios.postAxios(
        APIUrl + '/api/classes?page=' + page,
        filter,
        dataRedux.token,
        source.token,
        onPost,
      );
      function onPost(status, data) {
        if (status == 'success') {
          setKamar(kamar.concat(data.data.data));
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
  }, [page]);

  const deleteKelas = (id_kelas) => {
    // const source = axios.CancelToken.source();
    // ambilApi(source.token);
    axios
      .post(`${APIUrl}/api/hapus_kelas`, {id: id_kelas, brutus: 22})
      .then((res) => {
        if (res.data.success) {
          // const source = axios.CancelToken.source();
          // ambilApi(source.token);
          setIsLoading(true);
          axios
            .post(APIUrl + '/api/classes?page=1', filter, {
              headers: {
                Authorization: `Bearer ${dataRedux.token}`,
              },
            })
            .then((response) => {
              setKamar(response.data.data.data);
              setmaxLimit(response.data.data.last_page);
              setbanyakData(response.data.data.total);
              setIsLoading(false);
            })
            .catch((error) => {
              console.log(error);
            });
          alert('sukes hapus');
        } else {
          alert('Maaf kamar pada kelas ini masih memiliki penghuni');
        }
      })
      .catch((error) => {
        console.log(error);
        alert(id_kelas);
      });
  };

  const goToTop = () => {
    if (kamar.length > 0) {
      scrollRef.current.scrollToIndex({animated: true, index: 0});
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />

      {/* Header and SearchBar Section  */}
      <View style={styles.wrapperHeader}>
        <Text style={styles.title}>Daftar Kamar Kost</Text>

        <SearchBar
          value={filter.namakeyword}
          placeholder={'Cari Jenis Kamar'}
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
                changeFilter('sortname', 'harga');
              }}
              tagName="Harga"
            />
            {/* <TagSearch
              tagColor={selectedTag == 3 ? myColor.myblue : 'white'}
              textColor={selectedTag == 3 ? 'white' : myColor.darkText}
              onPress={() => {
                setSelectedTag(3);
                changeFilter('sortname', 'kapasitas');
              }}
              tagName="Kapasitas"
            /> */}
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
        {/* <Text>{JSON.stringify(kamar)}</Text> */}

        {/* List Kamar Section  */}
        <FlatList
          ref={scrollRef}
          style={{marginTop: 10, paddingHorizontal: 15}}
          data={kamar}
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
              <ItemKelas
                data={item}
                // foto={route.params.foto}
                onPress={() => navigation.push('DetailKelas', {item})}
                hapusKamar={(id_kelas) => {
                  deleteKelas(id_kelas);
                }}
              />
            );
          }}
        />
      </View>

      <FAB
        style={styles.fab}
        small
        icon="plus"
        color="white"
        onPress={() => navigation.push('CreateKelas')}
      />
      <ActivityIndicator
        animating={isLoading}
        size="large"
        color={myColor.myblue}
        style={styles.loading}
      />
    </View>
  );
};

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
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffaa91',
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

export default ListKamar;
