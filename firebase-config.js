// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getFirestore, collection, addDoc, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyA2swpMLvuA4omwCLVewjdvJm6cwR5Wj3c",
  authDomain: "queueq-a9cbe.firebaseapp.com",
  projectId: "queueq-a9cbe",
  storageBucket: "queueq-a9cbe.appspot.com",
  messagingSenderId: "509065047368",
  appId: "1:509065047368:web:4890ee0a01cd61e1de177d",
  measurementId: "G-QBY4SFYXRH"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export{auth,createUserWithEmailAndPassword,signInWithEmailAndPassword };
export { db, collection, addDoc, doc, setDoc };
