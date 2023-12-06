"use client";
import React, {useEffect, useState} from 'react';
import EditProfile from './EditProfile';
import Notifications from './notifications';
import Security from './security';
import System from './system'
import styles from './styles.css';
import {auth} from '../firebase'; // Import the auth instance from your firebase.js file
import {handleLogout} from '../../../lib/handleCookie';
import {useRouter} from "next/navigation";
import checkAuth from '../../../lib/cookieAuth';
import Navbar from "../components/navigation/navbar/Navbar";
import SettingsController from './settingsController';


const SettingsPage = () => {

    const [profileData, setProfileData] = useState({
        isAdmin: false,
        isParent: false,
        });
    const [userDoc, setUserDoc] = useState(null);
    
    useEffect(() => {
        checkAuth();

        SettingsController.getUserDocument()
            .then((userDoc) => {
                setUserDoc(userDoc);
                setProfileData({
                    isAdmin: userDoc.isAdmin || false,
                    isParent: userDoc.isParent || false,
                });
            })
            .catch((error) => {
                console.error('Error fetching user document:', error);
            });
    }, []);
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('edit-profile');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'edit-profile':
                return <EditProfile/>;
            case 'notifications':
                return <Notifications/>;
            case 'security':
                return <Security/>;
             case 'system':
               return <System />;
            default:
                return null;
        }
    };

    const handleStaffDownload = () => {
        console.log("Yes");
        const pdfPath = '/userManualStaff.pdf';
        const link = document.createElement('a');
        link.href = pdfPath;
        link.download = 'userManual.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
    const handleParentDownload = () => {
        const pdfPath = '/userManualParent.pdf';
        const link = document.createElement('a');
        link.href = pdfPath;
        link.download = 'userManual.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };

    return (

        <div>
            <style jsx global>{`
    
      li {
        list-style-type: none;
        padding: 10px;
      }
    
    `}
            </style>

            <div className={styles.settingscontainer}>
                <Navbar/> {}

                <div className={styles.settingsMenu}>

                    <li>
                        <button onClick={() => setActiveTab('edit-profile')}>Edit Profile</button>
                    </li>
                    <li>
                        <button onClick={() => setActiveTab('notifications')}>Notifications</button>
                    </li>
                    <li>
                        <button onClick={() => setActiveTab('security')}>Change Password</button>
                    </li>
                    {profileData.isAdmin && (
                    <li>
                        <button onClick={() => setActiveTab('system')}>System Settings</button>
                    </li>
                    )}
                    <li>
                        <button onClick={ !profileData.isParent ? handleStaffDownload : handleParentDownload}>Download User Manual</button>
                    </li>
                </div>
                <div className={styles.settingsContent}>{renderTabContent()}</div>
            </div>
        </div>
    );
};

export default SettingsPage;





