import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  
    apiKey: "AIzaSyB4yzVHtPdYJFU2rsZRVIuUPEmS6TFuryE",
    authDomain: "moodbot-9684f.firebaseapp.com",
    projectId: "moodbot-9684f",
    storageBucket: "moodbot-9684f.firebasestorage.app",
    appId: "1:392293687402:web:633d5a0d2645f2a8136a13",
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)



export { app, auth };
