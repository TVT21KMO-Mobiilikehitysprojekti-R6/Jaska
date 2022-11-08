
import { View, Text, SafeAreaView, Button, TextInput, Pressable, Alert } from 'react-native'
import React, { useDebugValue, useState, useEffect } from 'react'
import {firestore, collection, addDoc, ADDEVENT, serverTimestamp, getAuth, signInWithEmailAndPassword} from '../firebase/Config.js';
import { onSnapshot, orderBy, query, QuerySnapshot } from 'firebase/firestore';

import Styles from './Styles';
import { ScrollView } from 'react-native';
import { Modal } from 'react-native';

export default function StartPage({navigation, route,  setLogin}) {

    //const [allEvents, setAllEvents] = useState([])

//let newAllEvents = [ ...]
const carData = "ABC-123"
/*const allEvents = [
    { key: 1, event: 'maintenance', title: 'Release Maintenance', mileage: '0'},
    { key: 2, event: 'fuel', title: 'Fueling', mileage: '100'},
    { key: 3, event: 'fuel', title: 'Fueling', mileage: '600'},
    { key: 4, event: 'fuel', title: 'Fueling', mileage: '1500', quantity: "100", units: "L"},
    { key: 5, event: 'maintenance', title: 'Release Maintenance', mileage: '0'},
    { key: 12, event: 'fuel', title: 'Fueling', mileage: '100'},
    { key: 13, event: 'fuel', title: 'Fueling', mileage: '600'},
    { key: 14, event: 'fuel', title: 'Fueling', mileage: '1500', quantity: "100", units: "L"},
    { key: 21, event: 'maintenance', title: 'Release Maintenance', mileage: '0'},
    { key: 32, event: 'fuel', title: 'Fueling', mileage: '100'},
    { key: 43, event: 'fuel', title: 'Fueling', mileage: '600'},
    { key: 54, event: 'fuel', title: 'Fueling', mileage: '1500', quantity: "100", units: "L"},

]
*/
const [allEvents, setAllEvents] = useState([]);
const [notesKey, setNotesKey] = useState(0);
//const [newLitres, setNewLitres] = useState([]); 


useEffect(() => {
  //getDataLenght()
  if(route.params?.litres) {
      getData();
      const newKey =  notesKey + 1;
      const newLitres = {key: newKey.toString(), litres: route.params.litres};
      setNotesKey(newKey);
      save(newLitres);
      //const newAllEvents = [...allEvents, newLitres];
      //storeData(newLitres);
      //storeDataKey(newKey);
      //setAllEvents(newAllEvents);
      //setNewLitres(newLitres2) 
  }
    getData();
  //getDataKey();
},[route.params?.litres])

const save = async (value) => {
  console.log("firebase")
  const docRef = await addDoc(collection(firestore,ADDEVENT),{
    text: value,
    //created: serverTimestamp()
  }).catch(error => console.log(error))
  //setNewMessage('')
}

  const getData = async => {
  const q = query(collection(firestore,ADDEVENT), orderBy('text','desc'))

  const unsubscribe = onSnapshot(q,(querySnapshot) => {
    const tempMessages = []
    
    querySnapshot.forEach((doc) => {
     //console.log("aaa")
      const messageObject = {
        //id: doc.id,
        //text: doc.data().text,
        key: doc.data().text.key,
        litres: doc.data().text.litres,
        //created: convertFirbaseTimeStampToJS(doc.data().created)
      }
      //console.log(messageObject)
      tempMessages.push(messageObject)
    })
    setAllEvents(tempMessages)
   // setNotesKey(allEvents.key)
    console.log(allEvents)
  })

  const getDataLenght = async => {
    const lenght = allEvents.length
    setNotesKey(lenght)
  }

  return () => {
    unsubscribe()
  }
}


  const [modalVisible, setModalVisible] = useState(false);

  const newFuelerHandle = () => { 
  setModalVisible(!modalVisible)
  const event = "fuel"
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
              onPress={() => newFuelerHandle()}>
              <Text style={Styles.textStyle}>Uusi Tankkaus</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>


        <ScrollView>
              {
                allEvents.map((id) => (
                  <View style={{flexDirection: 'row', justifyContent: 'space-between', marginEnd: 10}} key={id.key}>
                    <View style={Styles.allEventsList} >
                    <Text style={Styles.listText}>{id.key}</Text> 
                    <Text style={Styles.listText}>{id.title}</Text> 
                    <Text style={Styles.listText}>{id.mileage}km</Text> 
                <Text style={Styles.listText}>{id.litres}{id.units}</Text>
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
