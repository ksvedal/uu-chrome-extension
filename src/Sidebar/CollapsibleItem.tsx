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
      <div className='item-header' onClick={() => setIsExpanded(!isExpanded)}>
        <CollapsibleArrowButton isExpanded={isExpanded} /> {type.name}
        <ToggleButton isChecked={isChecked} onToggle={toggleCheck} />
      </div>
      {isExpanded && children}
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
    <div className='collapsible-item'>
      <div className='item-header' onClick={() => setIsExpanded(!isExpanded)}>
        <CollapsibleArrowButton isExpanded={isExpanded} /> {object.title}
        <ToggleButton isChecked={isChecked} onToggle={toggleCheck} />
        <RegularButton onClick={() => console.log('Regular button clicked')} />
      </div>
      <div className={"item-content"}>
        {isExpanded && children}
      </div>
    </div>
  );
};
