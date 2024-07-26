import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import './InputField.css';

const InputField = ({ label, type, placeholder, logo, value, onChange, includeField = {}, options = [] }) => {
  const uniqueId = React.useMemo(() => uuidv4(), []);

  const handleKeyDown = (e) => {
    if (!/[0-9]/.test(e.key) && e.key !== 'Backspace') {
      e.preventDefault();
    }
  };

  const renderInput = () => {
    switch (type) {
      case 'select':
        return (
          <select id={uniqueId} name={uniqueId} value={value} onChange={onChange}>
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
              id={uniqueId}
              name={uniqueId}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
            />
            <select
              id={`${uniqueId}-select`}
              name={`${uniqueId}-select`}
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
              id={uniqueId}
              name={uniqueId}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              onKeyDown={handleKeyDown}
            />
            <select
              id={`${uniqueId}-select`}
              name={`${uniqueId}-select`}
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
            id={uniqueId}
            name={uniqueId}
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
            id={uniqueId}
            name={uniqueId}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        );
    }
  };

  return (
    <div className='input-field'>
      <label htmlFor={uniqueId}>{label}</label>
      <div className="input-container">
        {logo && <img src={logo} alt="logo" />}
        <div className="divider"></div>
        {renderInput()}
      </div>
    </div>
  );
};

export default InputField;
