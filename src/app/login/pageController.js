"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthUserContext";
import styles from "./styles.css"; // Import the CSS
import { auth } from "../../../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
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



class loginController {
  constructor() {
    this.isAdmin = false;
  }

  getAdminStatus() {
    return this.isAdmin;
    //make call to firebase with userUID to grab admin status (isAdmin)
    //TO DO: set admin status as global vairable in this controller for true or false
  }

  async setAdminStatus(userUID) {
    //grab global variable
    console.log("User UID:", userUID);
    const userRef = doc(db, "User", userUID);
    const userDoc = await getDoc(userRef).catch((error) => {
      console.error("Error fetching user document:", error);
    });
    console.log("User Document:", userDoc);

    if (userDoc.exists()) {
      this.isAdmin = userDoc.data().isAdmin || false; // Set isAdmin based on user document in Firestore
      console.log("isAdmin Value:", this.isAdmin);
    } else {
      this.isAdmin = false; // User document not found, consider them not an admin
      console.log("User Document Does Not Exist. isAdmin Value Set to False");
    }
  }
}

const loginCtrl = new loginController();
export default loginCtrl;
