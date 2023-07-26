import React, { useState } from "react";
import { RadioButtonsProps } from "../../../interfaces/buttonInterfaces";

export const RadioButtons: React.FC<RadioButtonsProps> = ({ onOptionChange , index, presetOption}) => {
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
              <label className={`radio-button ${selectedOption === 'Yes' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="option"
                  value="Yes"
                  checked={selectedOption === 'Yes'}
                  onChange={handleOptionChange}
                />
                <span className="radio-button-text">Yes</span>
              </label>
          </div>
          <div className={"col-4 extra-padding"}>
              <label className={`radio-button ${selectedOption === 'No' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="option"
                  value="No"
                  checked={selectedOption === 'No'}
                  onChange={handleOptionChange}
                />
                <span className="radio-button-text">No</span>
              </label>
          </div>
          <div className={"col-4 extra-padding"}>
              <label className={`radio-button ${selectedOption === 'The element is not a button' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="The element is not a button"
                  value="The element is not a button"
                  checked={selectedOption === 'The element is not a button'}
                  onChange={handleOptionChange}
                />
                <span className="radio-button-text">Not a button</span>
              </label>
          </div>
      </div>
      </div>
    );
};