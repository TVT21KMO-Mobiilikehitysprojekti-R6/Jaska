
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection,addDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAphx4K6IKAMYmyUj_2crQmBt38JZVQOU4",
  authDomain: "jaska-19082.firebaseapp.com",
  projectId: "jaska-19082",
  storageBucket: "jaska-19082.appspot.com",
  messagingSenderId: "880981662442",
  appId: "1:880981662442:web:ee02d740374c4147b69593",
  measurementId: "G-EXRSBRVHGR"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore();

const ADDEVENT = 'ADDEVENT';
export{
    firestore,
    collection,
    addDoc,
    ADDEVENT
};