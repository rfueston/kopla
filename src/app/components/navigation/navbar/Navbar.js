// components/Navbar.js

import Link from 'next/link';
import LogoutLink from '../../../../../lib/logoutUser';
import styles from '../styles/Navbar.module.css';
import {useEffect, useState} from "react";
import checkAdminStatus from '../../../../../lib/checkAdmin';


const Navbar = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const isAdminValue = await checkAdminStatus();
            setIsAdmin(isAdminValue);
        };

        fetchData();
    }, []);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <nav className={`${styles.navbar} ${styles.mobileOnly}`}>
            {/* Dropdown button for mobile devices */}
            <div className={`${styles.dropdownButton} ${showDropdown ? styles.showDropdown : ''}`} onClick={toggleDropdown}>
            <span className={styles.menuText}>☰ Menu</span>
            </div>

            {/* Dropdown menu for mobile devices */}
            <ul className={`${styles.navList} ${styles.dropdown} ${showDropdown ? '' : styles.hideDropdown}`}>
                <li className={styles.navItem} onClick={toggleDropdown}>
                    <Link href="/main">Dashboard</Link>
                </li>
                {isAdmin && (
                    <li className={styles.navItem} onClick={toggleDropdown}>
                        <Link href="/geofencing">Geofencing</Link>
                    </li>
                )}
                {isAdmin && (
                    <li className={styles.navItem} onClick={toggleDropdown}>
                        <Link href="/firebase">Admin</Link>
                    </li>
                )}
                <li className={styles.navItem} onClick={toggleDropdown}>
                    <Link href="/settings">Settings</Link>
                </li>
                <li className={styles.navItem} onClick={toggleDropdown}>
                    <LogoutLink />
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;