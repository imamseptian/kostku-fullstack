import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {myColor} from '../../function/MyVar';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
import {FlatListPendaftar} from '../../components';
import {TagSearch, SearchBar, SearchResult} from '../../components/atoms';

const ListPendaftar = () => {
  const [selectedTag, setSelectedTag] = useState(1);

  return (
    <View style={styles.wrapper}>
      <StatusBar translucent backgroundColor="transparent" styl />
      <View style={styles.containerUp}>
        <SearchBar />
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            alignItems: 'center',
            flex: 1,
            width: screenWidth * 0.95,
          }}>
          <Text
            style={{
              marginRight: 10,
              fontSize: 14,
              fontWeight: 'bold',
              color: 'white',
            }}>
            Urutkan
          </Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <TagSearch
              tagId={1}
              tagColor={selectedTag == 1 ? myColor.tagSelect : 'white'}
              onPress={() => setSelectedTag(1)}
              tagName="Tanggal Daftar"
            />
            <TagSearch
              tagId={2}
              tagColor={selectedTag == 2 ? myColor.tagSelect : 'white'}
              onPress={() => setSelectedTag(2)}
              tagName="Nama"
            />
            <TagSearch
              tagId={3}
              tagColor={selectedTag == 3 ? myColor.tagSelect : 'white'}
              onPress={() => setSelectedTag(3)}
              tagName="Umur"
            />
            <TagSearch
              tagId={4}
              tagColor={selectedTag == 4 ? myColor.tagSelect : 'white'}
              onPress={() => setSelectedTag(4)}
              tagName="Kelamin"
            />
          </ScrollView>
        </View>
      </View>
      <View style={styles.containerBot}>
        <SearchResult />
        <View style={{marginTop: 15}}>
          <FlatListPendaftar />
        </View>
      </View>
    </View>
  );
};

export default ListPendaftar;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  containerUp: {
    flex: 1,
    backgroundColor: myColor.colorTheme,
    alignItems: 'center',
  },
  containerBot: {
    flex: 4,
  },
});
