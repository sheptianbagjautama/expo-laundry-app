import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCZ12kcYZsfOISEV60vCD93ljFYy_Sjn8s",
  authDomain: "expo-laundry-app.firebaseapp.com",
  projectId: "expo-laundry-app",
  storageBucket: "expo-laundry-app.appspot.com",
  messagingSenderId: "932336325620",
  appId: "1:932336325620:web:0a8bfab6441b7ee6215fa1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
console.log("init auth => ", auth);

const db = getFirestore();

export { auth, db };
