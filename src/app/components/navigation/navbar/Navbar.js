// components/Navbar.js

import Link from 'next/link';
import styles from '../styles/Navbar.module.css';
import { handleLogout } from '../../../../../lib/handleCookie';
import { useRouter } from "next/navigation";
import React from "react";






const Navbar = () => {
    const router = useRouter();
    function logoutUser() {
        handleLogout();
        router.push("/login");
    }
    return (
        <nav className={styles.navbar}>
            <ul className={styles.navList}>
                <li className={styles.navItem}>
                    <Link href="/pickup_lane">
                        Pickup Lane
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/settings">
                        Settings
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/geofencing">
                        Geofencing
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <div>
                        <button onClick={logoutUser}>Logout</button>
                    </div>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;


