// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBwgjMiuS-tcIQ0bNZw_6QNlvem_rv7fgU",
  authDomain: "prakash-venkat.firebaseapp.com",
  projectId: "prakash-venkat",
  storageBucket: "prakash-venkat.firebasestorage.app",
  messagingSenderId: "257608672262",
  appId: "1:257608672262:web:95aef435b231db00b9cf87",
  measurementId: "G-ELQ465GV05"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export {db,storage};