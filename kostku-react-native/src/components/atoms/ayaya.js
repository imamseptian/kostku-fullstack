<TouchableNativeFeedback
  key={index}
  onPress={() => {
    navigation.navigate('PenghuniScreen', {
      screen: 'DetailPenghuni',
      params: {
        penghuni: item,
      },
    });
  }}></TouchableNativeFeedback>;
