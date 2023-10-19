"use client";

import { useState } from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { useAuth } from "../../../context/AuthUserContext";

import styles from "./styles.css"; // Import the CSS

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





export default function Settings() {

    const [sidebarOpen, setSidebarOpen] = useState(false);



    const toggleSidebar = () => {

        setSidebarOpen(!sidebarOpen);

    };



    return (

        <div>

            <header>Settings</header>

            <br></br>

            <main>

                <div>



                    <div className="container">

                        <div className="navbar">

                            <div className="menu-icon">



                            </div>







                            <div className="profile-container">

                                <div className="name-container">

                                    <div className="input-field">

                                        <label htmlFor="first-name">First Name</label>

                                        <input type="text" id="first-name" name="first-name" placeholder="Enter First Name" />

                                    </div>

                                    <div className="input-field">

                                        <label htmlFor="last-name">Last Name</label>

                                        <input type="text" id="last-name" name="last-name" placeholder="Enter Last Name" />

                                    </div>

                                </div>



                                <label htmlFor="email">Email:</label>

                                <input type="email" id="email" name="email" placeholder="Enter your email address" />



                                <label htmlFor="address">Address:</label>

                                <input type="text" id="address" name="address" placeholder="Enter your address" />



                                <div className="name-container">

                                    <div className="input-field">

                                        <label htmlFor="city">City</label>

                                        <input type="text" id="city" name="city" placeholder="City" />

                                    </div>



                                    <div className="input-field">

                                        <label htmlFor="state">State</label>

                                        <input list="states" name="state" id="state" style={{ width: '200px', height: '30px' }} />

                                        <datalist id="states">

                                            <option value="Alabama"></option>

                                            {/* Add more states here */}

                                        </datalist>

                                    </div>

                                </div>



                                <label htmlFor="contact">Contact Number</label>

                                <input type="text" id="contact" name="contact" placeholder="Enter your contact" />



                                <label htmlFor="password">Password</label>

                                <input type="password" id="password" name="password" placeholder="Enter your password" />





                            </div>

                        </div>

                    </div>







                    <Button href="/login" variant="contained" id="firebaseLink">Logout</Button>

                </div>

            </main>

        </div>

    );

}