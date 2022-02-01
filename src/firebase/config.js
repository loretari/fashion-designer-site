import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyB9SNERv-XlqCA3Maa7v0BapOdJsnk8QII",
    authDomain: "my-music-forever.firebaseapp.com",
    projectId: "my-music-forever",
    storageBucket: "my-music-forever.appspot.com",
    messagingSenderId: "932840537709",
    appId: "1:932840537709:web:be9450e6a18e0e10434964"
};


// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

// const timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectFirestore, projectAuth, projectStorage, timestamp }