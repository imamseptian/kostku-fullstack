import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {PieChart} from 'react-native-svg-charts';
import {myColor, screenWidth} from '../../../function/MyVar';

class MyPieChart extends React.PureComponent {
  render() {
    const {
      item,
      data,
      colorData,
      onPiePress,
      selectedPie,
      ...rest
    } = this.props;
    // const pieData = data
    //   .filter((item) => item.value > 0)
    //   .map((item, index) => ({
    //     value: item.value,
    //     svg: {
    //       fill: item.color,
    //       onPress: () => {
    //         onPiePress(index);
    //       },
    //     },
    //     key: `pie-${index}`,
    //   }));

    // const pieData = data
    //   .filter((item) => item.penghuni.length > 0)
    //   .map((item, index) => ({
    //     value: item.penghuni.length,
    //     svg: {
    //       fill: colorData[index],
    //       onPress: () => {
    //         onPiePress(index);
    //       },
    //     },
    //     key: `pie-${index}`,
    //   }));

    const pieData = data.map((item, index) => ({
      value: item.value,
      svg: {
        fill: colorData[index],
        onPress: () => {
          onPiePress(index);
        },
      },
      key: `pie-${index}`,
    }));

    return (
      <View>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 14,
            fontFamily: 'OpenSans-Bold',
          }}>
          Statistik Penghuni
        </Text>
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
          {/* <PieData /> */}
          {/* <Text>{JSON.stringify(data)}</Text> */}
          {/* {data
            // .filter((item, index) => item.value > 40)
            .map((item, index) => {
              return <Text key={index}>{JSON.stringify(pieData)}</Text>;
            })} */}
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
      </View>
    );
  }
}

export default MyPieChart;

const styles = StyleSheet.create({});
