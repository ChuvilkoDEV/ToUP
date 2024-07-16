import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

import ImageUtils from '../imageUtils';
const images = ImageUtils.importAllImages(require.context('@assets/profile', false, /\.(svg)$/));

const ProfileCard = ({ title, text, icon, link }) => {
  const [hover, setHover] = useState(false);

  const defaultIcon1 = `${icon}1Default.svg`;
  const hoverIcon1 = `${icon}1Hover.svg`;
  const defaultIcon2 = `${icon}2Default.svg`;
  const hoverIcon2 = `${icon}2Hover.svg`;

  const cardContent = (
    <div
      className="profile-card"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="profile-card-content">
        <img
          src={images[hover ? hoverIcon1 : defaultIcon1]}
          alt={`${title} ${hover ? 'hover' : 'default'} icon`}
          className="profile-card-icon1"
        />
        <h3 className='mt-2'>{title}</h3>
        <p>{text}</p>
      </div>
      <div className="profile-card-icon-container">
        <img
          src={images[hover ? hoverIcon2 : defaultIcon2]}
          alt={`${title} ${hover ? 'hover' : 'default'} icon`}
          className="profile-card-icon2"
        />
      </div>
    </div>
  );

  return link ? (
    <Link to={link} className="profile-card-link">
      {cardContent}
    </Link>
  ) : (
    cardContent
  );
};

export default ProfileCard;
