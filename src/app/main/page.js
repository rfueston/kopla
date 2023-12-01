"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth } from "../firebase";
import styles from "./main.module.css"; // Import the CSS
import React from 'react';
import Navbar from "../components/navigation/navbar/Navbar"; // Import the Navbar component
import Pickup from "../pickup_lane/page"; // Import the Navbar component



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

        <div>
            <Navbar /> {}
            <Pickup />

        </div>
    )
}