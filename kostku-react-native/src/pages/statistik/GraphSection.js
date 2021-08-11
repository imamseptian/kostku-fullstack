import React, {PureComponent} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {Circle} from 'react-native-svg';
import {Grid, LineChart, XAxis, YAxis} from 'react-native-svg-charts';
import {
  formatRupiah,
  myColor,
  dataBulan,
  screenWidth,
} from '../../function/MyVar';
class GraphSection extends PureComponent {
  render() {
    // const {
    //   data,

    //   graphLine,
    //   onDotPress,
    //   selectedDot,
    //   children,
    //   ...rest
    // } = this.props;
    const axesSvg = {fontSize: 10, fill: 'grey'};
    const verticalContentInset = {top: 10, bottom: 10, left: 10, right: 10};
    const xAxisHeight = 10;

    const Decorator = ({x, y}) => {
      return this.props.graphLine.map((value, index) => (
        <Circle
          key={index}
          cx={x(index)}
          cy={y(value)}
          r={6}
          onPress={() => {
            this.props.onDotPress(index);
          }}
          stroke={myColor.fbtx}
          fill={this.props.selectedDot == index ? myColor.colorTheme : '#fff'}
        />
      ));
    };

    return (
      <View style={{marginBottom: 10}}>
        <View style={{alignItems: 'center'}}>{this.props.children}</View>

        <View
          style={{
            height: this.props.graphLine.length < 2 ? 100 : 200,
            paddingHorizontal: 0.05 * screenWidth,
            flexDirection: 'row',
            position: 'relative',
          }}>
          <YAxis
            data={this.props.graphLine}
            formatLabel={(value, index) => {
              // return 'aaa';
              let strVal = value.toString();
              if (strVal.length > 6) {
                let jutaan = value / 1000000;
                return jutaan.toString() + ' Juta';
              } else {
                let dataku = formatRupiah(value.toString());
                return dataku;
              }
            }}
            style={{marginBottom: xAxisHeight}}
            contentInset={verticalContentInset}
            svg={axesSvg}
          />
          <View style={{flex: 1, marginLeft: 10}}>
            <LineChart
              style={{flex: 1}}
              data={this.props.graphLine}
              contentInset={verticalContentInset}
              svg={{stroke: myColor.myblue}}>
              <Grid />
              <Decorator />
            </LineChart>
            <XAxis
              style={{marginHorizontal: -10, height: xAxisHeight}}
              data={this.props.graphLine}
              formatLabel={(value, index) => {
                let tanggal_pendapatan = new Date(
                  this.props.data[index].tanggal_transaksi,
                );
                return dataBulan[tanggal_pendapatan.getUTCMonth()].sort;
                return 'AAA';
                // return tanggal_pendapatan.getUTCMonth();
              }}
              contentInset={{left: 10, right: 10}}
              svg={axesSvg}
            />
          </View>
          {this.props.isLoading && (
            <ActivityIndicator
              size="large"
              color={myColor.myblue}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
          )}
        </View>

        {/* <View style={{height: 50, backgroundColor: 'red'}}></View> */}
      </View>
    );
  }
}

export default GraphSection;
