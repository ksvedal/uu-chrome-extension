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
              <label className={`radio-button ${selectedOption === 'Ja' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="option"
                  value="Ja"
                  checked={selectedOption === 'Ja'}
                  onChange={handleOptionChange}
                />
                <span className="radio-button-text">Ja</span>
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
                <span className="radio-button-text">Nei</span>
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
                <span className="radio-button-text">Elementet er ikkje ein knapp</span>
              </label>
          </div>
      </div>
      </div>
    );
};