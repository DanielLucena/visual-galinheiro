// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_API_KEY,
//   authDomain: import.meta.env.VITE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_APP_ID,
//   measurementId: import.meta.env.VITE_MEASUREMENT_ID
// };
const firebaseConfig = {
  apiKey: "AIzaSyBq93yxSzbPUw65QmohI2sTQ0ZRwrQDMd0",
  authDomain: "hubdados-d6cb6.firebaseapp.com",
  projectId: "hubdados-d6cb6",
  storageBucket: "hubdados-d6cb6.appspot.com",
  messagingSenderId: "1070359413093",
  appId: "1:1070359413093:web:4a1f44756c010dcef1e18c",
  measurementId: "G-HEHL0WTTDD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db = getFirestore(app);