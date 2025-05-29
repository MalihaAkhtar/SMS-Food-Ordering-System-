import React, { useState } from 'react';
import { useUser } from './UserContext';
import './ProfileForm.css';

const EditProfile = () => {
  const { user, setUser } = useUser();
  const [formData, setFormData] = useState({ ...user });
  const [profileImage, setProfileImage] = useState(user.profileImage || null);

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    setUser({ ...formData, profileImage });
    alert('Profile updated!');
  };

  return (
    <div className="profile-content">
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="profile-image-section">
          <img
            src={profileImage || '/default-profile.png'}
            alt="Profile Preview"
            className="profile-image-preview"
          />
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <div className="profile-fields">
          <label>Name<input type="text" name="name" value={formData.name} onChange={handleChange} required /></label>
          <label>Username<input type="text" name="username" value={formData.username} onChange={handleChange} required /></label>
          <label>Email<input type="email" name="email" value={formData.email} onChange={handleChange} required /></label>
          <label>Phone<input type="tel" name="phone" value={formData.phone} onChange={handleChange} /></label>
          <label>Address<input type="text" name="address" value={formData.address} onChange={handleChange} /></label>
          <label>Website<input type="url" name="website" value={formData.website} onChange={handleChange} /></label>
          <label>Bio<textarea name="bio" rows="4" value={formData.bio} onChange={handleChange}></textarea></label>
        </div>

        <button type="submit" className="btn-primary">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfile;
