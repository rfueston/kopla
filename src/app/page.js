import React from 'react';
import Link from "next/link";

export default function Home() {
    return (
        <div>
            <header>K.O.P.L.A.</header>
            <br></br>
            <div>
                <Link href="/login">Sign In</Link>
            </div>

            <div>
                <Link href="/account_creation">Create Account</Link>
            </div>
        </div>
    );
}
