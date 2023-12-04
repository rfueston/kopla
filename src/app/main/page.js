"use client";
import React, {useEffect} from "react";
import {auth} from "../firebase";
import Navbar from "../components/navigation/navbar/Navbar"; // Import the Navbar component
import Pickup from "../pickup_lane/page"; // Import the Navbar component
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
            <Navbar/> {}
            <Pickup/>

        </div>
    )
}