import firebase from "firebase";

const app = firebase.initializeApp({
    apiKey: "AIzaSyBpiChIpAIapJLLSQfjwkaymiDqXPW4dgA",
    authDomain: "sixkiprend.firebaseapp.com",
    databaseURL: "https://sixkiprend.firebaseio.com",
    projectId: "sixkiprend",
    storageBucket: "sixkiprend.appspot.com",
    messagingSenderId: "79453089053",
    appId: "1:79453089053:web:870ef478d8dca7291d45f4"
}, 'sixkiprend');

export const db = firebase.database(app);
