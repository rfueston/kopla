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
    return (
        <div>
            <header>Settings</header>
            <br></br>
            <main>
            <div>
                <Button href="/login" variant="contained" id="firebaseLink">Logout</Button>
            </div>
            </main>
        </div>
    )
}
