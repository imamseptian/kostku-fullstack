import React from 'react';
import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native';

class PureModal extends React.PureComponent {
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        {this.props.children}
      </View>
    );
  }
}

// const PureModal = (props) => {
//   // const {children, ...rest} = this.props;
//   return (
//     <View
//       style={{
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: 'rgba(0,0,0,0.5)',
//       }}>
//       {props.children}
//     </View>
//   );
// };

export default PureModal;

const styles = StyleSheet.create({});
