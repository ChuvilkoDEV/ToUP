import React from 'react';
import './InputField.css';

const InputField = ({ label, type, placeholder, logo, value, onChange, options=[] }) => (
    <div>
        <label>{label}</label>
        <div className="input-container">
            {logo && <img src={logo} alt="logo" />}
            <div className="divider"></div>
            {type === 'select' ? (
                <select value={value} onChange={onChange}>
                    <option value="" disabled>{placeholder}</option>
                    {options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
            )}
        </div>
    </div>
);

export default InputField;
