import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyAFG1KNe7xDNJYfkHMSnAqmN_4a4SAqzWA",
    authDomain: "openaicodelearner.firebaseapp.com",
    projectId: "openaicodelearner",
    storageBucket: "openaicodelearner.appspot.com",
    messagingSenderId: "1057104275692",
    appId: "1:1057104275692:web:e00a1312e4c84e7cea9dc9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export {app, auth}