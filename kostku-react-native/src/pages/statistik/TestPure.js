import React from 'react';
import {Text, View} from 'react-native';
class TestPure extends React.PureComponent {
  render() {
    const {item, ...rest} = this.props;

    return (
      <View>
        <Text></Text>
      </View>
    );
  }
}

export default TestPure;
