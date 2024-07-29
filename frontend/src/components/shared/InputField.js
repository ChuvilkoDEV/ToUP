import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import './InputField.css';

const InputField = ({ label, type, placeholder, logo, value, handleChange, options = {} }) => {
  const uniqueId = React.useMemo(() => uuidv4(), []);

  const handleNumberChange = (e) => {
    // debugger;
    // let inputedNumber = parseInt(e.target.value, 10);
    if (options.maxValue && e.target.value >= options.maxValue)
      e.target.value = options.maxValue;
    else if (options.minValue && e.target.value <= options.minValue)
      e.target.value = options.minValue;
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

  const numberField = () => {
    return (
      <>
        <input
          type="number"
          id={uniqueId}
          name={uniqueId}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
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
