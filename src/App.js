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

const handleSignout = () => {
  firebase.auth().signOut()
  .then(res=>{
    const signedOutuser = {isSignedIn:false,
      name: "",
      photo:"",
      email:""
    }
    setUser(signedOutuser);
  
  
})
.catch(err=>{

})
}

const handleBlur = (e) => {
  console.log(e.target.name, e.target.value);
  if (e.target.name === "email") {
    const isEmailValid = /\S+@\S+\.\S+/.test(e.target.value);
    console.log(isEmailValid);
  }
  if (e.target.name === "password") {

    const isPasswordValid = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(e.target.value);
    console.log(isPasswordValid);
    
  }
}

const handleSubmit = () => {

}


  return (
    <div className="App">
      {
        user.isSignedIn? <button onClick={handleSignout}>Sign Out :</button> :
        <button onClick={handleSignin}>Sign In :</button>
        
      }
      {
        user.isSignedIn && <div>
          <p>Welcome {user.name}</p>
          <p>Your email : {user.email}</p>
          <img src={user.photo} referrerPolicy="no-referrer" alt=""></img>
          </div>
      }
    
    <h1>New Authentication : </h1>
    
    <form onSubmit={handleSubmit}>
    <br />
    <input type="text" onBlur={handleBlur} name="email" placeholder='Write Your Email Address' required />
    <br />
    <input type="password" onChange={handleBlur} name="password" id="" placeholder='Your Password' required/>
    <br />
    
    <input type="submit" value="Submit" />
    </form>


   
    </div>
  );
}

export default App;
