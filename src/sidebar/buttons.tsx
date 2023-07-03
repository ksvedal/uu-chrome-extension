import React from "react";
import { ToggleButtonProps, RegularButtonProps, CollapsibleArrowProps } from "./interfaces";

export const ToggleButton: React.FC<ToggleButtonProps> = ({ isChecked, onToggle, text }) => {
  return (
    <button className={`toggle-button ${isChecked ? 'pressed' : ''}`} onClick={(e) => { e.stopPropagation(); onToggle(); }}>
      {text}
    </button>
  );
};

export const RegularButton: React.FC<RegularButtonProps> = ({ onClick, text }) => {
  return (
    <button className='regular-button' onClick={(e) => { e.stopPropagation(); onClick(); }}>
      {text}
    </button>
  );
};

export const CollapsibleArrowButton: React.FC<CollapsibleArrowProps> = ({ isExpanded }) => {
  return <span>{isExpanded ? '↓' : '→'}</span>;
};

