// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnzRYY638T2-ye37XnNZBx6vfy34CVrhA",
  authDomain: "email-password-7f866.firebaseapp.com",
  projectId: "email-password-7f866",
  storageBucket: "email-password-7f866.firebasestorage.app",
  messagingSenderId: "60045046702",
  appId: "1:60045046702:web:2432f418e232b63be6ce3f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
 