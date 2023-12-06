
import React, { useState, useEffect } from 'react';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import styles from './system.module.css';
import SettingsController from './settingsController';

const SystemPage = () => {
    const [systemSettings, setSystemSettings] = useState({
        zoneAmount: 3,
        schoolAdminCode: 'AdminSchool123',
        schoolStaffCode: 'School123'
    });

    const [systemDoc, setSystemDoc] = useState(null);


    useEffect(() => {
      SettingsController.getSystemDocument()
          .then((systemDoc) => {
            setSystemDoc(systemDoc);
              setSystemSettings({
                zoneAmount: systemDoc.zoneAmount || 3,
                schoolAdminCode: systemDoc.schoolAdminCode || 'AdminSchool123',
                schoolStaffCode: systemDoc.schoolStaffCode || 'School123',
              });
          })
          .catch((error) => {
              console.error('Error fetching user document:', error);
          });
  }, []);

    const handleUpdate = async (e) => {
        try {
          e.preventDefault();
          const isValid = await getCurrentZoneData(systemSettings.zoneAmount);

          if (dataHasChanged()) {
            if(isValid){
            await SettingsController.updateSystemDocument(systemSettings)
                .then(async () => {
                  alert("Settings Updated Successfully!");
                })
                .catch((error) => {
                    console.error('Error updating settings:', error);
                });
              } else {
                alert("You are trying to remove a zone that currently has a parent in it. Please dismiss the parent(s) before changing the zone amount");

              }
        }

        } catch (e) {
            console.error(e);
        }
    };

    const dataHasChanged = () => {
      return (
          systemSettings.zoneAmount !== systemDoc.zoneAmount ||
          systemSettings.schoolAdminCode !== systemDoc.schoolAdminCode ||
          systemSettings.schoolStaffCode !== systemDoc.schoolStaffCode
      );
  };

    const handleInputChange = (e) => {
      const {name, value} = e.target;
      setSystemSettings({...systemSettings, [name]: value});
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

    for (let i = systemDoc.zoneAmount; i > value; i--) {
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
                text-align:left;
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
            <form>
            <div className={styles.formgroup}>
              <label>Number of Zones</label>
                <select
                  name="zoneAmount"
                  value={systemSettings.zoneAmount}
                  onChange={handleInputChange}
                  >
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
              <div className={styles.formgroup}>
                <label>School Admin Code</label>
                <input
                  type="text"
                  name="schoolAdminCode"
                  value={systemSettings.schoolAdminCode}
                  onChange={handleInputChange}
                  />
              </div>
              <div className={styles.formgroup}>
                <label>School Staff Code</label>
                <input
                  type="text"
                  name="schoolStaffCode"
                  value={systemSettings.schoolStaffCode}
                  onChange={handleInputChange}
                  />
              </div>
              <button onClick={handleUpdate}>Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};


export default SystemPage;