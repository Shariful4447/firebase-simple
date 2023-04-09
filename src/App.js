import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import './App.css';
//import firebaseConfig from './firebase.config';
import { getAuth, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { useState } from 'react';



const firebaseConfig = {
  apiKey: "AIzaSyC2DPzduAKL1OfHSk_D964P6NbPsjkvvP4",
  authDomain: "ema-jhon-simple-480d1.firebaseapp.com",
  projectId: "ema-jhon-simple-480d1",
  storageBucket: "ema-jhon-simple-480d1.appspot.com",
  messagingSenderId: "551084296857",
  appId: "1:551084296857:web:f90a99d00fde64157f4608"
};

firebase.initializeApp(firebaseConfig);

function App() {

  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    photo:""
  })

  const handleSignin = () => {
    const provider = new GoogleAuthProvider();  
    const auth = getAuth();
    signInWithPopup(auth, provider)
    .then((res) => {
     const {displayName, photoURL, email} = res.user;
     const signedInuser = {
      isSignedIn: true,
      name: displayName,
      email: email,
      photo: photoURL
    }
    setUser(signedInuser);
    console.log(displayName, email, photoURL);
  })


  .catch((err)=>{
    console.log(err);
    console.log(err.message);
  })
}

  return (
    <div className="App">
      <button onClick={handleSignin}>Sign In :</button>
      {
        user.isSignedIn && <div>
          <p>Welcome {user.name}</p>
          <p>Your email : {user.email}</p>
          <img src={user.photo} referrerPolicy="no-referrer" alt=""></img>
          </div>
      }
   
    </div>
  );
}

export default App;
