// NotificationsPage.js
import React from 'react';
import styles from './notifications.css'; // Import the CSS


const NotificationsPage = () => {
  return (
    <div className="notifications-container">
      <h1>Notifications</h1>
      <ul className="notification-list">
        <li className="notification-item">
          <div className="notification-title">New Message</div>
          <div className="notification-content">
            You have a new message from a friend.
          </div>
          <div className="notification-date">2 hours ago</div>
        </li>
        {/* Add more notifications as needed */}
      </ul>
    </div>
  );
};

export default NotificationsPage;