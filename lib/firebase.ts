import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBrCEi7TZtlWjn288xZ_3zAxKNQFSWCOFE",
  authDomain: "noq-app-f5899.firebaseapp.com",
  projectId: "noq-app-f5899",
  storageBucket: "noq-app-f5899.firebasestorage.app",
  messagingSenderId: "871568015462",
  appId: "1:871568015462:web:66ad7de5df4bb9e71b6da7"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export default app;
