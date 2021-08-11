import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import {APIUrl, myColor, kataPertama} from '../../function/MyVar';
const CircleAvatar = (props) => {
  const [img, setimg] = useState(
    APIUrl + '/storage/images/pendaftar/' + props.data.foto_diri,
  );

  // const kataPertama = () => {
  //   let firstWord = props.data.nama.replace(/ .*/, '');
  //   return firstWord;
  // };

  return (
    <TouchableNativeFeedback onPress={props.onPress}>
      <View style={styles.scrollWrapper}>
        {/* <View style={styles.imageScrollWrapper}> */}
        {/* <SharedElement id={`item.${props.data.id}.icon`}> */}
        <Image
          source={{
            uri: img,
          }}
          onError={(e) => {
            // console.log('error photo circle', e);
            setimg(
              'https://liquipedia.net/commons/images/thumb/6/66/AdmiralBulldog_EPICENTER_XL.jpg/600px-AdmiralBulldog_EPICENTER_XL.jpg',
            );
          }}
          // source={require('../asset/imgdefault/avatar.jpeg')}
          // defaultSource={require('../asset/imgdefault/avatar.jpeg')}
          style={styles.avatarScroll}
          resizeMode="cover"
        />
        {/* </SharedElement> */}
        {/* </View> */}
        <Text style={styles.avatarName} numberOfLines={1}>
          {/* {item.nama_depan} */}
          {/* {props.data.nama} */}
          {kataPertama(props.data.nama)}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default CircleAvatar;

const styles = StyleSheet.create({
  imageScrollWrapper: {height: 60, width: 60, borderRadius: 30},
  avatarScroll: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    borderWidth: 2,
    borderColor: myColor.divider,
    // elevation: 5,
  },
  avatarName: {
    fontSize: 12,
    fontFamily: 'OpenSans-SemiBold',
    color: myColor.darkText,
  },
  scrollWrapper: {
    alignItems: 'center',
    marginRight: 15,
  },
});
