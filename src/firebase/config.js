import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDBGBO9W9yQ-_oavMEWo4Y0Ch7U1BoTmjU",
  authDomain: "doll-stock-project.firebaseapp.com",
  projectId: "doll-stock-project",
  storageBucket: "doll-stock-project.appspot.com",
  messagingSenderId: "216845674831",
  appId: "1:216845674831:web:5b837981c753d207fafd3a"
};

// ลงชื่อเข้าใช้ Firebase
firebase.initializeApp(firebaseConfig);

// เข้าใช้ FireStore
const projectFirestore = firebase.firestore();

// เข้าใช้ Storage
const projectStorage = firebase.storage();

// Export
export {projectFirestore, projectStorage}