import React, { useState } from "react";
import { CollapsibleItemElementInterface, CollapsibleItemTypeInterface } from "./interfaces";
import { ToggleButton, RegularButton, CollapsibleArrowButton } from "./buttons";
import { MessageSender } from "../MessageObjects/messageSender";
const messageGuy = new MessageSender();

export const CollapsibleItemType: React.FC<CollapsibleItemTypeInterface> = ({ type, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const toggleCheck = () => {
    setIsChecked(!isChecked);
    highlightAll();
  };
  //Vi heller gjøre dette til en egen message highlightAll for en type
  //Bruker bare selector som ble brukt til å lage typen
  const highlightAll = () => {
      messageGuy.highlightAllWithType(type, isChecked);
  };
  return (
    <div className='collapsible-item'>
      <div className='item-header' onClick={() => setIsExpanded(!isExpanded)}>
        <CollapsibleArrowButton isExpanded={isExpanded} /> {type.name}
        <ToggleButton isChecked={isChecked} onToggle={toggleCheck} />
        <p>{type.nodes.length}</p>
      </div>
      {isExpanded && children}
    </div>
  );
};

export const CollapsibleItemElement: React.FC<CollapsibleItemElementInterface> = ({object, children, highlightedElement, setHighlightedElement}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  //const [isChecked, setIsChecked] = useState(false);

 /*   const toggleCheck = () => {
    messageGuy.highlightSingleMessage2(object, isChecked); 
    setIsChecked(!isChecked);
  };  */
  const toggleCheck = () => {
    // Check if this is the currently highlighted element and unhighlight it.
    if (highlightedElement === object) {
      messageGuy.highlightSingleMessage(object, true); 
      setHighlightedElement(null);
    } else {
      // Unhighlight the previously highlighted element, if there is one.
      if (highlightedElement) {
        messageGuy.highlightSingleMessage(highlightedElement, true); 
      }
      // Highlight the newly selected element.
      messageGuy.highlightSingleMessage(object, false); 
      setHighlightedElement(object);
    }
  };
  

  return (
    <div className='collapsible-item'>
      <div className='item-header' onClick={() => setIsExpanded(!isExpanded)}>
        <CollapsibleArrowButton isExpanded={isExpanded} /> {object.title}
        <ToggleButton isChecked={highlightedElement === object} onToggle={toggleCheck} />
        {/*<RegularButton text="Jump to" onClick={() => console.log('Regular button clicked')} />*/}
      </div>
      {isExpanded && children}
    </div>
  );
};
