import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {myColor} from '../function/MyVar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
class HeaderTheme extends React.PureComponent {
  render() {
    return (
      <View
        style={{
          backgroundColor: myColor.colorTheme,
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: StatusBar.currentHeight + 10,
          paddingBottom: 10,
          paddingHorizontal: 5,
          flexDirection: 'row',
        }}>
        <TouchableOpacity onPress={this.props.openDrawer}>
          <MaterialIcons name="menu" color="#ffffff" size={25} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 14,
            fontFamily: 'OpenSans-Bold',
            color: '#fff',
          }}>
          {this.props.title}
        </Text>
        <View style={{width: 25}}></View>
      </View>
    );
  }
}

export default HeaderTheme;

const styles = StyleSheet.create({});
