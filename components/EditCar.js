import React, { useState, useEffect, createClass } from 'react'
import { View, Text, TextInput, Button } from 'react-native';
import Styles from './Styles';
import { Route } from '@react-navigation/native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { getAuth, onAuthStateChanged} from "firebase/auth";
import { initialCarData } from '../firebase/Config';
import {firebase, onSnapshot, orderBy, query, QuerySnapshot, firestore, collection, addDoc, ADDEVENT, serverTimestamp, signInWithEmailAndPassword} from '../firebase/Config'
import {getFirestore, doc, deleteDoc, getDocs, where} from "firebase/firestore";        //tämä piti olla tässä muuten meni delete vituiksi, siirto omalla vastuulla
import { convertFirbaseTimeStampToJS } from '../Helpers/TimeStamp';



export default function EditCar({route, navigation, allEvents}) {
  
   
  /* console.log("allevents",route.params?.allEvents)
  */
  const auth = getAuth();
const [carMake, setCarMake] = useState('')
const [carData, setCarData] = useState('')
const [loggedUser, setLoggedUser] = useState('')
const [carModel, setCarModel] = useState('');
const [prices, setPrices] = useState([]);
const [allPrices, setAllPrices] = useState (0);

//console.log("prices",prices)
useEffect(() => {  //Tämä hakee datan firebasesta, vai hakeeko?
  calculatePrice()
  setPrices(route.params?.allEvents)

  if(route.params?.loggedUser) { // muoks oli pricve
    //setCarMake('')
      getData();
      /* const newLitres = {litres: route.params.litres};
      const newMileage = {mileage: route.params.mileage};
      const newPrice = {price: route.params.price};
      const newWash = {wash: route.params.wash};
      const newUser = {user: route.params.userID}
      toFireBase(newLitres, newMileage, newPrice, newWash, newUser.user);
       */
  }
    //getData();
},[])

  const calculatePrice = (async) => {
    var totalPrice = 0;
    for(let i = 0; i < prices.length; i++) {
      var price2 = parseInt(prices[i].price)
      const newTotalPrice = totalPrice + price2
      //console.log("newTotalPrice",newTotalPrice)
      totalPrice =+ newTotalPrice;
      }
      //console.log("totalPrice",totalPrice)
      setAllPrices(totalPrice);     
}

console.log("allPrices",allPrices)


const getData = async() => {   
 // console.log("loggeduser", route.params?.loggedUser)                   //useEffect kutsuuu tätä fuktioa avuksi hakemaan dataa
  setLoggedUser(route.params?.loggedUser);
  const q = query(collection(firestore,initialCarData), /* where("user", "==", loggedUser ), */ orderBy('created','desc'))
  const unsubscribe = onSnapshot(q,(querySnapshot) => {
   const tempMessages = [] 
   setCarData([])
   querySnapshot.forEach((doc) => {
   // console.log("tötö")
     const messageObject = {
       id: doc.id,                           //luetaan firebasesta automaattinen avain
       carModel: doc.data().carModel, 
       carMileage: doc.data().carMileage,
       carMake: doc.data().data, 
       created: convertFirbaseTimeStampToJS(doc.data().created),
       user: doc.data().user
     }
    // console.log("messageobjekti", messageObject)
     tempMessages.push(messageObject)
    // console.log("tempmessages", tempMessages)
     //carData.push(messageObject)
   })
   //console.log("autonData", tempMessages)

   setCarData(tempMessages)
   //setCarModel(carData.carModel)
  //console.log("autonmodel", carModel)
   //console.log("cardata", carData)
   //console.log("autonDatamodel", carData[0].carMake) 
   //console.log("Testi 3", route.params.)
 })   
 return () => {
   unsubscribe()
   console.log("returin")
 }
}


onAuthStateChanged(auth, (user) => {        //Tämä hakee firebasesta kirjautuneen käyttäjän
  if (user) {
    const uid = user.uid;
    setLoggedUser(uid);
    //setCarData(user.displayName)
  } else {
    console.log("Ei ole kirjautunut")
  }
});  
  
 //console.log(route.params?.carData)
      if (carData == ''){
        return (<View>

          <Text>asf </Text>
          </View>)
      }
      if (carData != '') {
        return(
        <View>

            
            <Text> Rekisterinumero {route.params?.carData}</Text> 
            
            {carData != null && <Text> Auton merkki {carData[0].carMake} </Text>}
 
            <TextInput  
            sstyle={{flex: 0.75}}
            onChangeText={text => setCarMake(text)}
            value={carMake}
            keyboardType='email-address'
            placeholder="Tähän uusi merkki tarvitaanko tätä??"       
            />
              {carData != [] &&<Text> Auton Malli {carData[0].carModel}</Text> }
            {carData != [] &&<Text> Ajokilometrit {carData[0].carMileage}</Text> }
            {carData != [] &&<Text> Käyttöönottopäivä {carData[0].created}</Text> } 
            {carData != [] &&<Text> Kokonaiskustannukset {route.params?.allEvents.price}</Text> }  





            </View>

    )
      
}}



