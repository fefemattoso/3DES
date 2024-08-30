import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDOvT_DAmFrgIsd1BXXasCJLQ-AlLmtlTY",
  authDomain: "pets-e3e7b.firebaseapp.com",
  projectId: "pets-e3e7b",
  storageBucket: "pets-e3e7b.appspot.com",
  messagingSenderId: "868912528856",
  appId: "1:868912528856:web:a6b017f5edbc68e7de06ad",
  measurementId: "G-V5W2VLXM8Z"
};
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);

  const auth = getAuth(app);
  export const storage = getStorage(app);

    export {db, auth};