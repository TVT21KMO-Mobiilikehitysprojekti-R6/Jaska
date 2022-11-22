
import {firebase, onSnapshot, orderBy, query, QuerySnapshot, firestore, collection, addDoc, ADDEVENT, serverTimestamp, signInWithEmailAndPassword} from '../firebase/Config'

export const toFireBase = async  ({carMake, carModel, carMileage}) => {   
    console.log("toFireBase")   //Tämä lisää firebaseen 
    console.log(carMake)
    const docRef = await addDoc(collection(firestore,ADDEVENT),{
      data: carMake, carModel, carMileage,
      created: serverTimestamp(),
     
      
    }).catch(error => console.log(error))
  }