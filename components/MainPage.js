
import { View, Text, SafeAreaView, Button, TextInput, Pressable, Alert } from 'react-native'
import React, { useDebugValue, useState, useEffect, useLayoutEffect } from 'react'
import { convertFirbaseTimeStampToJS } from '../Helpers/TimeStamp';
import {onSnapshot, orderBy, query, QuerySnapshot, firestore, collection, addDoc, ADDEVENT, serverTimestamp, getAuth, signInWithEmailAndPassword} from '../firebase/Config'
import Styles from './Styles';
import { ScrollView } from 'react-native';
import { Modal } from 'react-native';
import { Feather } from '@expo/vector-icons';
import LoginPage from './LoginPage';


export default function MainPage({navigation, route, login5}) {
  const carData = "ABC-123"
  const [allEvents, setAllEvents] = useState([]);
  const [logged, setLogged] = useState(false);
 
//setLogged(true);
//console.log("logged = ", login2)

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

useEffect( () => {
  if(route.params?.login5) {
      setLogged(true)  
      console.log("logged = ", route.params?.login5) 
  }
},[route.params?.login5])

useEffect(() => {
  if(route.params?.price) {
      getData();
      const newLitres = {litres: route.params.litres};
      const newMileage = {mileage: route.params.mileage};
      const newPrice = {price: route.params.price};
      const newWash = {wash: route.params.wash};
      toFireBase(newLitres, newMileage, newPrice, newWash);
  }
    getData();
},[route.params?.price])

const toFireBase = async (litres,mileage,price,wash ) => {
  //console.log("toFirebase")
  const docRef = await addDoc(collection(firestore,ADDEVENT),{
    data: litres, mileage, price, wash, 
    created: serverTimestamp(),
  }).catch(error => console.log(error))
}

  const getData = async => {
  const q = query(collection(firestore,ADDEVENT), orderBy('created','desc'))

  const unsubscribe = onSnapshot(q,(querySnapshot) => {
    const tempMessages = []
    
    querySnapshot.forEach((doc) => {
      const messageObject = {
        id: doc.id,                           //luetaan firebasesta automaattinen avain
        litres: doc.data().data.litres, 
        mileage: doc.data().mileage.mileage,  
        price: doc.data().price.price, 
        wash: doc.data().wash.wash,
        created: convertFirbaseTimeStampToJS(doc.data().created)
      }
      tempMessages.push(messageObject)
    })  
    setAllEvents(tempMessages)
  }) 
  return () => {
    unsubscribe()
  }
}

  const [modalVisible, setModalVisible] = useState(false);

  const newFuelerHandle = (event) => { 
  setModalVisible(!modalVisible)
  //const event = eventInput //otin pois jotta vähemmän muuttujia ja siistimpi kun tuodaan muuttuja event
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
                    {id.mileage!= null && <Text style={Styles.listText}>{id.mileage}Km</Text>}
                    {id.litres!= null && <Text style={Styles.listText}>{id.litres}L</Text>}
                    {id.price!= null && <Text style={Styles.listText}>{id.price}€</Text>}
                    <Text style={Styles.listText}>{id.created}</Text>  
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
  //navigation.navigate("LoginPage", {setLogin} ) 
};
} 

