// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCmA0Wm44upnGAeryaIEiEnaeaVDNt3wGA",
  authDomain: "online-food-ordering-sys-68ae5.firebaseapp.com",
  projectId: "online-food-ordering-sys-68ae5",
  storageBucket: "online-food-ordering-sys-68ae5.appspot.com", // ✅ fixed `.app` to `.appspot.com`
  messagingSenderId: "862916087176",
  appId: "1:862916087176:web:ff78b1bdc74309491ffe3d",
  measurementId: "G-P5PB3SVTQT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth & Providers
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider };
