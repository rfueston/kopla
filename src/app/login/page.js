"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase";
import loginController from "./pageController";
import Head from 'next/head';
import { handleLogin } from '../../../lib/handleCookie';

import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
} from "reactstrap";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidCredentialsError, setInvalidCredentialsError] = useState("");
  // const { user, login, logout } = useContext(UserContext);

  // const [error, setError] = useState(null);
  const router = useRouter();

  const performFirebaseLogin = async (e) => {
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      handleLogin();
      // If authentication passed, push to main class
      console.log("User ", userCredential.user);
      await loginController.setAdminStatus(userCredential.user.uid);
      
      router.push("/main");
    } catch (error) {
     
        const errorCode = error.code;

        //modify error code to display as a message to the user
        var errorMessage = error.code.split("/").pop();
        errorMessage = errorMessage.replace(/-/g, " ");

      setInvalidCredentialsError(errorMessage);
    }
  };
  function loginUser() {
    performFirebaseLogin();
  }
  return (
    <div>
    <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
      <link href="https://fonts.googleapis.com/css2?family=Itim&display=swap" rel="stylesheet"/>
    </Head>
      <div className={styles.transCircle}></div>
      <div className={styles.triangle1}></div>
      <div className={styles.triangle}></div>
      <div className={styles.circle}></div>
      <div className={styles.square1}></div>
      <div className={styles.square}></div>
      <div className={styles.square2}></div>
      <div className={styles.square3}></div>
      <div className={styles.transCircle1}></div>

     <div id="container" className={styles.container}>
      <h1 className={styles.h1}>K.O.P.L.A.</h1>


      <style jsx global>{`
      
         body {
          background-color: black;
          color: white;
          margin: 0;
          overflow: hidden;
        }
        h1 {
          position: absolute;
          left: 0;
          right: 0;
          top: -90px;
          height: 30px;
          color: white;
          font-size: 25px;
          text-align: center;
          font-family: 'Itim', cursive;
          font-size:35px;
        }
        label {
          text-align: center;
          position: absolute;
          left: 180px;
          right: 500px;
          display: inline-block
        }
        
        `}
        </style>

      <main>
        <div className={styles.formContainer}>
          <div className={styles.input}>
            <label>Email</label><br></br>

            <input className={styles.email}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.input}>
            <label>Password</label><br></br>

            <input className={styles.password}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className={styles.forgotPassword}>
              <Link href="/login">Forgot Password?</Link>
            </div>
          </div>

          <span
            className={styles.errorMessage} hidden={invalidCredentialsError != "" ? "" : "false"}
          >
            {invalidCredentialsError}
          </span>
          <br></br>
          <button className={styles.loginButton} onClick={loginUser}>Log In</button>
         <h2></h2>
          <div className="signInLink">
          <span className={styles.siginText}>Don't have an account?<br></br>
          <Link href="/account_creation">Create one!</Link>
          </span>
        </div>
        </div>
      </main>
    </div>
    </div>
  );
}

// Credit: https://blog.logrocket.com/implementing-authentication-in-next-js-with-firebase/
