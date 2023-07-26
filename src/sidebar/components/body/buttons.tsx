import React from "react";
import { ToggleButtonProps, RegularButtonProps, CollapsibleArrowProps } from "../../../interfaces/buttonInterfaces";

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

export const CollapsibleArrowButton: React.FC<CollapsibleArrowProps> = ({ isExpanded }) => {
  return <span className={`arrow-button ${isExpanded ? 'pressed' : ''}`}>{isExpanded ? ' ▲' : ' ▲'}</span>;
};