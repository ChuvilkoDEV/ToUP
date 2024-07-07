import React from 'react';
import './Profile.css';

const ProfileCard = ({ title, buttonText, icon }) => {
  return (
    <div className="profile-card">
      <img src={icon} alt={`${title} icon`} className="profile-card-icon" />
      <div className="profile-card-content">
        <h3>{title}</h3>
        <button className="profile-card-button">{buttonText}</button>
      </div>
    </div>
  );
};

export default ProfileCard;
