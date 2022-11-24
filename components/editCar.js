import React, { useState, createClass } from 'react'
import { View, Text, TextInput, Button } from 'react-native';
import Styles from './Styles';
import { Route } from '@react-navigation/native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { getAuth, onAuthStateChanged} from "firebase/auth";


export default function editCar({route, navigation}) {
 
const [carMake, setCarMake] = useState('')

useEffect(() => {  //Tämä hakee datan firebasesta, vai hakeeko?
  setLogged(true)      //tämä lisätty
  if(route.params?.car) { // muoks oli pricve
      getData();
      const newLitres = {litres: route.params.litres};
      const newMileage = {mileage: route.params.mileage};
      const newPrice = {price: route.params.price};
      const newWash = {wash: route.params.wash};
      const newUser = {user: route.params.userID}
      toFireBase(newLitres, newMileage, newPrice, newWash, newUser.user);
      
  }
    getData();
},[route.params?.price])
const getData = async() => {                                      //useEffect kutsuuu tätä fuktioa avuksi hakemaan dataa
  const q = query(collection(firestore,ADDEVENT), where("user", "==", route.params?.login5 ), orderBy('created','desc'))
  const unsubscribe = onSnapshot(q,(querySnapshot) => {
   const tempMessages = [] 
   querySnapshot.forEach((doc) => {
     const messageObject = {
       id: doc.id,                           //luetaan firebasesta automaattinen avain
       litres: doc.data().data.litres, 
       mileage: doc.data().mileage.mileage,  
       price: doc.data().price.price, 
       wash: doc.data().wash.wash,
       created: convertFirbaseTimeStampToJS(doc.data().created),
       user: doc.data().user
     }
     tempMessages.push(messageObject)
   })  
   setAllEvents(tempMessages)
 })  
 return () => {
   unsubscribe()
   
 }
}
  
  console.log(route.params?.carData)
    return(
        <View>

            <Text> </Text>
            <Text> Rekisterinumero {route.params?.carData}</Text> 
            
            <Text> Auton merkki {carMake}</Text> 
            <TextInput  
            sstyle={{flex: 0.75}}
            onChangeText={text => setCarMake(text)}
            value={carMake}
            keyboardType='email-address'
            placeholder="Tähän uusi merkki"       
            />
            <Text> Auton Malli {route.params?.carData}</Text> 
            <Text> Ajokilometrit {route.params?.carData}</Text> 
            <Text> Käyttöönottopäivä {route.params?.carData}</Text> 





            </View>

    )
  
}



