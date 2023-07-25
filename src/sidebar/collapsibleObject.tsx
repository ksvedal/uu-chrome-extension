import React, { useEffect, useState } from "react";
import { CollapsibleObjectInterface } from "../interfaces/interfaces";
import { MessageSender } from "../messageObjects/messageSender";
import IsCheckedStatus from "./isCheckedStatus";
import { ToggleButton } from "./buttons";

const messageSender = new MessageSender();

export const CollapsibleItemElement: React.FC<CollapsibleObjectInterface> = ({
    elementType,
    thisElement,
    children,
    highlightedElement,
    isAllHighlighted,
    setHighlightedElement,
    setIsAllHighlighted,
  }) => {
  
    const [isHighlighted, setIsHighlighted] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
  
  
    useEffect(() => {
      setIsHighlighted((thisElement === highlightedElement) || isAllHighlighted);
    }, [highlightedElement, isAllHighlighted]);
  
  
    const toggleCheck = () => {
      //If we press the currently highlighted element, unhighlight it
      if (highlightedElement === thisElement) {
        setHighlightedElement(null);
        messageSender.highlightSingleMessage(thisElement, true);
        //} else if (isAllHighlighted && highlightedElement === null) {
      } else if (isAllHighlighted) {
        setIsAllHighlighted(false);
        messageSender.unhighlightAllAndHighlightSingleMessage(thisElement, elementType);
        //unhighlightAllAndHighligthSingle( );
        setHighlightedElement(thisElement);
      } else if (highlightedElement) {
        //Another element is highlighted, unhighlight it and highlight the new one
        messageSender.highlightAndRemovePreviousMessage(thisElement, highlightedElement);
        setHighlightedElement(thisElement);//Kan kanskje fjerne denne
      } else {
        //No element is highlighted, highlight the new one
        setHighlightedElement(thisElement);
        messageSender.highlightSingleMessage(thisElement, false);
      }
    };
  
    return (
      <div data-testid="collapsible-type" className=" collapsible-item-child">
        <div className="collapsible-item">
          <div className={`item-header ${isExpanded ? 'pressed' : ''}`} onClick={() => setIsExpanded(!isExpanded)}>
            <div className="row">
              <div className="col-4">
                <br /> {thisElement.title}
              </div>
              <div className="col-4">
                <br />
                <IsCheckedStatus text={thisElement.result.correctText}></IsCheckedStatus>
              </div>
              <div className={"col-4"}>
                <div className={"float-right"}>
                  <ToggleButton isChecked={isHighlighted || isAllHighlighted} onToggle={toggleCheck} text="Jump to" />
                </div>
              </div>
            </div>
  
          </div>
          <div className={"row"}>
            <div className={"col-12"}>
              <div className="content-data">
                {isExpanded && children}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  
  };