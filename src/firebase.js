//Credenciales
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBglNAQOuHbivHIZAtldw1kVcStyMBcy50",
  authDomain: "ch4t-poo.firebaseapp.com",
  databaseURL: "https://ch4t-poo-default-rtdb.firebaseio.com",
  projectId: "ch4t-poo",
  storageBucket: "ch4t-poo.appspot.com",
  messagingSenderId: "875582047371",
  appId: "1:875582047371:web:b388cbcef8f577a6bdc08e",
  measurementId: "G-RDNFEL5VTQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const db = getFirestore(app)