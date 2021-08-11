import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {screenHeight, screenWidth, myColor} from '../function/MyVar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
class MiniHeader extends React.PureComponent {
  render() {
    // const {item, ...rest} = this.props;
    return (
      <View
        style={{
          backgroundColor: myColor.colorTheme,
          alignItems: 'center',
          justifyContent: 'center',
          width: screenWidth,
          paddingTop: StatusBar.currentHeight + 10,
          paddingBottom: 10,
          position: 'relative',
        }}>
        <Text
          style={{fontSize: 14, fontFamily: 'OpenSans-Bold', color: '#fff'}}>
          {/* Pemasukan dan Pengeluaran Kost */}
          {this.props.title}
        </Text>
        <TouchableOpacity
          onPress={() => alert('todo')}
          style={{position: 'absolute', left: 5, bottom: 10}}>
          <MaterialIcons name="menu" color="#ffffff" size={25} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default MiniHeader;

const styles = StyleSheet.create({});
