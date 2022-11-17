import { View, Text, SafeAreaView, Button, TextInput } from 'react-native'
import React, { useState } from 'react'
import Styles from './Styles';
import {getAuth, signInWithEmailAndPassword, onAuthStateChanged} from "../firebase/Config.js";
import MainPage from './MainPage';


export default function LoginPage({navigation, setLogin}) {

  const [username, setUserName] = useState('mokko@testi.fi'); // anna joku nimi
  const [password, setPassword] = useState('testi123'); // anna joku nimi
    /* const [error, setError] = useState(null);
  
    const handleSubmit = () => {
      setLogin(username, password);
    }
 */
    
console.log(setLogin)
    const [login2, setLogin2] = useState(false)

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
    </View>

  );
}
