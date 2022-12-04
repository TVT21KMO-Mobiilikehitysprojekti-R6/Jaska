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
  

  const auth = getAuth();
  const [carMake, setCarMake] = useState('')
  const [carData, setCarData] = useState('')
  const [loggedUser, setLoggedUser] = useState('')
  const [allPrices, setAllPrices] = useState (0);
  const [latestMileage, setLatestMileage] = useState (0);
  var currentMileage = 0
  var carDataVar = 0
  const [mileageSinceStart, setMileageSinceStart] = useState (0)


  useEffect(() => {  //Tämä hakee datan firebasesta, vai hakeeko?
    //setLoggedUser(route.params?.loggedUser);
    if(route.params?.loggedUser) {
        getData(); 
    }
  },[route.params?.loggedUser])

  const calculatePrice = (allEvents) => {
    var totalPrice = 0;
    for(let i = 0; i < allEvents.length; i++) {
      var price2 = parseInt(allEvents[i].price)
      const newTotalPrice = totalPrice + price2
      totalPrice =+ newTotalPrice;
    }
    setAllPrices(totalPrice);     
  }

  const averageConsumption = () => {
    var initialMileage = parseInt(carDataVar[0].carMileage)
    setMileageSinceStart (currentMileage-initialMileage)
  }

  const getLatestMileage = () => {
    var i=0
     currentMileage = route.params?.allEvents[i].mileage
    while (currentMileage == null){
      i++;
      currentMileage = route.params?.allEvents[i].mileage
    }
  }


  const getData = async() => {     
    getLatestMileage();
    
    //console.log("currenntt", currentMileage);
    calculatePrice(route.params?.allEvents);
    const q = query(collection(firestore,initialCarData),  where("user", "==", route.params?.loggedUser ),  orderBy('created','desc'))
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
      tempMessages.push(messageObject)
    })
    carDataVar = tempMessages
    setCarData(tempMessages)
    averageConsumption();

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







  if (carData == ''){
    return (
      <View>
      <Text>Joku on rikki </Text>
      </View>
    )
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
      {carData != [] &&<Text> Ajokilometrit sovelluksen käyttöönotossa {carData[0].carMileage}</Text> }
      {carData != [] &&<Text> Käyttöönottopäivä {carData[0].created}</Text> } 
      {carData != [] &&<Text> Kokonaiskustannukset {allPrices} €</Text> }
      {carData != [] &&<Text> Kokonaiskilometrit alusta {mileageSinceStart} </Text> }  
    </View>
    )
  }
}



