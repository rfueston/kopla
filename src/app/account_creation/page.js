"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import styles from "./create.module.css";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { db } from "../firebase";


export default function CreateAccount() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setRepeatPassword] = useState("");
  const [email, setEmail] = useState("");
  const [validatePassCompare, setValidatePassCompare] = useState(true);
  const [emailInvalid, setemailInvalid] = useState("");
  const [validatePassword, setValidatePassword] = useState(true);
  const [validateFName, setValidateFName] = useState(true);
  const [validateLName, setValidateLName] = useState(true);
  const parentRef = useRef(null);
  const childRef = useRef(null);
  var animateStatus = 0;

  const createAccountLogin = async (e) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // If authentication passed, add new user to FireStore

        setDoc(doc(db, "User", userCredential.user.uid), {
          firstName: firstName,
          lastName: lastName,
          email: email,
          isAdmin: false,
        });
        router.push("/login");
      })
      .catch((error) => {
        const errorCode = error.code;

        //modify error code to display as a message to the user
        var errorMessage = error.code.split("/").pop();
        errorMessage = errorMessage.replace(/-/g, " ");

        //If the email already exists, display error to user
        setemailInvalid(errorMessage);
      });
  };

  function validateNewUser() {
    var passCompare = true;
    var passwordValid = true;
    var checkFName = true;
    var checkLName = true;

    //regex used to determine password requirements
    var reg = new RegExp(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?.!@$%^&*-])(?!.*(\w)\1{1,}).+.{8,}$/
    );

    if (firstName.length == 0) {
      setValidateFName(false);
      checkFName = false;
    } else {
      setValidateFName(true);
    }

    if (lastName.length == 0) {
      setValidateLName(false);
      checkLName = false;
    } else {
      setValidateLName(true);
    }

    //User didn't meet the password requirements, so display error message
    if (!reg.test(password)) {
      setValidatePassword(false);
      passwordValid = false;
    } else if (password != confirmPassword) {
      setValidatePassCompare(false);
      setValidatePassword(true);
      passCompare = false;
    } else {
      setValidatePassCompare(true);
      setValidatePassword(true);
    }

    if (passCompare && passwordValid && checkFName && checkLName) {
      createAccountLogin();
    }
  }

  const handleResize = () => {
    // Check if childRef is not null before accessing clientHeight
    if (childRef.current) {

      const newHeight = childRef.current.clientHeight;

      if(newHeight > 450 && animateStatus == 0){
        animateStatus = 1;
        parentRef.current.style.height = `${newHeight}px`;

      } else if (newHeight <= 450 && animateStatus == 1) {
        animateStatus = 0;
        parentRef.current.style.height = `${450}px`;


      } else if (newHeight > 450 && animateStatus == 1){
        parentRef.current.style.height = `${newHeight}px`;

      }

    }
  };

  const animate = () => {
    handleResize();
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    // Create a ResizeObserver to watch for changes in the child's clientHeight
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries && entries[0] && entries[0].target) {
        const newHeight = entries[0].target.clientHeight;
      }
    });

    // Start observing the child element
    resizeObserver.observe(childRef.current);

    // Begin the animation loop
    animate();

    // Cleanup function to disconnect the ResizeObserver when the component unmounts
    return () => {
      resizeObserver.disconnect();
    };
  }, []);
  
  
  return (
    <div>

      <div className={styles.transCircle}></div>
      <div className={styles.triangle1}></div>
      <div className={styles.triangle}></div>
      <div className={styles.circle}></div>
      <div className={styles.square1}></div>
      <div className={styles.square}></div>
      <div className={styles.square2}></div>
      <div className={styles.square3}></div>
      <div className={styles.transCircle1}></div>

     <div ref={parentRef} id="container" className={styles.container}>
      <h1 className={styles.h1}>Create Account</h1>


      <style jsx global>{`
      
         body {
          background-color: black;
          color: white;
          margin: 0;
          font-family: 'Itim';
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
          font-family: "Itim";
          font-size:35px;
        }
        
        `}
        </style>
      <main>
        
        <div ref={childRef} id="formContainer" className={styles.formContainer}>
          <div className={styles.input}>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <span className={styles.errorMessage} hidden={!validateFName ? "" : "false"}>
            Must enter a first name.
          </span>

          <div className={styles.input}>
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <span className={styles.errorMessage} hidden={!validateLName ? "" : "false"}>
            Must enter a last name.
          </span>

          <div className={styles.input}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <span className={styles.errorMessage}
            style={{ color: "red" }}
            hidden={emailInvalid != "" ? "" : "false"}
          >
            {emailInvalid}
          </span>
          <div className={styles.input}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <ul
            style={{ color: "red" }} hidden={!validatePassword ? "" : "false"}
          >
            <li>Minimum 8 characters</li>
            <li>At least one special character (#?.!@$%^&*-)</li>
            <li>At least one uppercase letter</li>
            <li>At least one lowercase letter</li>
            <li>At least one number</li>
            <li>No repeating characters</li>
          </ul>
          <div className={styles.input}>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
            />
            <span className={styles.errorMessage} hidden={!validatePassCompare ? "" : "false"}
            >
              Passwords do not match.
            </span>
          </div>
        <div>
          <button className={styles.createAccountButton} onClick={validateNewUser}>Create Account</button>
        </div>
        <div className={styles.signInLink}>
          <span className={styles.siginText}>Already have an account?</span> <br></br>
          <Link href="/login">Sign in</Link>
        </div>
        </div>
      </main>
      </div>
    </div>
  );
}

