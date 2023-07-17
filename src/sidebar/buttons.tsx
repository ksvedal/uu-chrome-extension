import React, { useState } from "react";
import { ToggleButtonProps, RegularButtonProps, CollapsibleArrowProps } from "./interfaces";

export const ToggleButton: React.FC<ToggleButtonProps> = ({ isChecked, onToggle, text }) => {
  return (
    <button className={`toggle-button float-right ${isChecked ? 'pressed' : ''}`} onClick={(e) => { e.stopPropagation(); onToggle(); }}>
      {text}
    </button>
  );
};

export const RegularButton: React.FC<RegularButtonProps> = ({ onClick, text }) => {
  return (
    <button className='regular-button float-right' onClick={(e) => { e.stopPropagation(); onClick(); }}>
      {text}
    </button>
  );
};

export const CheckboxButton: React.FC<ToggleButtonProps> = ({ isChecked, onToggle, text }) => {
  const additionalClass = text === 'Error' ? 'error' : text === 'Checked' ? 'checked' : '';

  return (
    <label className={`checkbox-button float-right ${isChecked ? 'pressed' : ''} ${additionalClass}`}>
      <input type="checkbox" checked={isChecked} readOnly /> {/* Checkbox */}
      {text}
    </label>
  );
};

export const RadioButtons: React.FC<ToggleButtonProps> = ({ isChecked, onToggle, text }) => {
  const [selectedOption, setSelectedOption] = useState<string>('option1');

  const additionalClass = text === 'Error' ? 'error' : text === 'Checked' ? 'checked' : '';

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const option = event.target.value;
    setSelectedOption(option);
    onToggle();
  };

  return (
    <div>
      <label className={`checkbox-button float-right ${isChecked ? 'pressed' : ''} ${additionalClass}`}>
        <input
          type="radio"
          name="option"
          value="option1"
          checked={selectedOption === 'option1'}
          onChange={handleOptionChange}
        />
        Ja
      </label>
      <label className={`checkbox-button float-right ${isChecked ? 'pressed' : ''} ${additionalClass}`}>
        <input
          type="radio"
          name="option"
          value="option2"
          checked={selectedOption === 'option2'}
          onChange={handleOptionChange}
        />
        Nei
      </label>
      <label className={`checkbox-button float-right ${isChecked ? 'pressed' : ''} ${additionalClass}`}>
        <input
          type="radio"
          name="option"
          value="option3"
          checked={selectedOption === 'option3'}
          onChange={handleOptionChange}
        />
        Kansje
      </label>
    </div>
  );
};


export const CollapsibleArrowButton: React.FC<CollapsibleArrowProps> = ({ isExpanded }) => {
  return <span className={`arrow-button ${isExpanded ? 'pressed' : ''}`}>{isExpanded ? ' ▲' : ' ▲'}</span>;
};
