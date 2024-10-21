import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDeWaUvVOG_ZLecpvZCUjyUc4hqDMxRY1A",
    authDomain: "ecommerce-1c1b1.firebaseapp.com",
    projectId: "ecommerce-1c1b1",
    storageBucket: "ecommerce-1c1b1.appspot.com",
    messagingSenderId: "897988292386",
    appId: "1:897988292386:web:7f95ea2b2ed1e18f3abf7b",
    measurementId: "G-RFR75S7Y5H"
  };
  const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);