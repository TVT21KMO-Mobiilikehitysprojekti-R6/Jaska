import React, { useState, createClass } from 'react'
import { View, Text, TextInput, Button } from 'react-native';
import Styles from './Styles';
import { Route } from '@react-navigation/native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { getAuth, onAuthStateChanged} from "firebase/auth";


export default function AddNewEvent({route, navigation}) {
  const [litres, onChangeLitres] = useState(null);
  const [mileage, onChangeMileage] = useState(null);
  const [price, onChangePrice] = useState(null);
  const [wash, onChangeWash] = useState(0);
  const [userID, setUserID] = useState(null);
  const auth = getAuth();
  const user = auth.currentUser;
  var radio_props = [
    {label: 'Ulkopesu', value: 0 },
    {label: 'Sisäpesu', value: 1 }
  ]

  onAuthStateChanged(auth, (user) => {        //Tämä hakee firebasesta kirjautuneen käyttäjän
    if (user) {
      const uid = user.uid;
      setUserID(user.uid);
      console.log("käyttäjä ADDEVENT SIVULLA " +uid)
    } else {
      console.log("Ei ole kirjautunut")
    }
  });  
  

  const acceptEvent = (event) => {        
    if (event === '') {
        alert('Something went wrong!!')
        console.log("tyhjä lisäys kenttä")
    } if (event === 'fuel') {
        navigation.navigate('MainPage', {litres: litres, mileage: mileage, price: price, wash: wash, userID: userID})
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
          <Pressable 
            style={Styles.button} 
            onPress={()=> acceptEvent('wash')}>
              <Text style={Styles.buttonText}>Lisää pesu</Text>
          </Pressable>
      </View>
    ) }
  return (
      <View>
        <Text>Ei toimi</Text>
    </View>
  )
}



