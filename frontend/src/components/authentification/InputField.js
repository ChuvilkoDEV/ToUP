import React from 'react';
import '../../css/Registration.css';

const InputField = ({ label, type, placeholder, logo }) => (
    <div>
        <label>{label}</label>
        <div className="input-container">
            <img src={logo} alt="logo" />
            <div className="divider"></div>
            <input type={type} placeholder={placeholder} />
        </div>
    </div>
);

export default InputField;
