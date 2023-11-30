// pages/security.js
import React, { useState } from 'react';
import Head from 'next/head';
import SettingsController from './settingsController'; // Assuming you have a separate settingsController file
import styles from './security.module.css'; // Import the CSS
import { handleLogout } from '../../../lib/handleCookie';
import { useRouter } from "next/navigation";

export default function Security() {
  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmNewPassword: '',
  });
  const router = useRouter();
  const [passwordError, setPasswordError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleSavePassword = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword && passwordData.newPassword === passwordData.confirmNewPassword) {
      try {
        await SettingsController.updatePassword(passwordData.newPassword);
        alert('Password updated successfully!');

        // Log the user out and redirect to the login screen
        handleLogout();
        router.push('/login');
      } catch (error) {
        console.error('Error updating password:', error);
        setPasswordError(error.message);
      }
    } else {
      setPasswordError("Passwords must match and cannot be empty.");
    }
  };

  return (
    <div>
      <style jsx global>{`
      
      label {
        display: block;
        font-weight: bold;
      }
      
      input,
      textarea {
        width: 100%;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
      
      button {
        background-color: #007bff;
        color: #fff;
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
    
      button:hover {
        background-color: #0056b3;
      }
      
   `}
   </style>
    
    <div className={styles.securitysettings}>
      {/* ... existing code ... */}
      <div className={styles.setting}>
        <label>New Password:</label>
        <input
          type="password"
          name="newPassword"
          value={passwordData.newPassword}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.setting}>
        <label>Confirm New Password:</label>
        <input
          type="password"
          name="confirmNewPassword"
          value={passwordData.confirmNewPassword}
          onChange={handleInputChange}
        />
      </div>
      {passwordError && <div>{passwordError}</div>}
      <button onClick={handleSavePassword}>Save Changes</button>
    </div>
    </div>
  );
}