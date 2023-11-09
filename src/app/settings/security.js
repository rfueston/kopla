// pages/security.js
import React from 'react';
import Head from 'next/head';
import styles from './security.css'; // Import the CSS


export default function Security() {
  return (
    <div className="security-settings">
      <Head>
        <title>Security Settings</title>
      </Head>
      <h1>Security Settings</h1>
      <div className="setting">
        <label>Password:</label>
        <input type="password" />
      </div>
      <div className="setting">
        <label>Two-Factor Authentication:</label>
        <input type="checkbox" />
      </div>
      <button>Save Changes</button>
    </div>
  );
}