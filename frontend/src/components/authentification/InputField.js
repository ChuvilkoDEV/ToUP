import React from 'react';
import './Registration.css';

const InputField = ({ label, type, placeholder, logo, value, onChange }) => (
    <div>
        <label>{label}</label>
        <div className="input-container">
            <img src={logo} alt="logo" />
            <div className="divider"></div>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    </div>
);

export default InputField;
