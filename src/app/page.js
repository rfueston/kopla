import React from 'react';
import Link from "next/link";

export default function Home() {
    return (
        <div>
            <header>K.O.P.L.A.</header>
            <br></br>

            <main>
                <div>
                    <button><Link href="/login">Sign In</Link></button>
                </div>
                <div>
                    <button><Link href="/account_creation">Create Account</Link></button>
                </div>
            </main>

        </div>
    );
}
