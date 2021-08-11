import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {PieChart} from 'react-native-svg-charts';
import {APIUrl, myColor, screenHeight, screenWidth} from '../../function/MyVar';

class ChartPenghuni extends React.PureComponent {
  render() {
    const {item, dataPie, colorPie, ...rest} = this.props;
    const pieData = dataPie
      .filter((value) => value > 0)
      .map((value, index) => ({
        value,
        svg: {
          fill: colorPie[index],
          onPress: () => alert(index),
        },
        key: `pie-${index}`,
      }));
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 250,
          alignItems: 'center',
          paddingHorizontal: 0.05 * screenWidth,
        }}>
        <PieChart
          style={{
            width: 200,
          }}
          data={pieData}
        />
        <View
          style={{
            marginLeft: 20,
            justifyContent: 'center',
          }}>
          <View style={{flexDirection: 'row', marginBottom: 10}}>
            <View
              style={{
                height: 20,
                width: 20,
                backgroundColor: myColor.myblue,
                marginRight: 10,
              }}></View>
            <Text>Pria</Text>
          </View>
          <View style={{flexDirection: 'row', marginBottom: 10}}>
            <View
              style={{
                height: 20,
                width: 20,
                backgroundColor: myColor.colorTheme,
                marginRight: 10,
              }}></View>
            <Text>Wanita</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default ChartPenghuni;

const styles = StyleSheet.create({});
