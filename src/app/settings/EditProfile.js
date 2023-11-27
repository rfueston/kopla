import React, { useState, useEffect } from 'react';
import styles from './profile.css'; // Import the CSS
import SettingsController from "./settingsController";

const EditProfile = () => {
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    bio: 'test',
    password: '', // Adding a field for password
  });

  const [userDoc, setUserDoc] = useState(null); // Added state for userDoc

  useEffect(() => {
    // Call getUserDocument when the component mounts
    SettingsController.getUserDocument()
      .then((userDoc) => {
        setUserDoc(userDoc);
        console.log("This is the return: ", userDoc);
        // Populate the state with user data
        setProfileData({
          firstName: userDoc.firstName || '',
          lastName: userDoc.lastName || '',
          email: userDoc.email || '',
          //bio: userDoc.bio || '',
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
    // Check if data has been changed
    if (dataHasChanged()) {
      console.log("inside data has changed check");
      // Call functions from SettingsController
      await SettingsController.updateUserDocument(profileData)
        .then(() => {
          if (profileData.password) {
            return SettingsController.updatePassword(profileData.password);
          }
        })
        .then(() => {
          if (profileData.email !== userDoc.email) {
            return SettingsController.updateEmail(profileData.email);
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
    // Check if any data has changed
    return (
      profileData.firstName !== userDoc.firstName ||
      profileData.lastName !== userDoc.lastName ||
      profileData.email !== userDoc.email ||
      profileData.bio !== userDoc.bio ||
      profileData.password !== ''
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
        <div className="form-group">
          <label>Bio</label>
          <textarea
            name="bio"
            value={profileData.bio}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Change Password</label>
          <input
            name="password"
            value={profileData.password}
            onChange={handleInputChange}
            type="password"
          />
        </div>
        <button onClick={handleSave}>Save</button>
      </form>
    </div>
  );
};

export default EditProfile;