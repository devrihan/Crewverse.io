import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA4452a1FVh9DyIpyqrRJJ97bYeIk9GeWY",
  authDomain: "museai-c2df3.firebaseapp.com",
  projectId: "museai-c2df3",
  storageBucket: "museai-c2df3.firebasestorage.app",
  messagingSenderId: "582910115032",
  appId: "1:582910115032:web:216856bd74811891c36bad",
  measurementId: "G-SVRMPPL30F"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);