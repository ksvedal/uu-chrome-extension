import React from "react";
import { ToggleButtonProps, RegularButtonProps, CollapsibleArrowProps } from "./interfaces";

export const ToggleButton: React.FC<ToggleButtonProps> = ({ isChecked, onToggle }) => {
  return (
    <button className={`toggle-button ${isChecked ? 'pressed' : ''}`} onClick={(e) => { e.stopPropagation(); onToggle(); }}>
      {isChecked ? 'Highlight' : 'Highlight'}
    </button>
  );
};

export const RegularButton: React.FC<RegularButtonProps> = ({ onClick , text}) => {
  return (
    <button className='regular-button' onClick={(e) => { e.stopPropagation(); onClick(); }}>
      {text}
    </button>
  );
};

export const CollapsibleArrowButton: React.FC<CollapsibleArrowProps> = ({ isExpanded }) => {
  return <span className= {`arrow-button ${isExpanded ? 'pressed' : ''}`}>{isExpanded ? ' ▲' : ' ▲'}</span>;
};

