"use client";
import { useState } from 'react';
import Link from 'next/link';
import styles from './styles.css'; // Import the CSS

export default function CreateAccount() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setRepeatPassword] = useState('');
  const [email, setEmail] = useState('');

  const createAccountLogin = async () => {
    // Implement logic here
  };

  return (
    <div>
      <header>
        <h1>Account Creation</h1>
      </header>
      <main>
        <div className="form-container">
          <div className="input-field">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="input-field">
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="input-field">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-field">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-field">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-field">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>
          <div className="input-field">
            <button onClick={createAccountLogin}>Create Account</button>
          </div>
        </div>
        <div className="sign-in-link">
          <Link href="/login">
            Sign in
          </Link>
        </div>
      </main>
    </div>
  );
}