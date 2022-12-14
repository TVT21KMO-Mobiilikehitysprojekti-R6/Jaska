
import { View, Text, SafeAreaView, Button, TextInput, Pressable, Alert } from 'react-native'
import React, { useDebugValue, useState, useEffect, useLayoutEffect } from 'react'
import { convertFirbaseTimeStampToJS } from '../Helpers/TimeStamp';
import { toFireBase } from '../Helpers/toFireBase';
import {firebase, onSnapshot, orderBy, query, QuerySnapshot, firestore, collection, addDoc, ADDEVENT, serverTimestamp, signInWithEmailAndPassword} from '../firebase/Config'
import { getAuth, onAuthStateChanged, updateProfile  } from "firebase/auth";
import Styles from './Styles';
import { ScrollView } from 'react-native';
import { Modal } from 'react-native';
import { Feather } from '@expo/vector-icons';
import LoginPage from './LoginPage';
import {getFirestore, doc, deleteDoc, getDocs, where} from "firebase/firestore";        //tämä piti olla tässä muuten meni delete vituiksi, siirto omalla vastuulla
import  {SignOut} from '../Helpers/SignOut';
const db = getFirestore();         //tämä piti olla ehkä tässä muuten meni delete vituiksi, siirto omalla vastuulla ehkä


