import React from 'react';
import { Outlet } from 'react-router-dom';
import ProfileSidebar from './ProfileSidebar'; // Use profile-specific sidebar


const Profile = () => {
  return (
    <div className="flex">
      <ProfileSidebar />
      <div className="flex-1 ml-[360px] bg-gray-900 text-white min-h-screen">
        
        <main className="p-6 mt-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Profile;
