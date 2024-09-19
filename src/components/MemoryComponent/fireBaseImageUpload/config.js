import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"; 
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBmeoA8hnaMzMZS-yog_Zjvu1dkT6Bu01U",
  authDomain: "memories-19e25.firebaseapp.com",
  projectId: "memories-19e25",
  storageBucket: "memories-19e25.appspot.com",
  messagingSenderId: "401087038362",
  appId: "1:401087038362:web:aefcf264e3feb024e4b023"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const storage = getStorage(app); 
export const database = getDatabase(app); 

