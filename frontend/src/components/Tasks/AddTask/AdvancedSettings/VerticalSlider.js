import React, { useState } from 'react';
import './VerticalSlider.css'; // Подключаем стили для вертикального ползунка

const VerticalSlider = ({ min = 0, max = 100, step = 0.1, onChange }) => {
  const [value, setValue] = useState(min);

  const handleChange = (event) => {
    const newValue = parseFloat(event.target.value);
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="vertical-slider-container">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="vertical-slider"
      />
      <div className="value-display">{value.toFixed(1)}</div>
    </div>
  );
};

export default VerticalSlider;
