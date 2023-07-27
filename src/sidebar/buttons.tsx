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

export const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({ onOptionChange , index, presetOption}) => {
  const [selectedOption, setSelectedOption] = useState<string>(presetOption);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const option = event.target.value;
    setSelectedOption(option);
    onOptionChange(option, index);
  };

  

  return (
    <div>
        <div className={"row"}>
            <p> Does the button's text identify its function?</p>
        </div>
      <div>

        <div className={"col-4 extra-padding"}>
            <label className={`radio-button ${selectedOption === 'Ja' ? 'active' : ''}`}>
              <input
                type="radio"
                name="option"
                value="Ja"
                checked={selectedOption === 'Ja'}
                onChange={handleOptionChange}
              />
              <span className="radio-button-text">Yes</span>
            </label>
        </div>
        <div className={"col-4 extra-padding"}>
            <label className={`radio-button ${selectedOption === 'Nei' ? 'active' : ''}`}>
              <input
                type="radio"
                name="option"
                value="Nei"
                checked={selectedOption === 'Nei'}
                onChange={handleOptionChange}
              />
              <span className="radio-button-text">No</span>
            </label>
        </div>
        <div className={"col-4 extra-padding"}>
            <label className={`radio-button ${selectedOption === 'Ikkje forekomst' ? 'active' : ''}`}>
              <input
                type="radio"
                name="Ikkje forekomst"
                value="Ikkje forekomst"
                checked={selectedOption === 'Ikkje forekomst'}
                onChange={handleOptionChange}
              />
              <span className="radio-button-text">Not a button</span>
            </label>
        </div>
    </div>
    </div>
  );
};

export const CollapsibleArrowButton: React.FC<CollapsibleArrowProps> = ({ isExpanded }) => {
  return <span className={`arrow-button ${isExpanded ? 'pressed' : ''}`}>{isExpanded ? ' ▲' : ' ▲'}</span>;
};