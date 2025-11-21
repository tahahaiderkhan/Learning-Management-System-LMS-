import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA96drBJTmglH6mmt0Wx-0VvLyWRpsFOI8",
    authDomain: "lms12-e4242.firebaseapp.com",
    projectId: "lms12-e4242",
    storageBucket: "lms12-e4242.appspot.com",
    messagingSenderId: "378292570002",
    appId: "1:378292570002:web:3a52a6b83ca22073e3e34b",
    measurementId: "G-H0KYLK2C08"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
