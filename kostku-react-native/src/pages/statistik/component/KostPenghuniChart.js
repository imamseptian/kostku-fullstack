import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {PieChart} from 'react-native-svg-charts';
import {myColor, screenWidth} from '../../../function/MyVar';
import {BoxPieSection} from '../atom';

class KostPenghuniChart extends React.PureComponent {
  render() {
    const {
      item,
      data,
      colorData,
      onPiePress,
      selectedPie,
      ...rest
    } = this.props;

    const pieData = data.map((item, index) => ({
      value: parseInt(item.quantity),
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
            marginTop: 10,
            flexDirection: 'row',
            height: 150,
            alignItems: 'center',
            paddingHorizontal: 0.05 * screenWidth,
          }}>
          <PieChart
            style={{
              width: 150,
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
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 10,
                alignItems: 'center',
              }}>
              <View
                style={{
                  height: 15,
                  width: 15,
                  backgroundColor: myColor.myblue,
                  marginRight: 10,
                }}></View>
              <Text style={styles.textTag}>Pria</Text>
            </View>
            <View style={{flexDirection: 'row', marginBottom: 10}}>
              <View
                style={{
                  height: 15,
                  width: 15,
                  backgroundColor: myColor.colorTheme,
                  marginRight: 10,
                }}></View>
              <Text style={styles.textTag}>Wanita</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default KostPenghuniChart;

const styles = StyleSheet.create({
  textTag: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
  },
});
