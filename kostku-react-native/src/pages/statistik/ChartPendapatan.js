import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Circle, Line, G, Path, Rect, Text} from 'react-native-svg';
import {Grid, LineChart, XAxis, YAxis} from 'react-native-svg-charts';

// const ChartPendapatan = () => {
//   return (

//   );
// };

class ChartPendapatan extends React.PureComponent {
  render() {
    const {
      dataBulan,
      dataPendapatan,
      selectedPoint,
      dotFunction,
      popModal,
      children,
      ...rest
    } = this.props;
    const axesSvg = {fontSize: 10, fill: 'grey'};
    const verticalContentInset = {top: 60, bottom: 10, left: 10, right: 10};
    const xAxisHeight = 10;

    const Decorator = ({x, y}) => {
      return dataPendapatan.map((value, index) => (
        <Circle
          key={index}
          cx={x(index)}
          cy={y(value)}
          r={6}
          onPress={() => {
            dotFunction(index);
            popModal(true);
          }}
          stroke={'rgb(134, 65, 244)'}
          fill={'white'}
        />
      ));
    };

    const Tooltip = ({x, y, selectedDot}) => (
      <G
        x={x(selectedDot) - 75 / 2}
        key={'tooltip'}
        onPress={() => alert('tooltip clicked')}>
        <G y={y(dataPendapatan[selectedDot]) - 50}>
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
            {`${dataPendapatan[selectedDot]}ºC`}
            {/* {y(data[5])} */}
            {/* {x(5)} */}
          </Text>
        </G>
        <G x={75 / 2}>
          <Line
            y1={y(dataPendapatan[selectedDot]) - 10}
            y2={y(dataPendapatan[selectedDot])}
            stroke={'grey'}
            strokeWidth={2}
          />
        </G>
      </G>
    );

    return (
      <View style={{marginBottom: 10}}>
        <View style={{alignItems: 'center'}}>{children}</View>
        <View
          style={{height: 250, paddingHorizontal: 20, flexDirection: 'row'}}>
          <YAxis
            data={dataPendapatan}
            style={{marginBottom: xAxisHeight}}
            contentInset={verticalContentInset}
            svg={axesSvg}
          />
          <View style={{flex: 1, marginLeft: 10}}>
            <LineChart
              style={{flex: 1}}
              data={dataPendapatan}
              contentInset={verticalContentInset}
              svg={{stroke: 'rgb(134, 65, 244)'}}>
              <Grid />

              <Decorator />
              <Tooltip selectedDot={selectedPoint} />
            </LineChart>
            <XAxis
              style={{marginHorizontal: -10, height: xAxisHeight}}
              data={dataPendapatan}
              formatLabel={(value, index) => dataBulan[index]}
              contentInset={{left: 10, right: 10}}
              svg={axesSvg}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default ChartPendapatan;

const styles = StyleSheet.create({});
