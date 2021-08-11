import React from 'react';
import {StyleSheet, View} from 'react-native';
import Svg, {
  Circle,
  Ellipse,
  G,
  Text,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Image,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from 'react-native-svg';
import {APIUrl, myColor, screenHeight, screenWidth} from '../../function/MyVar';

const CobaSvg = () => {
  return (
    <View>
      <Svg
        height={200}
        width={screenWidth}
        // viewBox="0 0 100 100"
        style={{backgroundColor: myColor.myblue}}>
        <Circle
          cx={100}
          cy={50}
          r={50}
          stroke="blue"
          strokeWidth="2.5"
          fill="green"
          onPress={() => alert('ASO')}
        />
        {/* <Rect
          x="15"
          y="15"
          width="70"
          height="70"
          stroke="red"
          strokeWidth="2"
          fill="yellow"
        /> */}
      </Svg>
    </View>
  );
};

export default CobaSvg;

const styles = StyleSheet.create({});
