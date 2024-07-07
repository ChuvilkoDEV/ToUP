import React from 'react';
import './Profile.css';
import ImageUtils from '../imageUtils';

const images = ImageUtils.importAllImages(require.context('../../assets/profile', false, /\.(svg)$/));

const ProfileCard = ({ title, buttonText, icon1, icon2 }) => {
  return (
    <div className="profile-card">
      <div className="profile-card-icon-container">
        <img src={images[icon1]} alt={`${title} icon1`} className="profile-card-icon" />
      </div>
      <div className="profile-card-content">
        <h3>{title}</h3>
        <button className="profile-card-button">{buttonText}</button>
      </div>
      <div className="profile-card-icon-container">
        <img src={images[icon2]} alt={`${title} icon2`} className="profile-card-icon" />
      </div>
    </div>
  );
};

export default ProfileCard;
