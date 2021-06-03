import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDuC-mNh8DDc8MCdu2gp_B8TgofLTQJ9lQ",
    authDomain: "baxter-react-chess.firebaseapp.com",
    projectId: "baxter-react-chess",
    storageBucket: "baxter-react-chess.appspot.com",
    messagingSenderId: "448502208338",
    appId: "1:448502208338:web:558cecc996db230051cc8b",
    measurementId: "G-BDCDQ6LYSP"
  };

  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
