import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDdOxOUyNf8_8ly6NfT9ixlHtg7Ogy39zM",
    authDomain: "bokerlest.firebaseapp.com",
    projectId: "bokerlest",
    storageBucket: "bokerlest.appspot.com",
    messagingSenderId: "198134643776",
    appId: "1:198134643776:web:d54c0587373b21a70ef3a5",
    measurementId: "G-TKY0K82FEW"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);

  const auth = getAuth(app);
  export const storage = getStorage(app);

  export {db, auth};
