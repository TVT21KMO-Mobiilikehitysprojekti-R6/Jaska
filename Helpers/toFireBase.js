
import {firebase, onSnapshot, orderBy, query, QuerySnapshot, firestore, collection, addDoc, ADDEVENT, serverTimestamp, signInWithEmailAndPassword, initialCarData} from '../firebase/Config'

export const toFireBase = async  ({carMake, carModel, carMileage, loggedUser}) => {   
    console.log("toFireBase")   //Tämä lisää firebaseen 
    console.log(carMake)
    const docRef = await addDoc(collection(firestore,initialCarData),{
      data: carMake, carModel, carMileage,
      created: serverTimestamp(),
      user: loggedUser,
     
      
    }).catch(error => console.log(error))
    
  }