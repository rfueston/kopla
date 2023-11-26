// pages/index.js
import Head from 'next/head';
import React, { useState } from 'react';
import styles from './children.css';

const Home = () => {
    const [names, setNames] = useState([]);
    const [newName, setNewName] = useState('');

    const handleAddName = () => {
        if (newName.trim() !== '') {
            setNames([...names, newName]);
            setNewName('');
        }
    };

    const handleRemoveName = (index) => {
        const updatedNames = [...names];
        updatedNames.splice(index, 1);
        setNames(updatedNames);
    };

    return (
        <div className={styles.container}>
            <Head>
                <meta name="description" content="A simple Next.js app for managing names." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1>List of Children</h1>
                <ol>
                    {names.map((name, index) => (
                        <li key={index}>
                            {name}
                            <button className={styles.removeButton} onClick={() => handleRemoveName(index)}>
                                X
                            </button>
                        </li>
                    ))}
                </ol>

                <input
                    type="text"
                    placeholder="Enter a child's name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                />
                <button onClick={handleAddName}>Add Name</button>
            </main>
        </div>
    );
};

export default Home;
