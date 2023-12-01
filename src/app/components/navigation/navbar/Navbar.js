// components/Navbar.js

import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <ul className={styles.navList}>
                <li className={styles.navItem}>
                    <Link href="/main">
                        Dashboard
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
                    <Link href="/firebase">
                        Admin
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/">
                        Logout
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;