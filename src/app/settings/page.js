"use client";
import React, { useState } from 'react';
import EditProfile from './EditProfile';
import Notifications from './notifications';
import Security from './security';
import Accessibility from './accessibility';
import Help from './help';
import styles from './styles.css';
import Link from 'next/link';
import { deleteCookie } from 'cookies-next';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('edit-profile');

  const handleLogout = () => {
    // Destroy the 'Test' cookie
    deleteCookie("Test");
    
  };

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
            <button onClick={() => setActiveTab('accessibility')}>Accessibility</button>
          </li>
          <li>
            <button onClick={() => setActiveTab('help')}>Help</button>
          </li>
        </ul>
        <div className="sign-in-link">
          <Link href="/login" onClick={handleLogout}>Logout</Link>
        </div> 
      </div>
      <div className="settingsContent">{renderTabContent()}</div>
    </div>
  );
};

export default SettingsPage;