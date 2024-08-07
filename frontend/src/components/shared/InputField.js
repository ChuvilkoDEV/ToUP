import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import './InputField.css';
import { HandySvg } from 'handy-svg';


const InputField = ({ label, type, placeholder, logo, error, value, handleChange, options = {} }) => {
  const uniqueId = React.useMemo(() => uuidv4(), []);

  const handleNumberChange = (e) => {
    const value = parseInt(e.target.value);
    if (!Number.isInteger(Number(value)) && value !== '')
      return;
    else if (value === 0 || value === '')
      e.target.value = '';
    else if (options.maxValue && value >= options.maxValue)
      e.target.value = options.maxValue;
    else if (value <= options.minValue)
      e.target.value = options.minValue;
    else
      e.target.value = value;
    handleChange(e);
  };

  const selectField = () => {
    return (
      <select id={uniqueId} name={uniqueId} value={value} onChange={handleChange}>
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
        onChange={options.includeField.handleChange}
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

  const textField = (type) => {
    return (<input
      type={type}
      id={uniqueId}
      name={uniqueId}
      placeholder={placeholder}
      value={value}
      onChange={type === 'number' ? handleNumberChange : handleChange}
    />);
  };

  const selectInputField = () => {
    return (
      <>
        {textField("text")}
        {littleSelectField()}
      </>
    );
  };

  const numberSelectInputField = () => {
    return (
      <>
        {textField('number')}
        {littleSelectField()}
      </>
    );
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
        return (textField('number'))
      default:
        return (textField(type));
    }
  };

  return (
    <div className={`input-field`}>
      <label htmlFor={uniqueId}>{label}</label>
      <div className={`input-container ${error ? 'error' : ''}`}>
        {logo && <HandySvg src={logo} className={`logo-15x15 ${error ? 'error' : ''} mr-5`} />}
        <div className="divider"></div>
        {renderInput()}
      </div>
    </div>
  );
};

export default InputField;
