import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBVHlRirT8T6MRYpH-9G9CMpuhRg1mFJE8", // From your file
    authDomain: "skarjams2025.firebaseapp.com",
    projectId: "skarjams2025",
    storageBucket: "skarjams2025.appspot.com", // Corrected domain
    messagingSenderId: "198797199512",
    appId: "1:198797199512:web:d93f1569730dc50ac0e8ed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the services you need
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();