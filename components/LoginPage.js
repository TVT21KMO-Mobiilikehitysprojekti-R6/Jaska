import { View, Text, SafeAreaView, Button, TextInput } from 'react-native'
import React, { useState } from 'react'
import Styles from './Styles';

export default function LoginPage({navigation, setLogin}) {

  const [username, setUserName] = useState(''); // anna joku nimi

  const login = () => {
    navigation.navigate('MainPage')
    /*
    if (username === '') {
      alert('no user!!')
      console.log('no user!!')
    }
    else{  
      navigation.navigate('Home', {testKey: username})
      setUserName('')
    }*/
  }

  return (
    <View style={Styles.container}>
      <Text style={Styles.heading}> Hey please login</Text>
        <View style={Styles.input}>
          <TextInput  
            sstyle={{flex: 0.75}}
            onChangeText={(username) => setUserName(username)}
            value={username}
            keyboardType='email-address'
            placeholder="Give your name to login..."       
            />
          </View>
        <View>
          <Button style={Styles.buttonLogIn} 
            title="Submit" r
            onPress={login}
            color="#841584"
            />
        </View>
    </View>

  );
}
