import { View, Text, SafeAreaView, Button, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import Styles from './Styles';
import MainPage from './MainPage';
import { getAuth, createUserWithEmailAndPassword, signOut, createUser, updateProfile  } from "firebase/auth";
import { toFireBase } from '../Helpers/toFireBase';
import {firebase, onSnapshot, orderBy, query, QuerySnapshot, firestore, collection, addDoc, ADDEVENT, serverTimestamp, signInWithEmailAndPassword} from '../firebase/Config'


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
        setLogin2(true)
        //console.log("testiä loginsivun loginfunktiossa", userCredential)
        navigation.navigate("MainPage", {login5: userCredential.user.uid}, {carPlate: userCredential.user.displayName})
        
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
    
const signOut = () => {
  const auth = getAuth();
signOut(auth).then(() => {
  console.log("Sign-out successful")
}).catch((error) => {
  // An error happened.
});
}    

const createUser = (email, password, displayName) => {                 //TÄmä toimii, lisääö käyttäjän databaeen

   const auth = getAuth()
    createUserWithEmailAndPassword(auth, email, password, displayName)
  .then((userCredential) => {
    const user = userCredential.user;
    updateUserProfile();
    //setEmail();
    setPassword();
    setUserCreated(1)
    setDisplayName(displayName)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  }

const updateUserProfile = () => {
  const auth = getAuth()
    updateProfile(auth.currentUser, {
        displayName: displayName,
     }).then(()=> {
     })
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
            onChangeText={text => setDisplayName(text)}
            value={displayName}
            keyboardType='email-address'
            placeholder="Tähän rekisterinumero"       
            />
            
        
            <Button style={Styles.buttonLogIn} 
            title="Submit" 
            onPress={ ()=> createUser(email, password, displayName)}
            color="#841584"
            />
           {/*  <Button style={Styles.buttonLogIn} 
            title="signout" 
            onPress={ ()=> signOut()}
            color="#841584"
            />  */}
          </View> 
          {userCreated != 0 && <Text style={Styles.heading}>Käyttäjätunnus luotu, kirjaudu sisään!!!!</Text>}

    </View>

  );
}
