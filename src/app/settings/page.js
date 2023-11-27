"use client";
import React, { useState, useEffect } from 'react';
import EditProfile from './EditProfile';
import Notifications from './notifications';
import Security from './security';
import Accessibility from './accessibility';
import Children from './children';
import Help from './help';
import styles from './styles.css';
import Link from 'next/link';
import { auth } from '../firebase'; // Import the auth instance from your firebase.js file
import { handleLogout } from '../../../lib/handleCookie';
import { useRouter } from "next/navigation";
import checkAuth from '../../../lib/cookieAuth';


const SettingsPage = () => {
  useEffect(() => {
    checkAuth();
  }, []);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('edit-profile');
  //const [currentUser, setCurrentUser] = useState('');
  

  useEffect(() => {
    // Use an effect to fetch user data when the component mounts
    const fetchUserData = async () => {
      try {
        auth.onAuthStateChanged(function(user) {
          //TO DO: make functions for updating backend. Use onAuthStateChanged inside each function
          
          console.log(" User Data:", user);
       
        })
        //console.log(auth.currentUser);
    
        //console.log(currentUser);
     
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData(); // Call the function to fetch user data

    // Cleanup function (optional)
    return () => {
      // Any cleanup code if needed
    };
  }, []); // Run when the component mounts

  const renderTabContent = () => {
    switch (activeTab) {
        case 'edit-profile':
          return <EditProfile />;
        case 'notifications':
          return <Notifications />;
        case 'security':
          return <Security />;
        case 'accessibility':
          return <Accessibility />;
        case 'children':
          return <Children />;
        case 'help':
          return <Help />;
        default:
          return null;
      }
  };

  function logoutUser() {
    handleLogout();
    router.push("/login");
  }

  return (
    <div className="settings-container">
      <div className="settingsMenu">
        <ul>
          <li>
            <button onClick={() => setActiveTab('edit-profile')}>Edit Profile</button>
          </li>
          <li>
            <button onClick={() => setActiveTab('notifications')}>Notifications</button>
          </li>
          <li>
            <button onClick={() => setActiveTab('children')}>Children</button>
          </li>
          <li>
            <button onClick={() => setActiveTab('security')}>Security</button>
          </li>
          <li>
            <button onClick={() => setActiveTab('accessibility')}>Accessibility</button>
          </li>
          <li>
            <button onClick={() => setActiveTab('help')}>Help</button>
          </li>
        </ul>
        <div className="sign-out-button">
          <button onClick={logoutUser}>Logout</button>
        </div>
      </div>
      <div className="settingsContent">{renderTabContent()}</div>
    </div>
  );
};

export default SettingsPage;