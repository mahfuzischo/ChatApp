// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBm4wNPdCLMVvQ1F0wNyHXmZYwySQplgg",
  authDomain: "chatapp-8851a.firebaseapp.com",
  projectId: "chatapp-8851a",
  storageBucket: "chatapp-8851a.appspot.com",
  messagingSenderId: "611601102030",
  appId: "1:611601102030:web:60fd62cb2452eaf34f4c9f",
  measurementId: "G-FQP42KEXF5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
