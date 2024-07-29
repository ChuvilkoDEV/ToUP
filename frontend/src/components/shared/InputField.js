import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import './InputField.css';

const InputField = ({ label, type, placeholder, logo, value, onChange, options = {} }) => {
  const uniqueId = React.useMemo(() => uuidv4(), []);

  const handleKeyDown = (e) => {
    if (!/[0-9]/.test(e.key) && e.key !== 'Backspace') {
      e.preventDefault();
    }
  };

  const selectField = () => {
    return (
      <select id={uniqueId} name={uniqueId} value={value} onChange={onChange}>
        <option value="" disabled>{placeholder}</option>
        {options.options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  };

  const littleSelectField = () => {
    return (
      <select
        id={`${uniqueId}-select`}
        name={`${uniqueId}-select`}
        value={options.includeField.value}
        onChange={options.includeField.onChange}
        className='little-select-field'
      >
        <option value="" disabled>{placeholder}</option>
        {options.options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  };

  const selectInputField = () => {
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
        {littleSelectField()}
      </>
    );
  };

  const numberField = () => {
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
      </>
    );
  };

  const numberSelectInputField = () => {
    return (
      <>
        {numberField()}
        {littleSelectField()}
      </>
    );
  };

  const textField = () => {
    return (<input
      type={type}
      id={uniqueId}
      name={uniqueId}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />);
  };

  const renderInput = () => {
    switch (type) {
      case 'select':
        return (selectField());
      case 'select-input':
        return (selectInputField());
      case 'number-select-input':
        return (numberSelectInputField());
      case 'number':
        return (numberField())
      default:
        return (textField());
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
