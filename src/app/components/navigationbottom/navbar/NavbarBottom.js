// components/NavbarBottom.js

import Link from 'next/link';
import styles from '../styles/NavbarBottom.module.css';

const NavbarBottom = () => {
    return (
        <nav className={styles.button}>
            <button>
                On My Way
            </button>

            <br></br>
            <button>
                I'm Here!
            </button>
        </nav>
    );
};

export default NavbarBottom;