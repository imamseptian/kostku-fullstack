import React, {useState} from 'react';
import {StyleSheet, View, Button} from 'react-native';
import {LineChart, Grid} from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import {Circle, G, Line, Rect, Text} from 'react-native-svg';
import {APIUrl, myColor, screenHeight, screenWidth} from '../../function/MyVar';
const GridChart2 = () => {
  const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];
  const [selectedPoint, setselectedPoint] = useState(10);
  /**
   * Both below functions should preferably be their own React Components
   */

  const HorizontalLine = ({y}) => (
    <Line
      key={'zero-axis'}
      x1={'0%'}
      x2={'100%'}
      y1={y(50)}
      y2={y(50)}
      stroke={'grey'}
      strokeDasharray={[4, 8]}
      strokeWidth={2}
    />
  );

  const Tooltip = ({x, y, selectedDot}) => (
    <G
      x={x(selectedDot) - 75 / 2}
      key={'tooltip'}
      onPress={() => alert('tooltip clicked')}>
      <G y={y(data[selectedDot]) - 50}>
        <Rect
          height={40}
          width={75}
          stroke={'grey'}
          fill={'white'}
          ry={10}
          rx={10}
        />
        <Text
          x={75 / 2}
          y={20}
          alignmentBaseline={'middle'}
          textAnchor={'middle'}
          stroke={'rgb(134, 65, 244)'}>
          {`${data[selectedDot]}ºC`}
          {/* {y(data[5])} */}
          {/* {x(5)} */}
        </Text>
      </G>
      <G x={75 / 2}>
        <Line
          y1={y(data[selectedDot]) - 10}
          y2={y(data[selectedDot])}
          stroke={'grey'}
          strokeWidth={2}
        />
        <Circle
          //   cx={x(5)}
          cy={y(data[selectedDot])}
          r={6}
          stroke={'rgb(134, 65, 244)'}
          strokeWidth={2}
          fill={'white'}
        />
      </G>
    </G>
  );

  return (
    <View>
      <LineChart
        style={{
          height: 250,
          width: 0.9 * screenWidth,
          marginHorizontal: 0.05 * screenWidth,
        }}
        data={data}
        svg={{
          stroke: 'rgb(134, 65, 244)',
          strokeWidth: 1,
        }}
        contentInset={{top: 50, bottom: 10}}
        curve={shape.curveLinear}>
        <Grid />
        <HorizontalLine />
        <Tooltip selectedDot={selectedPoint} />
      </LineChart>
      <Button title="Press Me" onPress={() => setselectedPoint(7)} />
    </View>
  );
};

export default GridChart2;

const styles = StyleSheet.create({});
