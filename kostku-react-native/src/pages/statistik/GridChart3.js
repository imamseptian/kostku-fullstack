import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AreaChart, Grid, LineChart} from 'react-native-svg-charts';
import {Circle, Path, Text} from 'react-native-svg';
import {APIUrl, myColor, screenHeight, screenWidth} from '../../function/MyVar';

const GridChart3 = () => {
  const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];

  const Decorator = ({x, y, data}) => {
    return data.map((value, index) => (
      <Circle
        key={index}
        cx={x(index)}
        cy={y(value)}
        r={6}
        onPress={() => alert(index)}
        stroke={'rgb(134, 65, 244)'}
        fill={'white'}
      />
    ));
  };

  const Line = ({line}) => (
    <Path d={line} stroke={'rgba(134, 65, 244)'} fill={'none'} />
  );
  return (
    <LineChart
      style={{
        height: 200,
        width: 0.9 * screenWidth,
        marginHorizontal: 0.05 * screenWidth,
      }}
      data={data}
      //   svg={{fill: myColor.alert}}
      contentInset={{top: 20, bottom: 30, left: 10, right: 10}}>
      <Grid />
      <Line />

      <Decorator />
    </LineChart>
  );
};

export default GridChart3;

const styles = StyleSheet.create({});
