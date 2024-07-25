import React from 'react';
import './InputField.css';

const InputField = ({ label, type, placeholder, logo, value, onChange, includeField = {}, options = [] }) => {
  const handleKeyDown = (e) => {
    if (!/[0-9]/.test(e.key) && e.key !== 'Backspace') {
      e.preventDefault();
    }
  };

  const renderInput = () => {
    switch (type) {
      case 'select':
        return (
          <select value={value} onChange={onChange}>
            <option value="" disabled>{placeholder}</option>
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case 'select-input':
        return (
          <>
            <input
              type="text"
              placeholder={placeholder}
              value={value}
              onChange={onChange}
            />
            <select
              value={includeField.value}
              onChange={includeField.onChange}
              className='little-select-field'
            >
              <option value="" disabled>{placeholder}</option>
              {options.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </>
        );
      case 'number-select-input':
        return (
          <>
            <input
              type="text"
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              onKeyDown={handleKeyDown}
            />
            <select
              value={includeField.value}
              onChange={includeField.onChange}
              className='little-select-field'
            >
              <option value="" disabled>{placeholder}</option>
              {options.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </>
        );
      case 'number':
        return (
          <input
            type='text'
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyDown={handleKeyDown}
          />
        )
      default:
        return (
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        );
    }
  };

  return (
    <div className='input-field'>
      <label>{label}</label>
      <div className="input-container">
        {logo && <img src={logo} alt="logo" />}
        <div className="divider"></div>
        {renderInput()}
      </div>
    </div>
  );
};

export default InputField;
