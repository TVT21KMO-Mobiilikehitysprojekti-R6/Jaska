import React, { useState } from 'react'
import { View, Text, TextInput } from 'react-native';
import Styles from './Styles';
import { Route } from '@react-navigation/native';


export default function AddNewEvent({route, navigation}) {

  const [text, onChangeText] = React.useState('Useless Text');
  const [litres, onChangeLitres] = React.useState(null);
  const [kilometers, onChangeKilometers] = React.useState(null);
  
    const status = route.params.testKey
    if (status == 'fuel') {
  return (
    <View style={Styles.centeredView}>
        <Text>Lisätään tankkaus</Text>
        <Text>Anna litrat</Text>
          <TextInput
            style={Styles.button}
            onChangeText={onChangeLitres}
            value={litres}
            placeholder="Tähän litrat"
            keyboardType="numeric"
          />
       <Text>Anna Kilometrit</Text>
            <TextInput
              style={Styles.button}
              onChangeText={onChangeKilometers}
              value={kilometers}
              placeholder="Tähän kilometrit"
              keyboardType="numeric"
            />

        <Text>{route.params.testKey}</Text>
        <Text>{litres}</Text>

    </View>
  ) }
  return (
      <View>
        <Text>Ei toimi</Text>
    </View>
  )
}
