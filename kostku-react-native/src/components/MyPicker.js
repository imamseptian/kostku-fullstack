import React, {forwardRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Modal,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {screenWidth, screenHeight, myColor} from '../function/MyVar';

const MyPicker = forwardRef((props, ref) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedLabel, setselectedLabel] = useState('');

  useEffect(() => {
    console.log('fungsi mypicker' + props.title);
    if (props.data.some((arrayData) => arrayData.id === props.selectedValue)) {
      console.log('ketemu gan');
      let namalabel = props.data.find((x) => x.id === props.selectedValue)[
        props.itemName
      ];
      setselectedLabel(namalabel);
    } else {
      console.log('ga ketemu gan');
      setselectedLabel(props.placeholder);
      props.onChangeFunction(undefined);
    }
  }, [props.data, props.selectedValue]);

  let content;
  if (props.data.length > 0) {
    content = (
      <View>
        {props.data.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                props.onChangeFunction(item.id);
                setShowModal(false);
                // if (props.data.some((person) => person.id === 0)) {
                //   alert('Object found inside the array.');
                // } else {
                //   alert('Object not found.');
                // }
              }}>
              <View
                style={{
                  height: 40,
                  width: 0.88 * screenWidth,
                  borderBottomColor: myColor.divider,
                  borderBottomWidth: 1,
                  paddingHorizontal: 10,
                  justifyContent: 'center',
                }}>
                <Text>{item[props.itemName]}</Text>
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
          width: 0.88 * screenWidth,
          borderBottomColor: myColor.divider,
          borderBottomWidth: 1,
          paddingHorizontal: 10,
          justifyContent: 'center',
        }}>
        <Text>{props.placeholder}</Text>
      </View>
    );
  }

  return (
    <View style={styles.formWrapper}>
      <Modal
        visible={showModal}
        transparent={true}
        onRequestClose={() => setShowModal(false)}>
        <View style={styles.background}>
          <View style={styles.modalBody}>
            {/* <View
                style={{
                  backgroundColor: 'yellow',
                  height: 40,
                  width: 0.8 * screenWidth,
                }}></View> */}

            <ScrollView showsVerticalScrollIndicator={false}>
              {content}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Text style={styles.titleField}>{props.title}</Text>
      <TouchableOpacity
        disabled={props.disabled != undefined ? props.disabled : false}
        onPress={() => setShowModal(true)}>
        <View style={styles.formField}>
          <Text style={styles.textAwalan}>
            {/* {props.data.some(
              (arrayData) => arrayData.id === props.selectedValue,
            )
              ? props.data.find((x) => x.id === props.selectedValue)[
                  props.itemName
                ]
              : props.placeholder} */}
            {selectedLabel}
          </Text>
        </View>
      </TouchableOpacity>
      {props.pesanError != '' ? (
        <Text style={styles.textError}>{props.pesanError}</Text>
      ) : null}
    </View>
  );
});

export default MyPicker;

const styles = StyleSheet.create({
  formWrapper: {
    marginHorizontal: 0.05 * screenWidth,
    marginBottom: 5,
  },
  titleField: {
    marginLeft: 10,
    marginBottom: 5,
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 12,
  },
  formField: {
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: myColor.divider,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textError: {
    marginLeft: 10,
    color: myColor.alert,
    fontSize: 12,
    fontFamily: 'OpenSans-SemiBold',
  },
  awalan: {
    borderRightWidth: 1,
    borderRightColor: myColor.divider,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10,
  },
  textAwalan: {
    fontSize: 12,
    fontFamily: 'OpenSans-SemiBold',
  },
  textInput: {
    flex: 1,
    height: 40,
    paddingLeft: 10,
    fontSize: 12,
    fontFamily: 'OpenSans-SemiBold',
  },
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalBody: {
    paddingTop: 10,
    width: screenWidth * 0.88,
    borderRadius: 5,
    backgroundColor: 'white',
    elevation: 5,
    maxHeight: 0.8 * screenHeight,
    alignItems: 'center',
  },
});
