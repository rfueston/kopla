"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./styles.css"; // Import the CSS
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase";

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
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // If authentication passed, push to main class
        console.log("User ", userCredential.user);
        router.push("/main");
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(error);
        // //modify error code to display as a message to the user
        var errorMessage = error.code.split("/").pop();
        errorMessage = errorMessage.replace(/-/g, " ");
        //If the credentials are invalid, display error to user
        console.log(errorMessage);

        setInvalidCredentialsError(errorMessage);
      });
     // fix fetch for admin
    // Assuming setAdminStatus is asynchronous, you can await it here
    await loginController.setAdminStatus(userCredential.user.uid);
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
