
import { View, Text, SafeAreaView, Button, TextInput, Pressable, Alert } from 'react-native'
import React, { useDebugValue, useState, useEffect, useLayoutEffect } from 'react'
import { convertFirbaseTimeStampToJS } from '../Helpers/TimeStamp';
import {firebase, onSnapshot, orderBy, query, QuerySnapshot, firestore, collection, addDoc, ADDEVENT, serverTimestamp, signInWithEmailAndPassword} from '../firebase/Config'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Styles from './Styles';
import { ScrollView } from 'react-native';
import { Modal } from 'react-native';
import { Feather } from '@expo/vector-icons';
import LoginPage from './LoginPage';
import {getFirestore, doc, deleteDoc, getDocs, where} from "firebase/firestore";        //tämä piti olla tässä muuten meni delete vituiksi, siirto omalla vastuulla

const db = getFirestore();         //tämä piti olla ehkä tässä muuten meni delete vituiksi, siirto omalla vastuulla ehkä


export default function MainPage({navigation, route, login5, username, password}) {
  const carData = "ABC-123"
  const [allEvents, setAllEvents] = useState([]);
  const [logged, setLogged] = useState(false);
  const [loggedUser, setLoggedUser] = useState("");
  const [editButtonPressed, setEditButtonPressed] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
const auth = getAuth();


 const deleteThis= async (id) => {                //Tämä poistaa yhden eventin
    const docRef = doc(db, "ADDEVENT", id)
  deleteDoc(docRef)
  .then(() => {console.log("delete onnistui")})
  .catch(error => {
    console.log(error)
  })
} 

const toFireBase = async (litres,mileage,price,wash,userID ) => {      //Tämä lisää firebaseen 
  //console.log("toFirebase")
  const docRef = await addDoc(collection(firestore,ADDEVENT),{
    data: litres, mileage, price, wash, 
    created: serverTimestamp(),
    user: userID,
  }).catch(error => console.log(error))
}

/* const getUserID = async () => { 
onAuthStateChanged(auth, (user) => {        //Tämä hakee firebasesta kirjautuneen käyttäjän
      if (user) {
        const uid = user.uid;
        console.log(uid);
        setLoggedUser(uid);
      } else {
        console.log("Ei ole kirjautunut")
      }
    });  
} */


const editButton= () =>{            //tämä laittaa poista napit näkyviin
      setEditButtonPressed(true);
    }


useLayoutEffect( () => {              //Tämä lisää stack navigaattoriin napin
  navigation.setOptions({
      headerRight: () => (
          <Feather
              style={Styles.navButton}
              name="edit"
              size={24}
              color="black"
              onPress={ () => editButton()}           //navigation.navigate('Edit')}
          />  
      ),  
  }) 
}, [])  

/* useEffect( () => {        //Tällä katsotaan kirjautunut käyttäjä?? tätä ei ehkä tarvii enään, koska tuo oikea tapa hakea kirjautunut käyttäjä on yllä
  if(route.params?.login5) {
      setLogged(true)  
      console.log("logged = ", route.params?.login5) 
  }
},[route.params?.login5]) */

useEffect(() => {  //Tämä hakee datan firebasesta, vai hakeeko?
  setLogged(true)      //tämä lisätty
  if(route.params?.userID) { // muoks oli pricve
      //getUserID();
      getData();
      const newLitres = {litres: route.params.litres};
      const newMileage = {mileage: route.params.mileage};
      const newPrice = {price: route.params.price};
      const newWash = {wash: route.params.wash};
      const newUser = {user: route.params.userID}
      console.log(newUser)
      toFireBase(newLitres, newMileage, newPrice, newWash, newUser.user);
  }
  //getUserID();
    getData();
},[route.params?.userID])// muoks oli price

const getData = async() => {                                      //useEffect kutsuuu tätä fuktioa avuksi hakemaan dataa
 console.log("looggden in getdata " + route.params?.login5)
  const q = query(collection(firestore,ADDEVENT), where("user", "==", route.params?.login5 ), orderBy('created','desc'))
  const querySnapshot = await getDocs(q); 
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
  
   /*const q = query(collection(firestore,ADDEVENT), orderBy('created','desc'))
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
    })  */
    setAllEvents(tempMessages)
  })  
  return () => {
    unsubscribe()
    
  }
}
const newFuelerHandle = (event) => {              //Tämä on modalin käyttöfunktio
  setModalVisible(!modalVisible)
  navigation.navigate('AddNewEvent', {testKey: event})
  }

  if ( logged){
  return(
    <View style={Styles.container}>
      <Text style={Styles.heading}> Tapahtumat {carData} </Text>
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
                </View>
              </View>
            </Modal>
          </View>

          <ScrollView>
              {
                allEvents.map((id) => (
                  <View style={{flexDirection: 'row', justifyContent: 'space-between', marginEnd: 10}} key={id.id}>
                    <View style={Styles.allEventsList} >

                    {id.mileage!= null && <Text style={Styles.listText}>{id.mileage}Km</Text>}
                    {id.litres!= null && <Text style={Styles.listText}>{id.litres}L</Text>}
                    {id.price!= null && <Text style={Styles.listText}>{id.price}€</Text>}
                    <Text style={Styles.listText}>{id.created}</Text>  
                    {editButtonPressed != false && <Pressable style={Styles.button} onPress={() => deleteThis(id.id)}><Text style={Styles.textStyle}>Poista</Text>
                    </Pressable> }
                    </View>                  
                  </View>
                  ))
              }
              </ScrollView>
              
        </View>
<Pressable style={Styles.button}  onPress={() => setModalVisible(true)}><Text style={Styles.buttonText}>Lisää tapahtuma</Text></Pressable>
    </View>

  )
}else {
  console.log("EI onnistu");
};
} 

