// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPA70JAgRtZNUH_5RuyNd8Ix1rP0Hu3LY",
  authDomain: "react-firebase-2f3ba.firebaseapp.com",
  projectId: "react-firebase-2f3ba",
  storageBucket: "react-firebase-2f3ba.appspot.com",
  messagingSenderId: "549664848763",
  appId: "1:549664848763:web:804c851dcc7fb3d1001bde"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export default auth;