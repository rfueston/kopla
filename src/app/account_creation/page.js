"use client";
import { useState} from 'react';
import Link from 'next/link';
import styles from './styles.css'; // Import the CSS
import { getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import { collection, addDoc, setDoc, doc } from 'firebase/firestore';
import { useRouter } from "next/navigation";
import {db} from '../firebase';


export default function CreateAccount() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setRepeatPassword] = useState('');
  const [email, setEmail] = useState('');
  const [validatePassCompare, setValidatePassCompare] = useState(true);
  const [emailInvalid, setemailInvalid] = useState('');
  const [validatePassword, setValidatePassword] = useState(true);
  const [validateFName, setValidateFName] = useState(true);
  const [validateLName, setValidateLName] = useState(true);
  const router = useRouter();

  const createAccountLogin = async (e) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // If authentication passed, add new user to FireStore

          setDoc(doc(db, 'User', userCredential.user.uid), {
            firstName: firstName,
            lastName: lastName,
            email: email,
            isAdmin: false
          });
          router.push("/login");

        })
        .catch((error) => {

          const errorCode = error.code;

          //modify error code to display as a message to the user
          var errorMessage = error.code.split('/').pop();
          errorMessage = errorMessage.replace(/-/g, " ");

          //If the email already exists, display error to user
          setemailInvalid(errorMessage);


        });

  };

  function validateNewUser(){
    var passCompare = true;
    var passwordValid = true;
    var checkFName = true;
    var checkLName = true;

    //regex used to determine password requirements
    var reg = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?.!@$%^&*-])(?!.*(\w)\1{1,}).+.{8,}$/);

    if (firstName.length == 0){
      setValidateFName(false);
      checkFName = false;
    } else {
      setValidateFName(true);
    }

    if (lastName.length == 0){
      setValidateLName(false);
      checkLName = false;
    } else {
      setValidateLName(true);
    }

    //User didn't meet the password requirements, so display error message
    if (!reg.test(password)){
      setValidatePassword(false);
      passwordValid = false;

    } else if (password != confirmPassword){
      setValidatePassCompare(false);
      setValidatePassword(true);
      passCompare = false;
    } else {
      setValidatePassCompare(true);
      setValidatePassword(true);
    }

    if ( passCompare && passwordValid && checkFName && checkLName){
      createAccountLogin();
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
              />
            </div>
            <span style={{color:'red'}} hidden={(!validateFName) ? '' : 'false'}>Must enter a first name.</span>

            <div className="input-field">
              <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
              />
            </div>
            <span style={{color:'red'}} hidden={(!validateLName) ? '' : 'false'}>Must enter a last name.</span>

            <div className="input-field">
              <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
              />
            </div>
            <span style={{color:'red'}} hidden={(emailInvalid != '') ? '' : 'false'}>{emailInvalid}</span>
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
              <li>No repeating characters</li>
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
          </div>
          <div>
            <button onClick={validateNewUser}>Create Account</button>
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