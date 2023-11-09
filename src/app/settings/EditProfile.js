import React, { useState } from 'react';
import styles from './profile.css'; // Import the CSS

const EditProfile = () => {
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    bio: 'This is my profile bio.',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSave = () => {
    // Add logic to save the profile data here
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
        <button onClick={handleSave}>Save</button>
      </form>
    </div>
  );
};

export default EditProfile;