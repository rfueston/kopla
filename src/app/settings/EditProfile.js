import React, { useState, useEffect } from 'react';
import styles from './profile.css'; // Import the CSS
import SettingsController from './settingsController';

const EditProfile = () => {
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const [userDoc, setUserDoc] = useState(null);

  useEffect(() => {
    SettingsController.getUserDocument()
      .then((userDoc) => {
        setUserDoc(userDoc);
        setProfileData({
          firstName: userDoc.firstName || '',
          lastName: userDoc.lastName || '',
          email: userDoc.email || '',
        });
      })
      .catch((error) => {
        console.error('Error fetching user document:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (dataHasChanged()) {
      await SettingsController.updateUserDocument(profileData)
        .then(async () => {
          if (profileData.email !== userDoc.email) {
            await SettingsController.updateEmail(profileData.email);
            alert("Please check your email inbox for a verification email. Verify the new email before logging in with it.");
          }
        })
        .then(() => {
          alert("Profile Updated Successfully!");
        })
        .catch((error) => {
          console.error('Error updating profile:', error);
        });
    }
  };

  const dataHasChanged = () => {
    return (
      profileData.firstName !== userDoc.firstName ||
      profileData.lastName !== userDoc.lastName ||
      profileData.email !== userDoc.email
    );
  };

  return (
    <div className="edit-profile-page">
      <div className="profile-icon">
        <img src="/profile-picture.jpg" alt="Profile Picture" />
      </div>
      <h1>Edit Profile</h1>
      <form>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={profileData.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={profileData.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleInputChange}
          />
        </div>
        <button onClick={handleSave}>Save</button>
      </form>
    </div>
  );
};

export default EditProfile;