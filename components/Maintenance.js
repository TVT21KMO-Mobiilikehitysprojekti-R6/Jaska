import React, { useState, createClass } from 'react'
import { View, Text, TextInput, Button } from 'react-native';
import Styles from './Styles';
import { Route } from '@react-navigation/native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { getAuth, onAuthStateChanged} from "firebase/auth";


export default function Maintenance({route, navigation}) {
  const [maintenance, onChangetMaintenance] = useState(null)
  const [mileage, onChangeMileage] = useState(null);
  const [price, onChangePrice] = useState(null);
  const [userID, setUserID] = useState(null);
  const [litres, onChangeLitres] = useState(null);
  const [wash, onChangeWash ] = useState(null);
  const auth = getAuth();
  const user = auth.currentUser;

  onAuthStateChanged(auth, (user) => {        //Tämä hakee firebasesta kirjautuneen käyttäjän
    if (user) {
      const uid = user.uid;
      setUserID(user.uid);
      //console.log("käyttäjä ADDEVENT SIVULLA " +uid)
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
      navigation.navigate('MainPage', {litres: litres, mileage: mileage, price: price, wash: wash, userID: userID})
    }   
      if (event === 'maintenance') {
        navigation.navigate('MainPage', {litres: litres, mileage: mileage, price: price, wash: wash, userID: userID, maintenance: maintenance})
    }   
}
      const status = route.params.testKey 
    if (status == 'maintenance') {
  return (
    <View style={Styles.centeredView}>
        <Text>Lisätään huolto</Text>
        <Text></Text>
        <Text>Kuvaus</Text>
          <TextInput
            style={Styles.baitWindowText}
            onChangeText={onChangetMaintenance}
            value={maintenance}
            placeholder="Tähän kuvaus"
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
        placeholder="Tähän huollon hinta"
        keyboardType="numeric"
      />
      <Button title= "Lisää huolto"
            style={Styles.button} 
            onPress={ ()=> acceptEvent('maintenance') }>Lisää tankkaus</Button>
    </View>
  ) }


  

  return (
      <View>
        <Text>Ei toimi vai</Text>
    </View>
  )
}



