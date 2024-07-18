// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgkjtiFOGlGrBNnX8Y4HiiAIfGurPUB4Q",
  authDomain: "modebuy-af53f.firebaseapp.com",
  projectId: "modebuy-af53f",
  storageBucket: "modebuy-af53f.appspot.com",
  messagingSenderId: "914815852631",
  appId: "1:914815852631:web:845e5f9801c7a7c0658312",
  measurementId: "G-EME1LCGD3B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export {
    app,
    analytics,
    logEvent
}