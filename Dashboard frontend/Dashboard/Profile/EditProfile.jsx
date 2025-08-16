import React, { useState, useEffect } from 'react';
import { useUser } from './UserContext';
import './ProfileForm.css';

const EditProfile = () => {
  const { user, setUser } = useUser();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    address: '',
    website: '',
    bio: '',
  });
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch user profile from backend on mount (if user.id exists)
  useEffect(() => {
    async function fetchUserProfile() {
      try {
        if (!user?.id) return;
        const res = await fetch(`http://localhost:5001/api/users/${user.id}`);
        if (!res.ok) throw new Error('Failed to fetch profile');
        const data = await res.json();

        setFormData({
          name: data.name || '',
          username: data.username || '',
          email: data.email || '',
          phone: data.phone || '',
          address: data.address || '',
          website: data.website || '',
          bio: data.bio || 'Passionate software engineer dedicated to building scalable, efficient, and user-centric applications.',
        });
        setProfileImage(data.profileImage || null);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    }

    fetchUserProfile();
  }, [user]);

  // Update form fields on change
  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Preview and prepare image for upload
  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      // Save file object to formData for upload
      setFormData(prev => ({ ...prev, profileImageFile: file }));
    }
  };

  // Submit updated profile to backend
const handleSubmit = async e => {
  e.preventDefault();
  setLoading(true);

  try {
    const formPayload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== 'profileImageFile') formPayload.append(key, value || '');
    });
    if (formData.profileImageFile) {
      formPayload.append('profileImage', formData.profileImageFile);
    }

    const adminId = 1;  // your admin user id

    const res = await fetch(`http://localhost:5001/api/users/${adminId}`, {
      method: 'PUT',
      body: formPayload,
    });

    if (!res.ok) throw new Error('Failed to update profile');

    const updatedUser = await res.json();
    setUser(updatedUser);

    alert('Profile updated!');
  } catch (err) {
    alert('Error updating profile: ' + err.message);
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="profile-content">
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="profile-image-section">
          <img
            src={profileImage || 'https://source.unsplash.com/150x150/?food'}
            alt="Profile Preview"
            className="profile-image-preview"
          />
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <div className="profile-fields">
          <label>
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Username
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Phone
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </label>
          <label>
            Address
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </label>
          <label>
            Website
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
            />
          </label>
          <label>
            Bio
            <textarea
              name="bio"
              rows="4"
              value={formData.bio}
              onChange={handleChange}
            ></textarea>
          </label>
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
