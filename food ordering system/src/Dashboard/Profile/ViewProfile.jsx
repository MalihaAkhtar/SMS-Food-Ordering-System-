import React from 'react';
import { useUser } from './UserContext';
import './ProfilePages.css';

const ViewProfile = () => {
  const { user } = useUser();

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar-img">
            {user.profileImage ? (
              <img src={user.profileImage} alt="Profile" />
            ) : (
              <div className="profile-avatar-text">{user.name.charAt(0)}</div>
            )}
          </div>
          <div className="profile-name-section">
            <h1 className="profile-name">{user.name}</h1>
            <p className="profile-username">@{user.username}</p>
            <p className="profile-joined">Member since {user.joined}</p>
          </div>
        </div>

        <p className="profile-bio">{user.bio}</p>

        <div className="profile-info">
          <div className="info-item"><span className="info-label">Email</span><a href={`mailto:${user.email}`} className="info-value">{user.email}</a></div>
          <div className="info-item"><span className="info-label">Phone</span><span className="info-value">{user.phone}</span></div>
          <div className="info-item"><span className="info-label">Address</span><span className="info-value">{user.address}</span></div>
          <div className="info-item"><span className="info-label">Website</span><a href={user.website} target="_blank" rel="noreferrer" className="info-value">{user.website}</a></div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
