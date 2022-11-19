import { View, Text, SafeAreaView, Button, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import Styles from './Styles';
import { createUser, auth, signInWithEmailAndPassword, onAuthStateChanged} from "../firebase/Config.js";
import MainPage from './MainPage';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function LoginPage({navigation, setLogin}) {

  const [email, setEmail] = useState('mokko@testi.fi'); // anna joku sposti
  const [password, setPassword] = useState('testi123'); // anna joku salasana
  const [phoneNumber, setPhoneNumber] = useState(''); // anna joku numero
  const [displayName, setDisplayName] =  useState(''); // anna joku nimi
  const [userCreated, setUserCreated] = useState(0); //kun käyttäjä luodaan, tulostetaan teksti

  const [login2, setLogin2] = useState(false);
  const [userID, setUserID] = useState('');

  const login = () => {
      const auth = getAuth()
      signInWithEmailAndPassword(auth,email,password)
      .then((userCredential) => {
        //console.log("loginfunktiuon ser "+ userCredential.user.uid)
        setLogin2(true)
        navigation.navigate("MainPage", {login5: userCredential.user.uid})
        
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
    
useEffect(  () => { 
  setUserCreated(0)
},[])
    
    

const createUser = (email, password) => {                 //TÄmä toimii, lisääö käyttäjän databaeen
    const auth = getAuth()
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    setEmail();
    setPassword();
    setUserCreated(1)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

  }

  return (
    <View style={Styles.container}>
      <Text style={Styles.heading}> Hey please login</Text>
        <View style={Styles.input}>
          <TextInput  
            sstyle={{flex: 0.75}}
            onChangeText={text => setEmail(text)}
            value={email}
            keyboardType='email-address'
            placeholder="Give your name to login..."       
            />
            <TextInput  
            sstyle={{flex: 0.75}}
            onChangeText={text => setPassword(text)}
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
       <Text style={Styles.heading}> Create user</Text>
      <View style={Styles.input}>
          <TextInput  
            sstyle={{flex: 0.75}}
            onChangeText={text => setEmail(text)}
            value={email}
            keyboardType='email-address'
            placeholder="Give your name to login..."       
            />
            <TextInput  
            sstyle={{flex: 0.75}}
            onChangeText={text => setPassword(text)}
            value={password}
            placeholder="Give your pasword to login..."       
            />
            <TextInput  
            sstyle={{flex: 0.75}}
            onChangeText={text => setPhoneNumber(text)}
            value={phoneNumber}
            keyboardType='Puhelinnumero'
            placeholder="Give your puhelinnumer to login..."       
            />
            <TextInput  
            sstyle={{flex: 0.75}}
            onChangeText={text => setDisplayName(text)}
            value={displayName}
            keyboardType='email-address'
            placeholder="Give your name to login..."       
            />
            <Button style={Styles.buttonLogIn} 
            title="Submit" 
            onPress={ ()=> createUser(email, password, phoneNumber, displayName)}
            color="#841584"
            />
          </View> 
          {userCreated != 0 && <Text style={Styles.heading}>Käyttäjätunnus luotu, kirjaudu sisään!!!!</Text>}

    </View>

  );
}
