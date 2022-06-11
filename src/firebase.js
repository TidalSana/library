import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAIH0OYKVUyOX6IIBAaMkQPmxlsB8B96Xo",
  authDomain: "library-app-7a6ba.firebaseapp.com",
  projectId: "library-app-7a6ba",
  storageBucket: "library-app-7a6ba.appspot.com",
  messagingSenderId: "720398131548",
  appId: "1:720398131548:web:59cbeeaec933a9eb7ae199",
  measurementId: "G-F28THZJXGE",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
