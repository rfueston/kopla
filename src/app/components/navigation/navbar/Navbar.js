// components/Navbar.js

import Link from 'next/link';
import LogoutLink from '../../../../../lib/logoutUser';
import styles from '../styles/Navbar.module.css';
import {useState, useEffect} from "react";
import checkAdminStatus from '../../../../../lib/checkAdmin';


const Navbar = () => {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const isAdminValue = await checkAdminStatus();
            setIsAdmin(isAdminValue);
        };

        fetchData();
    }, []);

    return (
        <nav className={styles.navbar}>
            <ul className={styles.navList}>
                <li className={styles.navItem}>
                    <Link href="/main">
                        Dashboard
                    </Link>
                </li>
                {isAdmin && (
                    <li className={styles.navItem}>
                        <Link href="/geofencing">
                            Geofencing
                        </Link>
                    </li>
                )}
                {isAdmin && (
                    <li className={styles.navItem}>
                        <Link href="/firebase">
                            Admin
                        </Link>
                    </li>
                )}
                <li className={styles.navItem}>
                    <Link href="/settings">
                        Settings
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <LogoutLink/>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;