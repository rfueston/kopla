// pages/security.js
import React, {useState} from 'react';
import SettingsController from './settingsController'; // Assuming you have a separate settingsController file
import styles from './security.module.css'; // Import the CSS
import {handleLogout} from '../../../lib/handleCookie';
import {useRouter} from 'next/navigation';

const PASSWORD_REQUIREMENTS = [
    'Minimum 8 characters',
    'At least 1 uppercase letter',
    'At least 1 lowercase letter',
    'At least 1 number',
    'At least 1 special character',
];

const isPasswordValid = (password) => {
    const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?.!@$%^&*-]).{8,}$/;
    return regex.test(password);
};

export default function Security() {
    const [passwordData, setPasswordData] = useState({
        newPassword: '',
        confirmNewPassword: '',
    });
    const router = useRouter();
    const [passwordError, setPasswordError] = useState(null);
    const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setPasswordData({...passwordData, [name]: value});
        // Hide password requirements when the user starts typing a new password
        setShowPasswordRequirements(false);
    };

    const handleSavePassword = async (e) => {
        e.preventDefault();

        if (passwordData.newPassword && passwordData.newPassword === passwordData.confirmNewPassword) {
            const newPasswordValid = isPasswordValid(passwordData.newPassword);

            if (newPasswordValid) {
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
                // Show password requirements if the password is not valid
                setShowPasswordRequirements(true);
                setPasswordError(null);
            }
        } else {
            setPasswordError('Passwords must match and cannot be empty.');
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
            `}</style>

            <div className={styles.securitysettings}>
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
                {passwordError && <div className={styles.errorMessage}>{passwordError}</div>}
                {showPasswordRequirements && !isPasswordValid(passwordData.newPassword) && (
                    <li className={styles.errorMessage} style={{fontSize: '0.8em'}}>
                        {PASSWORD_REQUIREMENTS.map((requirement, index) => (
                            <li key={index}>{requirement}</li>
                        ))}
                    </li>
                )}
                <button onClick={handleSavePassword}>Save Changes</button>
            </div>
        </div>
    );
}
