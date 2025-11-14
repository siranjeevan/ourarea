// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPcBxlMYDr1Q3rnj8iMCGlIOQpyG0rhVw",
  authDomain: "our-area-b5901.firebaseapp.com",
  projectId: "our-area-b5901",
  storageBucket: "our-area-b5901.firebasestorage.app",
  messagingSenderId: "407606866326",
  appId: "1:407606866326:web:34932daec96e8c35fa6db7",
  measurementId: "G-BRLMBT6JGV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export default app;