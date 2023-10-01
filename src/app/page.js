import React from 'react';
import { BrowserRouter as Router, Switch,
    Route, Redirect,} from "react-router-dom";


import LoginMain from "../app/login/page";
import Link from "next/link";

export default function Home() {
    return (
        <div>
            <header>Success!, logged in</header>

            <div>
                <Link href="/login">Sign In</Link>
            </div>

            <div>
                <Link href="/account_creation">Create Account</Link>
            </div>

        </div>
    );

}
