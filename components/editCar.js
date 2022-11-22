import React, { useState, createClass } from 'react'
import { View, Text, TextInput, Button } from 'react-native';
import Styles from './Styles';
import { Route } from '@react-navigation/native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { getAuth, onAuthStateChanged} from "firebase/auth";


export default function editCar({route, navigation}) {
 
const [carMake, setCarMake] = useState('')

  
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



