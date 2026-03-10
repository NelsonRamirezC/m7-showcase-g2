// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBf69H0x4XkIALSYgVLU-jVINdKFfjrqDU",
    authDomain: "product-showcase-g2-ce179.firebaseapp.com",
    projectId: "product-showcase-g2-ce179",
    storageBucket: "product-showcase-g2-ce179.firebasestorage.app",
    messagingSenderId: "403419925573",
    appId: "1:403419925573:web:3d8a6380ed7c83f660272c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
