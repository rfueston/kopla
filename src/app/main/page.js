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

export default function Main() {
    return (
        <div>
            <header>Success!, logged in</header>
            <br></br>
            <main>
            <div>
                <Button href="/firebase" variant="contained" id="firebaseLink">Firebase (dev page)</Button>
            </div>
            <br></br>
            <div>
                <Link href="/pickup_lane" variant="contained" id="pickupLane">Pickup Lane</Link> {/* Temporary navigation to pickup lane page */}
            </div>
            <br></br>
            <div>
                <Button href="/geofencing" variant="contained" id="geofencing">Geofencing</Button> {/* Temporary navigation to GPS page */}
            </div>
            <br></br>
            <div>
                <Button href="/settings" variant="contained" id="settings">Settings</Button> {/* Temporary navigation to Settings page */}
            </div>
                <br></br>

            </main>

        </div>
    )
}