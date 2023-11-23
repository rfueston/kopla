"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useAuth } from "../../../context/AuthUserContext";
import styles from "./main.module.css"; // Import the CSS
import React from 'react';

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

export default function Main() {
    
    useEffect(() => {
        checkAuth();
      }, []);

    const isAdmin = loginController.getAdminStatus();
    //pull from login controller method to access admin information

    return (

        //if else statement for return admin or parent user from login controller (getAdminStatus).
        //return if statements based on global admin status variable 

        <div>
        <header>Success!, logged in</header>
        <br></br>
            <style jsx global>{`
      
      body {
        font-family: Arial, sans-serif;
        position: absolute;
        top: 0px;
        left: 50%;
        width: 1000px;
        margin: 0 auto;
        margin-left: -500px;
      }
      
      header {
        background-color: #007bff;
        color: white;
        text-align: center;
        padding: 20px 0;
      }

      main {
        max-width: fit-content;
        margin: 0 auto;
        padding: 20px;
        background-color: #fff;
        color: grey;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      
     
     `}
     </style>
            <main>
                {isAdmin && (
                    <div>
                       
                        <Button href="/firebase" variant="contained" className={styles.firebaseLink}>
                        Firebase (dev page)
                        </Button>
                    </div>
                )}
            <br></br>
            <div>
                <Link href="/pickup_lane" variant="contained" className={styles.pickupLane}>Pickup Lane</Link> {/* Temporary navigation to pickup lane page */}
            </div>
            <br></br>
            <div>
                <Button href="/geofencing" variant="contained" className={styles.geofencing}>Geofencing</Button> {/* Temporary navigation to GPS page */}
            </div>
            <br></br>
            <div>
                <Button href="/settings" variant="contained"className={styles.settings}>Settings</Button> {/* Temporary navigation to Settings page */}
            </div>
                <br></br>

            </main>

        </div>
    )
}