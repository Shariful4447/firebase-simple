import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import './App.css';
//import firebaseConfig from './firebase.config';
import { getAuth, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";



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
      password:"",
      email:"",
      error:"",
      success:false
    }
    setUser(signedOutuser);
  
  
})
.catch(err=>{

})
}

const handleBlur = (e) => {
    let isFildValid = true;
    if (e.target.name === "email") {
      isFildValid = /\S+@\S+\.\S+/.test(e.target.value);
      
    }
    if (e.target.name === "password") {
      const isPasswordValid=e.target.value.length >= 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);

      //const isFormValid = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(e.target.value);
      isFildValid = isPasswordValid && passwordHasNumber;
    
    
    }
    if (isFildValid) {
      
      const newUserInfo={...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);


      
    }
}

const handleSubmit = (e) => {
  if (user.email && user.password){
   
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((res) => {
        const newUserInfo={...user};
        newUserInfo.error = '';
        newUserInfo.success=true;
        setUser(newUserInfo);
      })
      .catch((error) => {
        const newUserInfo={...user};
        newUserInfo.error = error.message;
        newUserInfo.success= false;
       setUser(newUserInfo);
        
       
        // ..
      });
    
  }
  e.preventDefault();
  

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
    
    <p>Our Authentication :</p>
    <br />
    <form onSubmit={handleSubmit}>
      <input name="name" type="text" onBlur={handleBlur} placeholder='Your Name'/>
    <br />
    <input type="text" onBlur={handleBlur} name="email" placeholder='Write Your Email Address' required />
    <br />
    <input type="password" onBlur={handleBlur} name="password" id="" placeholder='Your Password' required/>
    <br />
    
    <input type="submit" value="Submit" />
    </form>
      <p style={{color: 'red'}}>{user.error}</p>
      {user.success && <p style={{color: 'green'}}>User Created successfully</p>}

   
    </div>
  );
}

export default App;
