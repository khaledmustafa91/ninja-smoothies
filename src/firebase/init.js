import firebase from 'firebase'
import firestore from 'firebase/firestore'

var firebaseConfig = {
  apiKey: "AIzaSyDPW-dRhCuK1exG4qmr6scxGqcib8V1Re0",
  authDomain: "ninja-smoothies-d6e80.firebaseapp.com",
  databaseURL: "https://ninja-smoothies-d6e80-default-rtdb.firebaseio.com",
  projectId: "ninja-smoothies-d6e80",
  storageBucket: "ninja-smoothies-d6e80.appspot.com",
  messagingSenderId: "432671011223",
  appId: "1:432671011223:web:38cd7680b6a9ae973494d2",
  measurementId: "G-Y3QG2DQ3V7"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebaseApp.firestore();
