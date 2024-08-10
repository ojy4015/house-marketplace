// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA9bLe1n3qIwURqvoESKr1f0qzVOwDZooo',
  authDomain: 'house-marketplace-app-2256e.firebaseapp.com',
  projectId: 'house-marketplace-app-2256e',
  storageBucket: 'house-marketplace-app-2256e.appspot.com',
  messagingSenderId: '77651017812',
  appId: '1:77651017812:web:26dcd3bacbaa923f4badc1',
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
