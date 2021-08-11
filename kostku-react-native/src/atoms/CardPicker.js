import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {myColor, defaultAsset, screenWidth} from '../function/MyVar';
import Modal from 'react-native-translucent-modal';
import {PureModal} from '../components';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CardPicker = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedLabel, setselectedLabel] = useState(props.placeholder);

  useEffect(() => {
    // console.log(`PICKER ${props.placeholder}`);
    if (props.data.length > 0) {
      if (props.data.some((arrayData) => arrayData.id == props.selectedValue)) {
        let namalabel = props.data.find((x) => x.id == props.selectedValue)[
          props.itemName
        ];
        setselectedLabel(namalabel);
      } else {
        // console.log(props.placeholder);
        if (props.selectedValue !== null) {
          console.log(props.placeholder);
          console.log('ga ketemu gan', props.selectedValue);
          setselectedLabel(props.placeholder);
          props.onChangeFunction(null);
        }
      }
    }
  }, [props.data, props.selectedValue]);

  let content;
  if (props.data.length > 0) {
    content = (
      <View>
        {props.data.map((item, index) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={index}
              disabled={props.disabled}
              onPress={() => {
                props.onChangeFunction(item.id);
                setShowModal(false);
              }}>
              <View
                style={{
                  height: 40,
                  borderBottomColor: myColor.divider,
                  borderBottomWidth: 1,
                  paddingHorizontal: 10,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'OpenSans-Regular',
                    fontSize: 12,
                    textTransform: 'capitalize',
                  }}>
                  {item[props.itemName]}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  } else {
    content = (
      <View
        style={{
          height: 40,

          borderBottomColor: myColor.divider,
          borderBottomWidth: 1,
          paddingHorizontal: 10,
          justifyContent: 'center',
          borderRadius: 10,
        }}>
        <Text>{props.placeholder}</Text>
      </View>
    );
  }

  return (
    <View>
      <Modal
        visible={showModal}
        transparent={true}
        onRequestClose={() => setShowModal(false)}>
        <PureModal>
          <View
            style={{
              maxHeight: '80%',
              width: '90%',
              backgroundColor: 'white',
              borderRadius: 5,
              paddingHorizontal: 5,
              paddingVertical: 5,
            }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {content}
            </ScrollView>
          </View>
        </PureModal>
      </Modal>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          setShowModal(true);
        }}>
        <View style={styles.wrapperField}>
          <View style={styles.wrapperCard}>
            <View style={styles.wrapperTitle}>
              {/* <Entypo name="calendar" size={20} color={myColor.grayGoogle} /> */}
              {props.children}
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'OpenSans-SemiBold',
                  color: myColor.darkText,
                  marginLeft: 3,
                }}>
                {props.title}
              </Text>
            </View>
            <Text
              style={{
                fontFamily: 'OpenSans-Regular',
                color: myColor.fbtx,
                fontSize: 12,
                textAlign: 'justify',
                textTransform: 'capitalize',
              }}>
              {selectedLabel}
            </Text>
            <AntDesign name="caretdown" size={12} color={myColor.grayGoogle} />
          </View>
          {props.pesanError !== null && (
            <Text
              style={{
                paddingLeft: 33,
                paddingRight: 10,
                fontFamily: 'OpenSans-SemiBold',
                color: myColor.alert,
                fontSize: 12,
              }}>
              {props.pesanError}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CardPicker;

const styles = StyleSheet.create({
  wrapperField: {
    marginBottom: 25,
  },
  wrapperCard: {
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: myColor.divider,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingRight: 10,
    paddingLeft: 33,
    position: 'relative',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wrapperTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: -22,
    left: 10,
  },
});
