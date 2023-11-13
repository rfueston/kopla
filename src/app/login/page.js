"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./styles.css"; // Import the CSS
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase";
import loginController from "./pageController";

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
      
      // If authentication passed, push to main class
      console.log("User ", userCredential.user);
      await loginController.setAdminStatus(userCredential.user.uid);
      
      router.push("/main");
    } catch (error) {
      console.error("Login error:", error); // Log the full error object for debugging
  
      let errorMessage = "An error occurred while logging in. Please try again later.";
      if (error.code && error.message) {
        errorMessage = `${error.code}: ${error.message}`;
      }
  
      console.log(errorMessage);
      setInvalidCredentialsError(errorMessage);
    }
  };
  function loginUser() {
    performFirebaseLogin();
  }
  return (
    <div>
      <header>
        <h1>Login</h1>
      </header>
      <main>
        <div className="form-container">
          <div className="input-field">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-field">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <span
            style={{ color: "red" }}
            hidden={invalidCredentialsError != "" ? "" : "false"}
          >
            {invalidCredentialsError}
          </span>

          <button onClick={loginUser}>Login</button>
        </div>
      </main>
    </div>
  );
}

// Credit: https://blog.logrocket.com/implementing-authentication-in-next-js-with-firebase/
