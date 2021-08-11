import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Platform, Button} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const MyDatePicker = () => {
  // const [date, setDate] = useState(new Date(1598051730000));
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const getBulan = () => {
    let month = date.getMonth() + 1;

    alert(month);
  };

  return (
    <View>
      <View>
        <Button onPress={showDatepicker} title="Show date picker!" />
      </View>
      <View>
        <Button onPress={showTimepicker} title="Show time picker!" />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="spinner"
          onChange={onChange}
        />
      )}

      {/* <Text>{JSON.stringify(date)}</Text> */}
      <Text>{date.toString()}</Text>
      <Button
        title="ayaya"
        onPress={() => {
          getBulan();
        }}
      />
    </View>
  );
};

export default MyDatePicker;

const styles = StyleSheet.create({});
