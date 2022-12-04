
import { View, Text, SafeAreaView, Button, TextInput, Pressable, Alert } from 'react-native'
import React, { useDebugValue, useState, useEffect, useLayoutEffect } from 'react'
import { convertFirbaseTimeStampToJS } from '../Helpers/TimeStamp';
import { toFireBase } from '../Helpers/toFireBase';
import {firebase, onSnapshot, orderBy, query, QuerySnapshot, firestore, collection, addDoc, ADDEVENT, serverTimestamp, signInWithEmailAndPassword} from '../firebase/Config'
import { getAuth, onAuthStateChanged, updateProfile  } from "firebase/auth";
import Styles from './Styles';
import { ScrollView } from 'react-native';
import { Modal } from 'react-native';
import { Feather } from '@expo/vector-icons';
import LoginPage from './LoginPage';
import {getFirestore, doc, deleteDoc, getDocs, where} from "firebase/firestore";        //tämä piti olla tässä muuten meni delete vituiksi, siirto omalla vastuulla
import  {SignOut} from '../Helpers/SignOut';




export const GetMileageDataFromFirestore = async() => {                                      //useEffect kutsuuu tätä fuktioa avuksi hakemaan dataa
    const q = query(collection(firestore,ADDEVENT), where("user", "==", route.params?.loggedUser ), orderBy('mileage','desc'))
    const unsubscribe = onSnapshot(q,(querySnapshot) => {
     const tempMessages = [] 
     querySnapshot.forEach((doc) => {
       const messageObject = {
         id: doc.id,                           //luetaan firebasesta automaattinen avain
         //litres: doc.data().data.litres, 
         mileage: doc.data().mileage.mileage,  
         //price: doc.data().price.price, 
        // wash: doc.data().wash.wash,
        // created: convertFirbaseTimeStampToJS(doc.data().created),
        // user: doc.data().user
       }
       tempMessages.push(messageObject)
     })  
     setAllEvents(tempMessages)
   })  
   return () => {
     unsubscribe()
     
   }
 }