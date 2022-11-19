import { View, Text, SafeAreaView, Button, TextInput } from 'react-native'
import React, { useState } from 'react'
import Styles from './Styles';
import {getAuth, auth, signInWithEmailAndPassword, onAuthStateChanged} from "../firebase/Config.js";
import MainPage from './MainPage';


export default function LoginPage({navigation, setLogin}) {

  const [username, setUserName] = useState('mokko@testi.fi'); // anna joku sposti
  const [password, setPassword] = useState('testi123'); // anna joku salasana
  const [phoneNumber, setPhoneNumber] = useState(''); // anna joku numero
  const [displayName, setDisplayName] =  useState(''); // anna joku nimi

  const [login2, setLogin2] = useState(false);
  const [userID, setUserID] = useState('');

  const login = () => {
      const auth = getAuth()
      signInWithEmailAndPassword(auth,username,password)
      .then((userCredential) => {
        //console.log(userCredential.user)
        setLogin2(true)
        navigation.navigate("MainPage", {login5: username})
        
      }).catch((error) => {
        if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
          alert("Inalid credentials!")
        } else if (error.code === 'auth/too-many-requests') {
          alert("Too many attempts, your account will be locked temporarility")
        } else {
          console.log (error.code)
          console.log (error.message)
        }
      })
    } 

    

const createUser = (username, password) => {
    getAuth()
    .createUser({
      email: 'user@example.com',
      emailVerified: false,
      phoneNumber: '+11234567890',
      password: 'secretPassword',
      displayName: 'John Doe',
      photoURL: 'http://www.example.com/12345678/photo.png',
      disabled: false,
    })
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log('Successfully created new user:', userRecord.uid);
    })
    .catch((error) => {
      console.log('Error creating new user:', error);
    });
  }

  return (
    <View style={Styles.container}>
      <Text style={Styles.heading}> Hey please login</Text>
        <View style={Styles.input}>
          <TextInput  
            sstyle={{flex: 0.75}}
            //onChangeText={text => setUserName(text)}
            value={username}
            keyboardType='email-address'
            placeholder="Give your name to login..."       
            />
            <TextInput  
            sstyle={{flex: 0.75}}
            //onChangeText={text => setPassword(text)}
            value={password}
            placeholder="Give your pasword to login..."       
            />
          </View>
        <View>
          <Button style={Styles.buttonLogIn} 
            title="Submit" 
            onPress={login}
            color="#841584"
            />
        </View>
      {/* <Text style={Styles.heading}> Create user</Text>
      <View style={Styles.input}>
          <TextInput  
            sstyle={{flex: 0.75}}
            //onChangeText={text => setUserName(text)}
            value={username}
            keyboardType='email-address'
            placeholder="Give your name to login..."       
            />
            <TextInput  
            sstyle={{flex: 0.75}}
            //onChangeText={text => setPassword(text)}
            value={password}
            placeholder="Give your pasword to login..."       
            />
            <TextInput  
            sstyle={{flex: 0.75}}
            //onChangeText={text => setUserName(text)}
            value={phoneNumber}
            keyboardType='Puhelinnumero'
            placeholder="Give your puhelinnumer to login..."       
            />
            <TextInput  
            sstyle={{flex: 0.75}}
            //onChangeText={text => setUserName(text)}
            value={displayName}
            keyboardType='email-address'
            placeholder="Give your name to login..."       
            />
            <Button style={Styles.buttonLogIn} 
            title="Submit" 
            onPress={ ()=> createUser(username, password, phoneNumber, displayName)}
            color="#841584"
            />
          </View> */}


    </View>

  );
}
