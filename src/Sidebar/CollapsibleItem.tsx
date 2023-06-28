import React, { useState } from "react";
import { CollapsibleItemElementInterface, CollapsibleItemTypeInterface, ElementType, ElementObject } from "./Interfaces";
import { ToggleButton, RegularButton, CollapsibleArrowButton } from "./Buttons";

export const CollapsibleItemType: React.FC<CollapsibleItemTypeInterface> = ({ type, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheck = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className='collapsible-item'>
      <div className={`item-header ${isExpanded ? 'pressed' : ''}`} onClick={() => setIsExpanded(!isExpanded)}>
        <CollapsibleArrowButton isExpanded={isExpanded} /> 
        <div className='totalButtons'>{type.name + 's:'} {type.nodes.length}</div>
        <ToggleButton isChecked={isChecked} onToggle={toggleCheck} />
      </div>
        <div className="collapsible-item-children">
          {isExpanded && children}
        </div>
    </div>
  );
};

export const CollapsibleItemElement: React.FC<CollapsibleItemElementInterface> = ({ object, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheck = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className={`collapsible-item-child ${isExpanded ? 'pressed':''}`}>
      <div className='item-header' onClick={() => setIsExpanded(!isExpanded)}>
        <CollapsibleArrowButton isExpanded={isExpanded} /> {object.title}
        <RegularButton text="Jump to" onClick={() => console.log('Regular button clicked')} />
        <ToggleButton isChecked={isChecked} onToggle={toggleCheck} />
      </div>
      <div className={"item-content"}>
        {isExpanded && children}
      </div>
    </div>
  );
};
