import React from "react";
import { ToggleButton } from "./buttons";
import { RadioButtonStatus } from "./radioButtonStatus";
import { CollapsibleObjectInterface } from "../../../interfaces/collapsibleObjectInterfaces";


export const CollapsibleObject: React.FC<CollapsibleObjectInterface> = ({
    isExpanded,
    setIsExpanded,
    isHighlighted,
    thisElement,
    children,
    isAllHighlighted,
    handleHighlightElement
  }) => {
  
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
                <RadioButtonStatus text={thisElement.result.samsvar}></RadioButtonStatus>
              </div>
              <div className={"col-4"}>
                <div className={"float-right"}>
                  <ToggleButton isChecked={isHighlighted || isAllHighlighted} onToggle={handleHighlightElement}
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