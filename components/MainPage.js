
import { View, Text, SafeAreaView, Button, TextInput, Pressable, Alert } from 'react-native'
import React, { useDebugValue, useState } from 'react'
import Styles from './Styles';
import { ScrollView } from 'react-native';
import { Modal } from 'react-native';

export default function StartPage({navigation, setLogin}) {

    //const [allEvents, setAllEvents] = useState([])

//let newAllEvents = [ ...]
const carData = "ABC-123"
const allEvents = [
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
                  <View style={{flexDirection: 'row', justifyContent: 'space-between', marginEnd: 10}}>
                    <View style={Styles.allEventsList} key={id.key}>
                      <Text style={Styles.listText}>{id.title}</Text> 
                      <Text style={Styles.listText}>{id.mileage}km</Text>
                      <Text style={Styles.listText}>{id.quantity}{id.units}</Text>
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
