"use client";
import { useState} from 'react';
import Link from 'next/link';
import styles from './styles.css'; // Import the CSS
import { getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import { collection, addDoc} from 'firebase/firestore';
import { useRouter } from "next/navigation";
import {db} from '../firebase';


export default function CreateAccount() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setRepeatPassword] = useState('');
  const [email, setEmail] = useState('');
  const [validatePassCompare, setValidatePassCompare] = useState(true);  
  const [validateEmail, setValidateEmail] = useState(true);  
  const [validatePassword, setValidatePassword] = useState(true);
  const router = useRouter();


  const createAccountLogin = async (e) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // If authentication passed, add new user to FireStore
        
         addDoc(collection(db, 'User'), {
          firstName: firstName,
          lastName: lastName,
          email: email,
          isAdmin: false
      });
      router.push("/login");

      })
      .catch((error) => {

        const errorCode = error.code;
        console.log(errorCode);
        
        //If the email already exists, display error to user
        if (errorCode == 'auth/email-already-in-use')
          {
            setValidateEmail(false);
            }
      
      });

  };

  function validateNewUser(){
    setValidatePassCompare(true);
    setValidatePassword(true);

    //regex used to determine password requirements
    var reg = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?.!@$%^&*-]).{8,}$");

    //User didn't meet the password requirements, so display error message
    if (!reg.test(password)){
      setValidatePassword(false);

    } else if (password != confirmPassword){
      setValidatePassCompare(false);
    }

    //if the passwords match and the password is valid, attempt to create account
    if (validatePassCompare && validatePassword){
      createAccountLogin()
    }
  
  }
  return (
    <div>
      <header>
        <h1>Account Creation</h1>
      </header>
      <main>
        <div className="form-container">
          <div className="input-field">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="input-field">
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="input-field">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
            <span style={{color:'red'}} hidden={(!validateEmail) ? '' : 'false'}>Email already exists.</span>
          <div className="input-field">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
            <ul style={{color:'red'}} hidden={(!validatePassword) ? '' : 'false'}>
            <li>Minimum 8 characters</li>
            <li>At least one special character (#?.!@$%^&*-)</li>
            <li>At least one uppercase letter</li>
            <li>At least one lowercase letter</li>
            <li>At least one number</li>
            </ul>
          <div className="input-field">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
            />
               <span style={{color:'red'}} hidden={(!validatePassCompare) ? '' : 'false'}>Passwords do not match.</span>
          </div>
          <div>
            <button onClick={validateNewUser}>Create Account</button>
          </div>
        </div>
        <div className="sign-in-link">
          Already have an account? <br></br>
          <Link href="/login">
            Sign in
          </Link>
        </div>
      </main>
    </div>
  );
}