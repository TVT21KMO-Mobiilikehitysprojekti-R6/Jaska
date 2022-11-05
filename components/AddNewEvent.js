import React, { useState } from 'react'
import { View, Text } from 'react-native';
import Styles from './Styles';
import { Route } from '@react-navigation/native';


export default function AddNewEvent({route, navigation}) {

    const status = route.params.testKey
    if (status == 'fuel') {
  return (
    <View>
        <Text>{route.params.testKey}</Text>
    </View>
  ) }
  return (
      <View>
        <Text>Ei toimi</Text>
    </View>
  )
}
