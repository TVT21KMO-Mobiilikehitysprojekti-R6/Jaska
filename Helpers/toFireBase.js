
import {firebase, onSnapshot, orderBy, query, QuerySnapshot, firestore, collection, addDoc, ADDEVENT, serverTimestamp, signInWithEmailAndPassword} from '../firebase/Config'

export const toFireBase = async (/* litres,mileage,price,wash,userID, */ carPlate ) => {   
    console.log("toFireBase")   //Tämä lisää firebaseen 
    const docRef = await addDoc(collection(firestore,ADDEVENT),{
     // data: litres, mileage, price, wash, 
    //  created: serverTimestamp(),
     // user: userID,
      carData: carPlate,
    }).catch(error => console.log(error))
  }