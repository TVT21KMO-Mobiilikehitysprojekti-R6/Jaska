
import { View, Text, SafeAreaView, Button, TextInput, Pressable, Alert } from 'react-native'
import React, { useDebugValue, useState, useEffect, useLayoutEffect } from 'react'
import {firestore, collection, addDoc, ADDEVENT, serverTimestamp, getAuth, signInWithEmailAndPassword} from '../firebase/Config.js';
import { onSnapshot, orderBy, query, QuerySnapshot } from 'firebase/firestore';

import Styles from './Styles';
import { ScrollView } from 'react-native';
import { Modal } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function StartPage({navigation, route,  setLogin}) {

const carData = "ABC-123"

const [allEvents, setAllEvents] = useState([]);

//Tämä lisää stack navigaattoriin napin
useLayoutEffect( () => {
  navigation.setOptions({
      headerRight: () => (
          <Feather
              style={Styles.navButton}
              name="edit"
              size={24}
              color="black"
              onPress={ () => navigation.navigate('Edit')}
          />  
      ),  
  }) 
}, [])  

useEffect(() => {
  if(route.params?.litres) {
      getData();
      const newLitres = {litres: route.params.litres};
      const newMileage = {mileage: route.params.mileage};
      const newPrice = {price: route.params.price};
      //console.log(newMileage);
      toFireBase(newLitres, newMileage, newPrice);
  }
    getData();
},[route.params?.litres])

const toFireBase = async (litres,mileage,price) => {
  //console.log("toFirebase")
  const docRef = await addDoc(collection(firestore,ADDEVENT),{
    data: litres, mileage, price

  }).catch(error => console.log(error))
  console.log("testi")
}

  const getData = async => {
  const q = query(collection(firestore,ADDEVENT), orderBy('data','desc'))

  const unsubscribe = onSnapshot(q,(querySnapshot) => {
    const tempMessages = []
    
    querySnapshot.forEach((doc) => {
      const messageObject = {
        id: doc.id,   //luetaan firebasesta automaattinen avain
        litres: doc.data().data.litres, 
        mileage: doc.data().mileage.mileage,  
        price: doc.data().price.price    
      }
      tempMessages.push(messageObject)
    })  
    setAllEvents(tempMessages)
  }) 
}

  const [modalVisible, setModalVisible] = useState(false);

  const newFuelerHandle = (event) => { 
  setModalVisible(!modalVisible)
  //const event = eventInput //otin pois jotta vähemmän muuttujia ja siistimpi kun tuodaan muuttuja event
  navigation.navigate('AddNewEvent', {testKey: event})
  }

  return (
    
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
            <Text style={Styles.modalText}>Hello World!</Text>
            <Pressable
              style={[Styles.button, Styles.button]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={Styles.textStyle}>Hide Modal</Text>
            </Pressable><Pressable
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
                    <Text style={Styles.listText}>{id.mileage}km</Text> 
                <Text style={Styles.listText}>{id.litres}L</Text>
                <Text style={Styles.listText}>{id.price}€</Text>
                    </View>                   
                  </View>
                  ))
              }
              </ScrollView>
              
        </View>
<Pressable style={Styles.button}  onPress={() => setModalVisible(true)}><Text style={Styles.buttonText}>Lisää tapahtuma</Text></Pressable>
    </View>

  );
}