export default function MainPage({navigation, route, username, password}) {
  const [carData, setCarData] = useState("ABC-123");
  const [allEvents, setAllEvents] = useState([]);
  const [logged, setLogged] = useState(false);
  const [loggedUser, setLoggedUser] = useState("");
  const [editButtonPressed, setEditButtonPressed] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const auth = getAuth();
  const [washType, setWashType] = useState('')
  const [avgConsumptionShort, setAvgConsumptionShort] = useState (0)
  //const [displayName, setDisplayName] = useState('');


  const deleteThis= async (id) => {                //Tämä poistaa yhden eventin
    const docRef = doc(db, "ADDEVENT", id)
    deleteDoc(docRef)
    .then(() => {console.log("delete onnistui")})
    .catch(error => {
      console.log(error)
    })
    getData();
    setEditButtonPressed(!editButtonPressed)
  } 

  const toFireBase = async (litres,mileage,price,wash,userID, avgConsumptionShort) => {      //Tämä lisää firebaseen 
    var i = 0;
    var latestMileage = mileage.mileage
    var secondLatestMileage = 0;
    var latestFuel = litres.litres;
    
    while(isNaN(secondLatestMileage)|| secondLatestMileage == 0){
      i++
      secondLatestMileage = parseInt(allEvents[i].mileage)
      if(isNaN(secondLatestMileage) == true){ secondLatestMileage = 0 }
    }
    var mileageChange = latestMileage-secondLatestMileage
    var AVGC = (latestFuel/mileageChange*100).toFixed(2)


const toFireBase = async (litres,mileage,price,wash,userID, maintenance ) => {      //Tämä lisää firebaseen 
  const docRef = await addDoc(collection(firestore,ADDEVENT),{
    data: litres, mileage, price, wash, maintenance, 
    created: serverTimestamp(),
    user: userID,
  }).catch(error => console.log(error))
}


    const docRef = await addDoc(collection(firestore,ADDEVENT),{
      data: litres, mileage, price, wash, AVGC,
      created: serverTimestamp(),
      user: userID,
    }).catch(error => console.log(error))
  }


  onAuthStateChanged(auth, (user) => {        //Tämä hakee firebasesta kirjautuneen käyttäjän
    if (user) {
      //const uid = user.uid;
      setLoggedUser(user.uid);
      setCarData(user.displayName)
    } else {
      //console.log("Ei ole kirjautunut")
      navigation.navigate("LoginPage")
    }
  },);  


  useLayoutEffect( () => {              //Tämä lisää stack navigaattoriin napin
    navigation.setOptions({
        headerRight: () => (
            <Feather
              style={Styles.navButton}
              name="edit"
              size={24}
              color="black"
              onPress={ () => setEditButtonPressed(!editButtonPressed)}           //navigation.navigate('Edit')}
            />  
        ),  
    }) 
  }, [editButtonPressed])  

  useEffect((allEvents) => {  //Tämä hakee datan firebasesta, vai hakeeko?
    setLogged(true)      //tämä lisätty
    if(route.params?.price) { // muoks oli pricve
        getData()
        const newLitres = {litres: route.params.litres};
        const newMileage = {mileage: route.params.mileage};
        const newPrice = {price: route.params.price};
        const newWash = {wash: route.params.wash};
        const newUser = {user: route.params.userID}
      const newMaintenance = {maintenance: route.params.maintenance}
      toFireBase(newLitres, newMileage, newPrice, newWash, newUser.user, newMaintenance);
      // console.log("uusitestie", allEvents)
    }
      getData();
  },[route.params?.price])

  const averageConsumptionShort = async() => {
    var i = 0;
    var latestMileage = parseInt(allEvents[i].mileage)
    var secondLatestMileage = 0;
    var latestFuel = parseInt(allEvents[i].litres);
    var litres2 = 0;
    while(isNaN(latestMileage)){
      i++;
      latestMileage = parseInt(allEvents[i].mileage)
      if(isNaN(latestMileage) == true){ latestMileage = 0 }
    }
    while(isNaN(secondLatestMileage)|| secondLatestMileage == 0){
      i++
      secondLatestMileage = parseInt(allEvents[i].mileage)
      if(isNaN(secondLatestMileage) == true){ secondLatestMileage = 0 }
    }
    var mileageChange = latestMileage-secondLatestMileage

    while(isNaN(latestFuel)){
      i++;
      latestFuel = parseInt(allEvents[i].litres)
      if(isNaN(latestFuel) == true){ latestFuel = 0 }
    }
    while(litres2 == 0){
      i++
      litres2 = parseInt(allEvents[i].litres)
      if(isNaN(litres2) == true){ litres2 = 0 }
    }
    var litresChange = latestFuel - litres2
    console.log("litres1", latestFuel)
    console.log("milagecahge", mileageChange)

    setAvgConsumptionShort(latestFuel/mileageChange*100)
    console.log("avgcons", avgConsumptionShort)



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
        user: doc.data().user,
        maintenance: doc.data().maintenance.maintenance
      }
      tempMessages.push(messageObject)
    })  
    setAllEvents(tempMessages)
  })  
  return () => {
    unsubscribe()
    
  }

  const getData = async() => {      //useEffect kutsuuu tätä fuktioa avuksi hakemaan dataa           
    const q = query(collection(firestore,ADDEVENT), where("user", "==", route.params?.loggedUser2 ), orderBy('created','desc'))
    const unsubscribe = onSnapshot(q,(querySnapshot) => {
      const tempMessages = [] 
      querySnapshot.forEach((doc) => {
        const messageObject = {
          id: doc.id,                           //luetaan firebasesta automaattinen avain
          litres: doc.data().data.litres, 
          mileage: doc.data().mileage.mileage,  
          price: doc.data().price.price, 
          wash: doc.data().wash.wash,
          AVGC: doc.data().AVGC,
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
  const newErrorHandle = (event) => {              //Tämä on modalin käyttöfunktio
  setModalVisible(!modalVisible)
  navigation.navigate('maintenance', {testKey: event})
  }


  const newFuelerHandle = (event) => {              //Tämä on modalin käyttöfunktio
    setModalVisible(!modalVisible)
    navigation.navigate('AddNewEvent', {testKey: event})
  }


    if ( logged){
    return(
      <View style={Styles.container}>
          {editButtonPressed != false && <Pressable style={Styles.button} 
          onPress={() => navigation.navigate('editCar', {carData: carData, loggedUser: loggedUser, allEvents: allEvents}) }>
          <Text style={Styles.textStyle}>Muokkaa autoa</Text>
          </Pressable>}
          {editButtonPressed != false && <Pressable style={Styles.button} 
          onPress={() => SignOut() }>
          <Text style={Styles.textStyle}>Kirjaudu ulos</Text>
          </Pressable>}
      

        <View style={Styles.ScrollView}>
          <View style={Styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
              }}>
              <View style={Styles.centeredView}>
                <View style={Styles.modalView}>
                  <Text style={Styles.modalText}>Valitse tapahtuma, </Text>
                  <Text style={Styles.modalText}>jonka haluat lisätä.</Text>
                  <Pressable
                    style={[Styles.button, Styles.button]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={Styles.textStyle}>Hide Modal</Text>
                  </Pressable>
                  <Pressable
                    style={[Styles.button, Styles.button]}
                    onPress={() => newFuelerHandle('fuel')}>
                    <Text style={Styles.textStyle}>Uusi Tankkaus</Text>
                  </Pressable>
                  <Pressable
                    style={[Styles.button, Styles.button]}
                    onPress={() => newFuelerHandle('wash')}>
                    <Text style={Styles.textStyle}>Uusi Pesu</Text>
                  </Pressable>
                  <Pressable
                    style={[Styles.button, Styles.button]}
                    onPress={() => newErrorHandle('maintenance')}>
                    <Text style={Styles.textStyle}>Uusi huolto</Text>
                  </Pressable>
                </View>
              </Modal>
            </View>

            <ScrollView>


                {
                  allEvents.map((id) => (
                    <View style={Styles.allEventsList} key={id.id}>
                      <View>
                        {id.price!= null && <Text style={Styles.listText}>{id.price}€</Text>}
                        {id.litres!= null && <Text style={Styles.listText}>Keskikulutus { id.AVGC } L/100km</Text>}
                        {id.wash == 1 && <Text style={Styles.listText}>Sisäpesu</Text>}
                        {id.wash == 2 && <Text style={Styles.listText}>Ulkopesu</Text>}
                        {id.litres!= null && <Text style={Styles.listText}>Tankkaus {id.litres}L</Text>}
                        {id.maintenance!= null && <Text style={Styles.listText}>{id.maintenance} Huolto</Text>}

                      </View>
                      <View>
                        <Text style={Styles.listText}>{id.created}</Text> 
                        {id.mileage!= null && <Text style={Styles.listText}>{id.mileage}Km</Text>}
                      </View>

                      
                      {editButtonPressed != false && <View> 
                          <Pressable style={Styles.button} onPress={() => deleteThis(id.id) }>
                            <Text style={Styles.textStyle}>Poista</Text>
                          </Pressable> 
                        </View>}
                      
                    </View>               
                    ))
                }
                </ScrollView>
                
          </View>
  <Pressable style={Styles.button}  onPress={() => setModalVisible(true)}>
    <Text style={Styles.textStyle}>Lisää tapahtuma</Text>
  </Pressable>

      </View>

    )
  }else {
    console.log("EI onnistu");
  };
} 

