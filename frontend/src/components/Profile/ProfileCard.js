import React, { useState } from 'react';
import './Profile.css';
import ImageUtils from '../imageUtils';

const images = ImageUtils.importAllImages(require.context('../../assets/profile', false, /\.(svg)$/));

const ProfileCard = ({ title, buttonText, icon1, icon2 }) => {
  const [hover, setHover] = useState(false);
  const defaultIcon = `${icon2}Default.svg`;
  const hoverIcon = `${icon2}Hover.svg`;

  return (
    <div
      className="profile-card"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="profile-card-icon-container">
        <img src={images[icon1]} alt={`${title} icon1`} className="profile-card-icon1" />
      </div>
      <div className="profile-card-content">
        <h3>{title}</h3>
        <a href="#" className={`profile-card-link ${hover ? 'hover' : ''}`}>{buttonText}</a>
      </div>
      <div className="profile-card-icon-container">
        <img
          src={images[hover ? hoverIcon : defaultIcon]}
          alt={`${title} ${hover ? 'hover' : 'default'} icon`}
          className="profile-card-icon2"
        />
      </div>
    </div>
  );
};

export default ProfileCard;
