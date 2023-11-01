"use client";
import React, { useState } from 'react';
import EditProfile from './EditProfile'; // Import the EditProfile component
import Notifications from './notifications'; // Import the Notifications component
import Security from './security'; // Import the Security component
import styles from './styles.css'; // Import the CSS
import Link from 'next/link';


const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('edit-profile');

  const renderTabContent = () => {
    switch (activeTab) {
        case 'edit-profile':
          return <EditProfile />;
        case 'notifications':
          return <Notifications />;
        case 'security':
          return <Security />;
        case 'appearance':
          return <Appearance />;
        case 'help':
          return <Help />;
        default:
          return null;
      }
  };

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
            <button onClick={() => setActiveTab('security')}>Security</button>
          </li>
          <li>
            <button onClick={() => setActiveTab('appearance')}>Appearance</button>
          </li>
          <li>
            <button onClick={() => setActiveTab('help')}>Help</button>
          </li>
        </ul>
        <div className="sign-in-link">
          <Link href="/login">
            Logout
          </Link>
        </div>
      </div>
      <div className="settingsContent">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default SettingsPage;