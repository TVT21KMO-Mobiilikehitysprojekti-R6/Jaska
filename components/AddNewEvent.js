import React, { useState, createClass } from 'react'
import { View, Text, TextInput, Button } from 'react-native';
import Styles from './Styles';
import { Route } from '@react-navigation/native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';


export default function AddNewEvent({route, navigation}) {
  const [text, onChangeText] = React.useState('Useless Text');
  const [litres, onChangeLitres] = React.useState(null);
  const [mileage, onChangeMileage] = React.useState(null);
  const [price, onChangePrice] = React.useState(null);
  const [wash, onChangeWash] = React.useState(null);

  var radio_props = [
    {label: 'Ulkopesu', value: 0 },
    {label: 'Sisäpesu', value: 1 }
  ]

  const acceptEvent = (event) => {
    if (event === '') {
        alert('Somethin went wrong!!')
        console.log("tyhjä lisäys kenttä")
    } if (event === 'fuel') {
        navigation.navigate('MainPage', {litres: litres, mileage: mileage, price: price, wash: wash})
    } if (event === 'wash') {
      navigation.navigate('MainPage', {wash: wash, price: price, litres: litres, mileage: mileage})
  }   
}
    const status = route.params.testKey
    if (status == 'fuel') {
  return (
    <View style={Styles.centeredView}>
        <Text>Lisätään tankkaus</Text>
        <Text></Text>
        <Text>Anna litrat</Text>
          <TextInput
            style={Styles.baitWindowText}
            onChangeText={onChangeLitres}
            value={litres}
            placeholder="Tähän litrat"
            keyboardType="numeric"
          />
       <Text>Anna Kilometrit</Text>
            <TextInput
              style={Styles.baitWindowText}
              onChangeText={onChangeMileage}
              value={mileage}
              placeholder="Tähän kilometrit"
              keyboardType="numeric"
            />
            <Text>Anna Hinta</Text>
            <TextInput
              style={Styles.baitWindowText}
              onChangeText={onChangePrice}
              value={price}
              placeholder="Tähän tankkauksen hinta"
              keyboardType="numeric"
            />

        <Text>{route.params.testKey}</Text>
        {/* <Text>{litres}</Text> */}

    <Button title= "Lisää tankkaus"
            style={Styles.button} 
            onPress={ ()=> acceptEvent('fuel') }>Lisää tankkaus</Button>
    </View>
  ) }


  if (status == 'wash') {
    return (
      <View style={Styles.centeredView}>
          <Text style={{margin:10}}>Lisätään pesu</Text>
          <Text>Anna pesun hinta</Text>
            <TextInput
              style={Styles.baitWindowText}
              onChangeText={onChangePrice}
              value={price}
              placeholder="Tähän hinta"
              keyboardType="numeric"/>
              <Text></Text>
         <Text>Anna pesun tyyppi</Text>
         <RadioForm
            radio_props={radio_props}
            initial={0}
            buttonColor={'black'}
            selectedButtonColor = 'black'
            
            
            onPress={(value) => onChangeWash(value)}
          />
          <Text>{wash}</Text>
          
          
              <Pressable style={Styles.button} onPress={()=> acceptEvent('wash')}><Text style={Styles.buttonText}>Lisää pesu</Text></Pressable>
             
          
      </View>
    ) }
  return (
      <View>
        <Text>Ei toimi</Text>
    </View>
  )
}



