import React, { useEffect, useState } from "react";
import { CollapsibleItemElementInterface, CollapsibleItemTypeInterface, ElementObject } from "./interfaces";
import { ToggleButton, CollapsibleArrowButton } from "./buttons";
import { MessageSender } from "../messageObjects/messageSender";
import { ElementAttributes } from "./elementAttributes";

const messageSender = new MessageSender();

export const CollapsibleItemType: React.FC<CollapsibleItemTypeInterface> = ({ type }) => {
  const [currentHighlighted, setCurrentHighlighted] = useState<ElementObject | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAllHighlighted, setIsAllHighlighted] = useState(false);

  const toggleCheck = () => {
    setIsAllHighlighted(!isAllHighlighted);
    console.log("Setter allhighlighted til " + isAllHighlighted);
    console.log("allhightlighted: " + isAllHighlighted);
    setCurrentHighlighted(null);
    highlightAll();
  };

  const highlightAll = () => {
    messageSender.highlightAllWithType(type, isAllHighlighted);
  };
  return (
    <div className='collapsible-item'>
      <div className='item-header' onClick={() => setIsExpanded(!isExpanded)}>
        <CollapsibleArrowButton isExpanded={isExpanded} /> {type.name}
        <ToggleButton isChecked={isAllHighlighted} onToggle={toggleCheck} text="Highlight All" />

        <p>{type.nodes.length}</p>
      </div>

      {isExpanded && (
        <div className="item-content">
          {type.nodes.map((item, index) => (
            <CollapsibleItemElement
              type={type}
              key={index}
              object={item}
              highlightedElement={currentHighlighted}
              setHighlightedElement={setCurrentHighlighted}
              isAllHighlighted={isAllHighlighted}
              setIsAllHighlighted={setIsAllHighlighted}
            > <ElementAttributes attributes={item.attributes} title={item.title} htmlString={item.htmlString} selector={item.selector} />
            </CollapsibleItemElement>
          ))}
        </div>
      )}
    </div>
  );
};

export const CollapsibleItemElement: React.FC<CollapsibleItemElementInterface> = ({
  type,
  object,
  children,
  highlightedElement,
  isAllHighlighted,
  setHighlightedElement,
  setIsAllHighlighted,
}) => {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setIsHighlighted((object === highlightedElement) || isAllHighlighted);
  }, [highlightedElement, isAllHighlighted]);

  const toggleCheck = () => {
    //If we press the currently highlighted element, unhighlight it
    if (highlightedElement === object) {
      setHighlightedElement(null);
      messageSender.highlightSingleMessage(object, true);
      //} else if (isAllHighlighted && highlightedElement === null) {
    } else if (isAllHighlighted) {
      setIsAllHighlighted(false);
      messageSender.unhighlightAllAndHighlightSingleMessage(object, type);
      //unhighlightAllAndHighligthSingle( );
      setHighlightedElement(object);//Kan kanskje fjerne denne

    } else
      //Another element is highlighted, unhighlight it and highlight the new one
      if (highlightedElement) {
        messageSender.highlightAndRemovePreviousMessage(object, highlightedElement);
        setHighlightedElement(object);//Kan kanskje fjerne denne
      } else {
        console.log("else");
        //No element is highlighted, highlight the new one
        setHighlightedElement(object);
        messageSender.highlightSingleMessage(object, false);
      }

  };

  return (
    <div className='collapsible-item'>
      <div className='item-header' onClick={() => setIsExpanded(!isExpanded)}>
        <CollapsibleArrowButton isExpanded={isExpanded} /> {object.title}
        <ToggleButton isChecked={isHighlighted || isAllHighlighted} onToggle={toggleCheck} text="Jump to" />
      </div>
      {isExpanded && children}
    </div>
  );
};