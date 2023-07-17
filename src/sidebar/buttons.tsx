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

export const RadioButton: React.FC<ToggleButtonProps> = ({ isChecked, onToggle, text }) => {
  const additionalClass = text === 'Error' ? 'error' : text === 'Checked' ? 'checked' : '';

  return (
    <label className={`checkbox-button float-right ${isChecked ? 'pressed' : ''} ${additionalClass}`}>
      <input
        type="radio"
        name="option"
        checked={isChecked}
        onChange={onToggle}
      />
      {text}
    </label>
  );
};



export const CollapsibleArrowButton: React.FC<CollapsibleArrowProps> = ({ isExpanded }) => {
  return <span className={`arrow-button ${isExpanded ? 'pressed' : ''}`}>{isExpanded ? ' ▲' : ' ▲'}</span>;
};
