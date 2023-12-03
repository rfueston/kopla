// Notifications.js
import React, { useState } from 'react';
import styles from './notifications.module.css'; // Import the CSS

const Notifications = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    notification1: false,
    notification2: false,
    notification3: false,
  });

  const handleToggle = (notification) => {
    setNotificationSettings((prevSettings) => ({
      ...prevSettings,
      [notification]: !prevSettings[notification],
    }));
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
        padding: 10px;
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

    <div className={styles.notificationsContainer}>
      <div className={styles.notificationsBox}>
        <h1>Notifications</h1>
        <div className={styles.notificationSetting}>
          <label>Notification 1</label>
          <div className={styles.toggleSwitch} onClick={() => handleToggle('notification1')}>
            <div className={`${styles.slider} ${notificationSettings.notification1 && styles.active}`}></div>
          </div>
        </div>
        <div className={styles.notificationSetting}>
          <label>Notification 2</label>
          <div className={styles.toggleSwitch} onClick={() => handleToggle('notification2')}>
            <div className={`${styles.slider} ${notificationSettings.notification2 && styles.active}`}></div>
          </div>
        </div>
        <div className={styles.notificationSetting}>
          <label>Notification 3</label>
          <div className={styles.toggleSwitch} onClick={() => handleToggle('notification3')}>
            <div className={`${styles.slider} ${notificationSettings.notification3 && styles.active}`}></div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Notifications;