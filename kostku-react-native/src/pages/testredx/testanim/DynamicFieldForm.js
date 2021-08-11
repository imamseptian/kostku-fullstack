import React, {useState} from 'react';
import {StyleSheet, View, Button} from 'react-native';
import {Text, TextInput} from 'react-native-paper';

const DynamicFieldForm = () => {
  const [inputList, setInputList] = useState([{firstName: '', lastName: ''}]);

  const [orang, setOrang] = useState({
    name: 'Imam',
    umur: 21,
    harta: {
      har1: 'emas',
      har2: 'uang',
    },
  });

  // handle input change
  const handleInputChange = (e, index, inputType) => {
    // const {name, value} = e.target;
    const list = [...inputList];
    // console.log(list[0][inputType]);
    list[index][inputType] = e;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, {firstName: '', lastName: ''}]);
  };

  const [kamar, setKamar] = useState({
    nama: '',
    harga: '',
    fasilitas: {
      fas1: 'kasur',
      fas2: 'toilet',
    },
  });
  return (
    <View style={styles.container}>
      {/* <Text>Form</Text>

      <View style={styles.formWrapper}>
        <TextInput
          mode="outlined"
          label="Nama Kost"
          placeholder="Nama Kost"
          theme={{colors: {primary: '#6c5ce7'}}}
          style={{fontSize: 14, backgroundColor: 'white'}}
          onChangeText={(value) => {
            console.log('a');
          }}
        />
      </View> */}

      {inputList.map((x, i) => {
        return (
          <View key={i} style={{flexDirection: 'row'}}>
            <TextInput
              mode="outlined"
              label="FirstName"
              placeholder="FirstName"
              value={x.firstName}
              theme={{colors: {primary: '#6c5ce7'}}}
              style={{
                fontSize: 14,
                backgroundColor: 'white',
                width: 100,
                marginRight: 20,
              }}
              onChangeText={(e) => handleInputChange(e, i, 'firstName')}
            />
            <TextInput
              mode="outlined"
              label="LastName"
              placeholder="LastName"
              value={x.lastName}
              theme={{colors: {primary: '#6c5ce7'}}}
              style={{fontSize: 14, backgroundColor: 'white', width: 100}}
              onChangeText={(e) => handleInputChange(e, i, 'lastName')}
            />
            {inputList.length !== 1 && (
              <Button title="Remove" onPress={() => handleRemoveClick(i)} />
            )}
            {inputList.length - 1 === i && (
              <Button title="Add" onPress={() => handleAddClick()} />
            )}
          </View>
        );
      })}

      <Text>{JSON.stringify(inputList)}</Text>
      <Button title="Cek Nama" onPress={() => console.log(inputList)} />
      <View style={{marginTop: 10}}>
        <Button
          title="Tambah Harta"
          onPress={() =>
            setOrang({
              ...orang,
              harta: {
                ...orang['harta'],
                harta3: 'rumah',
              },
            })
          }
        />
      </View>
      <View style={{marginTop: 10}}>
        <Button title="Cek Harta" onPress={() => console.log(orang)} />
      </View>
    </View>
  );
};

export default DynamicFieldForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  formWrapper: {
    backgroundColor: 'yellow',
    width: 300,
    flex: 1,
    paddingHorizontal: 20,
  },
});
