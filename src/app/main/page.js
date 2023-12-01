"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth } from "../firebase";
import styles from "./main.module.css"; // Import the CSS
import React from 'react';
import Navbar from "../components/navigation/navbar/Navbar"; // Import the Navbar component



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
import loginController from "../login/pageController";
import checkAuth from '../../../lib/cookieAuth';
import checkAdminStatus from '../../../lib/checkAdmin';

export default function Main() {

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        checkAuth();
        const fetchData = async () => {
          const isAdminValue = await checkAdminStatus();
          setIsAdmin(isAdminValue);
        };

        fetchData();
      }, []);

    useEffect(() => {
        // Use an effect to run when the component mounts
        const fetchUserData = async () => {
          try {
            const currentUser = auth.currentUser;

            if (currentUser) {
              // Access user details
              console.log('User ID:', currentUser.uid);
              console.log('User Email:', currentUser.email);
              console.log('User Display Name:', currentUser.displayName);
              console.log('User Photo URL:', currentUser.photoURL);
            } else {
              console.log('No user signed in');
            }
          } catch (error) {
            console.error('Error fetching user data:', error.message);
          }
        };

        fetchUserData(); // Call the function to fetch user data

        // Cleanup function (optional)
        return () => {
          // Any cleanup code if needed
        };
      }, []);

    return (

        //if else statement for return admin or parent user from login controller (getAdminStatus).
        //return if statements based on global admin status variable

        <div>
        <header>Success!, logged in</header>
            <Navbar /> {}
        <br></br>
            <style jsx global>{`
        
          
      body {
        font-family: Itim, sans-serif;
        position: absolute;
        top: 0px;
        left: 50%;
        width: 1000px;
        margin: 0 auto;
        margin-left: -500px;
      }
      
      header {
        background-color: #69B9EB;
        color: white;
        text-align: center;
        padding: 10px 0;
      }

      main {
        max-width: fit-content;
        margin: 0 auto;
        padding: 10px;
        background-color: #fff;
        color: grey;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      
     
     `}
     </style>


            {/*<main>*/}
            {/*    {isAdmin && (*/}
            {/*        <div>*/}
            {/*           */}
            {/*            <Button href="/firebase" variant="contained" className={styles.firebaseLink}>*/}
            {/*            Admin Page*/}
            {/*            </Button>*/}
            {/*        </div>*/}
            {/*    )}*/}
            {/*<br></br>*/}
            {/*<div>*/}
            {/*    <Link href="/pickup_lane" variant="contained" className={styles.pickupLane}>Pickup Lane</Link> /!* Temporary navigation to pickup lane page *!/*/}
            {/*</div>*/}
            {/*<br></br>*/}
            {/*<div>*/}
            {/*    <Button href="/geofencing" variant="contained" className={styles.geofencing}>Geofencing</Button> /!* Temporary navigation to GPS page *!/*/}
            {/*</div>*/}
            {/*<br></br>*/}
            {/*<div>*/}
            {/*    <Button href="/settings" variant="contained"className={styles.settings}>Settings</Button> /!* Temporary navigation to Settings page *!/*/}
            {/*</div>*/}
            {/*    <br></br>*/}

            {/*</main>*/}

        </div>
    )
}