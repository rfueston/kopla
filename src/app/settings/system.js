
import React, { useState, useEffect } from 'react';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import styles from './system.module.css';

const SystemPage = () => {
    const [systemSettings, setSystemSettings] = useState({
        zoneAmount: 3
    });

    useEffect(() => {
        const fetchSystemSettings = async () => {
          const systemDocRef = doc(db, 'System', 'SystemSetting');
      
          try {
            const docSnapshot = await getDoc(systemDocRef);
      
            if (docSnapshot.exists()) {
              // Document exists, use the data
              const data = docSnapshot.data();
              setSystemSettings({
                zoneAmount: data.zoneAmount || 3,
              });
            } else {
              // Document doesn't exist, use the default value
              setSystemSettings({
                zoneAmount: 3,
              });
            }
          } catch (error) {
            console.error('Error fetching system settings:', error);
          }
        };
      
        fetchSystemSettings();
      }, []); // Empty dependency array to run the effect only once

    const handleUpdate = async (setting, value) => {
        try {
          const isValid = await getCurrentZoneData(value);

          if(isValid){
            setSystemSettings(() => ({[setting]: value}));

            setDoc(doc(db, "System", "SystemSetting"), {
                zoneAmount: value
            });

            alert("System Updated");

          } else {
            alert("You are trying to remove a zone that currently has a parent in it. Please dismiss the parent(s) before changing the zone amount");
          }

        } catch (e) {
            console.error(e);
        }
    };

    const getZoneData = async (systemDocRef) => {
      try {
          const docSnapshot = await getDoc(systemDocRef);

          if (docSnapshot.exists()) {
              const data = docSnapshot.data();
              return data.parentId === "";
          } else {
              return false;
          }
      } catch (error) {
          console.error('Error fetching zone data:', error);
          return false;
      }
  };

    const getCurrentZoneData = async (value) => {
    const promises = [];

    for (let i = systemSettings.zoneAmount; i > value; i--) {
        const systemDocRef = doc(db, 'zone', i.toString());
        promises.push(getZoneData(systemDocRef));
    }

    const results = await Promise.all(promises);

    // Check if all results are valid (parentId is empty)
    return results.every(isValid => isValid);
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

            <div className={styles.systemContainer}>
                <div className={styles.systemBox}>
                    <h1>System Settings</h1>
                    <div className={styles.systemSetting}>
                        <label>Number of Zones</label>
                        <div className={styles.toggleSwitch}>
                            <select  value={systemSettings.zoneAmount} onChange={(e) => handleUpdate("zoneAmount", e.target.value)}>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
    );
};

export default SystemPage;