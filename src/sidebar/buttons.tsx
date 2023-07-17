import React, { useState } from "react";
import { ToggleButtonProps, RegularButtonProps, CollapsibleArrowProps, RadioButtonGroupProps} from "./interfaces";

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
export const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({ onOptionChange }) => {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const option = event.target.value;
    setSelectedOption(option);
    onOptionChange(option);
  };

  return (
    <div className="checkbox-button float-left">
      <p>Does the button's text identify its function?</p>
      <label className={`button-style ${selectedOption === 'Yes' ? 'active' : ''}`}>
        <input
          type="radio"
          name="option"
          value="Yes"
          checked={selectedOption === 'Yes'}
          onChange={handleOptionChange}
        />
        <span className="radio-button-text">Yes</span>
      </label>
      <br />
      <label className={`button-style ${selectedOption === 'No' ? 'active' : ''}`}>
        <input
          type="radio"
          name="option"
          value="No"
          checked={selectedOption === 'No'}
          onChange={handleOptionChange}
        />
        <span className="radio-button-text">No</span>
      </label>
      <br />
      <label className={`button-style ${selectedOption === 'The element is not a button' ? 'active' : ''}`}>
        <input
          type="radio"
          name="The element is not a button"
          value="The element is not a button"
          checked={selectedOption === 'The element is not a button'}
          onChange={handleOptionChange}
        />
        <span className="radio-button-text">The element is not a button</span>
      </label>
    </div>
  );
};





export const CollapsibleArrowButton: React.FC<CollapsibleArrowProps> = ({ isExpanded }) => {
  return <span className={`arrow-button ${isExpanded ? 'pressed' : ''}`}>{isExpanded ? ' ▲' : ' ▲'}</span>;
};
