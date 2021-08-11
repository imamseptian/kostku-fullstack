import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {PieChart} from 'react-native-svg-charts';
import {myColor, screenWidth} from '../../../function/MyVar';
import {BoxPieSection} from '../atom';

class KostDaerahChart extends React.PureComponent {
  render() {
    const {
      item,
      data,
      colorData,
      onPiePress,

      title,
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
      <View
        style={{
          paddingHorizontal: 0.05 * screenWidth,
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 14,
            fontFamily: 'OpenSans-Bold',
          }}>
          {title}
        </Text>
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',

            height: 150,
            flexGrow: 1,
            alignItems: 'center',
            // backgroundColor: 'red',
          }}>
          <PieChart
            style={{
              width: 150,
            }}
            data={pieData}
          />

          <View style={{marginLeft: 10}}>
            {data.map((x, i) => {
              return (
                <BoxPieSection
                  key={i}
                  data={x}
                  // keyword={i === data.length - 1 ? 'etc' : this.props.daerah}
                  keyword={
                    data.length < 6
                      ? this.props.daerah
                      : [i === data.length - 1 ? 'etc' : this.props.daerah]
                  }
                  // keyword={() => {
                  //   if (data.length < 7) {
                  //     return this.props.daerah;
                  //   } else {
                  //     if (i === data.length - 1) {
                  //       return 'etc';
                  //     } else {
                  //       return this.props.daerah;
                  //     }
                  //   }
                  // }}
                  color={colorData[i]}
                  onPress={() => {
                    onPiePress(i);
                  }}
                />
              );
            })}
          </View>
        </View>
      </View>
    );
  }
}

export default KostDaerahChart;

const styles = StyleSheet.create({
  tagBox: {
    height: 20,
    width: 20,

    marginBottom: 8,
  },
});
