import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyArZ9fsoqBjTInTO9v5hxHVAjATqpqSlDw",
  authDomain: "imageupload-51caa.firebaseapp.com",
  projectId: "imageupload-51caa",
  storageBucket: "imageupload-51caa.appspot.com",
  messagingSenderId: "618501532142",
  appId: "1:618501532142:web:6a7dde329e5de8fc00c6ff"
};

const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app);