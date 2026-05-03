// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";

// // Firebase configuration using environment variables
// const firebaseConfig = {
// //   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
//   measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export default app;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAermVE7ort18S2NZF1kI10TCSpwb9AL6E",
  authDomain: "react-firebase-authentic-4a3f5.firebaseapp.com",
  projectId: "react-firebase-authentic-4a3f5",
  storageBucket: "react-firebase-authentic-4a3f5.firebasestorage.app",
  messagingSenderId: "919380697216",
  appId: "1:919380697216:web:0b214a3e38e7ae798e4665"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;