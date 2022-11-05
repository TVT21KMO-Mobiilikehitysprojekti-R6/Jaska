import { View, Text, SafeAreaView, Button, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import Styles from './Styles';

export default function StartPage({navigation, setLogin}) {



  return (
    <View style={Styles.container}>
      <Text style={Styles.heading}> Tervetuloa Jaskaan! </Text>
        <View>
          <Pressable style={Styles.button} 
            onPress={ () => navigation.navigate('LoginPage')}> 
                 <Text style={Styles.buttonText}>aaaa</Text> 
            </Pressable>        
            </View>
    </View>

  );
}
