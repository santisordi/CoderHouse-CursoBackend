import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";   
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpNTS53HF9FXU98a_RyBMZEAZ_qQUf4h8",
  authDomain: "dydarticulosregionales.firebaseapp.com",
  projectId: "dydarticulosregionales",
  storageBucket: "dydarticulosregionales.appspot.com",
  messagingSenderId: "395808606017",
  appId: "1:395808606017:web:42a8dee40554d02c9383c0"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);