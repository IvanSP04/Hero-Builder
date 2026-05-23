import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBrQ2iYcs9sXgTaQV5Uggmg-pdEy54tEIE",
  authDomain: "hero-builder-c145f.firebaseapp.com",
  projectId: "hero-builder-c145f",
  storageBucket: "hero-builder-c145f.firebasestorage.app",
  messagingSenderId: "918212132415",
  appId: "1:918212132415:web:44fc28793b34025c80028a"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);