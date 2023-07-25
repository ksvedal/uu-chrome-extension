import React, { useEffect, useState } from "react";
import { CollapsibleObjectInterface } from "../../interfaces/interfaces";
import { toggleCheck } from "../sidebarUtils/collapsibleObjectFunctions";
import IsCheckedStatus from "./isCheckedStatus";
import { ToggleButton } from "./buttons";


export const CollapsibleObject: React.FC<CollapsibleObjectInterface> = ({
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
                  <ToggleButton isChecked={isHighlighted || isAllHighlighted} onToggle={() => toggleCheck(
                        highlightedElement,
                        thisElement,
                        setHighlightedElement,
                        isAllHighlighted,
                        setIsAllHighlighted,
                        elementType)}
                        text="Jump to" />
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