import { View, Text, SafeAreaView, Button, TextInput, Modal, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import Styles from './Styles';
import MainPage from './MainPage';
import { getAuth, createUserWithEmailAndPassword, signOut, createUser, updateProfile, onAuthStateChanged  } from "firebase/auth";
import { toFireBase } from '../Helpers/toFireBase';
import {firebase, onSnapshot, orderBy, query, QuerySnapshot, firestore, collection, addDoc, ADDEVENT, serverTimestamp, signInWithEmailAndPassword} from '../firebase/Config'
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function LoginPage({navigation, setLogin}) {

  const [email, setEmail] = useState('mokko@testi.fi'); // anna joku sposti
  const [password, setPassword] = useState('testi123'); // anna joku salasana
  const [phoneNumber, setPhoneNumber] = useState(''); // anna joku numero
  const [displayName, setDisplayName] =  useState(''); // anna joku nimi
  const [userCreated, setUserCreated] = useState(0); //kun käyttäjä luodaan, tulostetaan teksti
  const [modalCreateUser, setModalCreateUser]= useState(false); //
  const [modalCarData, setModalCarData]= useState(false); //]
  const [carMake, setCarMake]= useState(''); //
  const [carModel, setCarModel]= useState(''); //
  const [carColor, setCarColor]= useState(''); //
  const [carMileage, setCarMileage]= useState(0); //
  const [loggedUser, setLoggedUser]= useState(''); //
  const [carPlate, setCarPlate]= useState(''); //
  
  const [login2, setLogin2] = useState(false);
  const [userID, setUserID] = useState('');
  const nakki=getAuth();
  //console.log(nakki)

  const [passwordVisibility, setPasswordVisibility] = useState(true);  
  const [rightIcon, setRightIcon] = useState('eye');

  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);   
    } else if (rightIcon === 'eye-off') {  
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }  
  };

  const login = () => {
      const auth = getAuth()
      signInWithEmailAndPassword(auth,email,password)
      .then((userCredential) => {
        setLogin2(true)
        //console.log("testiä loginsivun loginfunktiossa", userCredential)
        navigation.navigate("MainPage", {loggedUser2: userCredential.user.uid}, {carPlate: userCredential.user.displayName})
        
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
    
const signOut = () => {           //Tämä kirjkaa käyttäjän ulos, tarkista toiminta
  const auth = getAuth();
signOut(auth).then(() => {
  console.log("Sign-out successful")
}).catch((error) => {
  // An error happened.
});
}    

 const auth = getAuth();
onAuthStateChanged(auth, (user) => {        //Tämä hakee firebasesta kirjautuneen käyttäjän
  if (user) {
    const uid = user.uid;
    setLoggedUser(uid);
    setCarPlate(user.displayName)
  } else {
    console.log("Ei ole kirjautunut")
  }
});   


const createUser = (email, password, displayName) => {                 //TÄmä toimii, lisääö käyttäjän databaeen

   const auth = getAuth()
    createUserWithEmailAndPassword(auth, email, password, displayName)
  .then((userCredential) => {
    const user = userCredential.user;
    setCarPlate(userCredential.displayName)     //tätä ei ehkä tarvitse enää
    updateUserProfile();
    //setEmail();
    setPassword();
    setUserCreated(1)
    setDisplayName(displayName)
    setModalCreateUser(false)
    setModalCarData(true)
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
const newFuelerHandle = (event) => {              //Tämä on modalin käyttöfunktio
  setModalCreateUser(!modalCreateUser)
  //navigation.navigate('AddNewEvent', {testKey: event})
  }

 const carCreatedButton = () => {
  toFireBase({carMake, carModel, carMileage, loggedUser})
  setModalCarData(!modalCarData)
 }

  return (
    <View style={Styles.container}>
      <Text style={Styles.heading}> Hey please login</Text>

        <View style={Styles.centeredView}>                    
            <Modal                                                  
              animationType="slide"
              transparent={true}
              visible={modalCreateUser}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalCreateUser(!modalCreateUser);
              }}>
              <View style={Styles.centeredView}>
                <View style={Styles.modalView}>
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
            <Pressable style={Styles.button} 
                onPress={ ()=> createUser(email, password, displayName)}>
              <Text style={Styles.textStyle}>Luo tunnus</Text>
            </Pressable>
         {userCreated != 0 && <Text style={Styles.heading}>Käyttäjätunnus luotu, kirjaudu sisään!!!!</Text>}
          </View>     
                  <Pressable
                    style={[Styles.button, Styles.button]}
                    onPress={() => setModalCreateUser(!modalCreateUser)}>
                    <Text style={Styles.textStyle}>Peruuta</Text>  
                  </Pressable>
                </View>
              </View>
            </Modal>
          </View>


                                                  {/* Tästä lähtee modalCarData  */}

                                                  
      <View style={Styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalCarData}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalCarData(!modalCarData);
              }}>
              <View style={Styles.centeredView}>
                <View style={Styles.modalView}>
                  
                <Text style={Styles.heading}> Auton tietojen automaattinen haku epäonnistui, Anna auton tiedot</Text>
      <View style={Styles.input}>
          <TextInput  
            sstyle={{flex: 0.75}}
            onChangeText={text => setCarMake(text)}
            value={carMake}
            placeholder="Auton merkki"       
            />
            <TextInput  
            sstyle={{flex: 0.75}}
            onChangeText={text => setCarModel(text)}
            value={carModel}
            placeholder="Anna malli"       
            />
            <TextInput  
            sstyle={{flex: 0.75}}
            onChangeText={text => setCarMileage(text)}
            value={carMileage}
            placeholder="Tähän kilometrit"       
            />
            <Button style={Styles.buttonLogIn} 
            title="Luo auto" 
            /* onPress={ ()=> toFireBase({carMake, carModel, carMileage, loggedUser})} */
            onPress={ () => carCreatedButton()}
            color="#841584"
            />
            {console.log( "rivi 200" ,  loggedUser)}
         {userCreated != 0 && <Text style={Styles.heading}>Käyttäjätunnus luotu, kirjaudu sisään!!!!</Text>}
          <Text style={Styles.heading}>{displayName}</Text>
          </View>     
                  <Pressable
                    style={[Styles.button, Styles.button]}
                    onPress={() => setModalCarData(!modalCarData)}>
                    <Text style={Styles.textStyle}>Peruuta</Text>  
                  </Pressable>
                </View>
              </View>
            </Modal>
          </View>











      <View style={Styles.loginContainer}>
        <View style={Styles.inputContainer}>
          <TextInput  
            onChangeText={text => setEmail(text)}
            value={email}
            keyboardType='email-address'
            placeholder="Give your name to login..."       
            />
        </View>  
          <View style={Styles.inputContainer}>
            <TextInput  
            onChangeText={text => setPassword(text)}
            secureTextEntry={passwordVisibility}
            value={password}
            placeholder="Give your pasword to login..."       
            />
            <Pressable onPress={handlePasswordVisibility}>
              <MaterialCommunityIcons name={rightIcon} size={22} />
            </Pressable>
          </View>
          <Pressable style={Styles.button} onPress={login}>
            <Text style={Styles.textStyle}>Kirjaudu</Text>
          </Pressable>                   
      </View> 
        
          <Pressable style={Styles.button}  onPress={() => setModalCreateUser(true)}>
            <Text style={Styles.textStyle}>Tee käyttäjätunnus</Text>
          </Pressable>

    </View>

  );
}
