import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBsGaIHQL2mma2Ea54hzymDMaUwd7lsZiY",
  authDomain: "pet-pal-34749.firebaseapp.com",
  projectId: "pet-pal-34749",
  storageBucket: "pet-pal-34749.appspot.com",
  messagingSenderId: "194631603766",
  appId: "1:194631603766:web:ab38afbcfcf484a21e6a97"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);  