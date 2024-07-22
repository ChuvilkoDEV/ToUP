import React from 'react';
import './InputField.css';



const InputField = ({ label, type, placeholder, logo, value, onChange, options = [] }) => {

    const SelectTypeField = () => (
        <select value={value} onChange={onChange}>
            <option value="" disabled>{placeholder}</option>
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    )

    const TextTypeField = () => (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    )

    const SelectInputTypeField = () => (
        <>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            <select value={value} onChange={onChange} className='little-select-field' >
                <option value="" disabled>{placeholder}</option>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </>
    )

    const types = {
        'text': <TextTypeField />,
        'email': <TextTypeField />,
        'password': <TextTypeField />,
        'select': <SelectTypeField />,
        'select-input': <SelectInputTypeField />,
    };

    return (
        <div className='input-field'>
            <label>{label}</label>
            <div className="input-container">
                {logo && <img src={logo} alt="logo" />}
                <div className="divider"></div>
                {types[type]}
            </div>
        </div>
    )
};

export default InputField;
