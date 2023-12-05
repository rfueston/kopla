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
        const fetchUserData = async () => {
            try {
                const currentUser = auth.currentUser;

            } catch (error) {
                console.error('Error fetching user data:', error.message);
            }
        };

        fetchUserData(); // Call the function to fetch user data

        return () => {
        };
    }, []);

    return (

        <div>
            <Navbar/> {}
            <Pickup/>

        </div>
    )
}