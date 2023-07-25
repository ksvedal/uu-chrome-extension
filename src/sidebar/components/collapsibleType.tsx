import React from "react";
import { CollapsibleTypeInterface } from "../../interfaces/interfaces";
import { CollapsibleObject } from "./collapsibleObject";
import { ToggleButton, RadioButtonGroup } from "./buttons";
import { ElementAttributes } from "./elementAttributes";
import { ToastContainer } from 'react-toastify';
import { toggleCheck, updateJson, handleTextareaChange, storeText, handleOptionChange, openCommentSection } from "../utils/typeUtils";
import 'react-toastify/dist/ReactToastify.css';
import { CollapsibleObjectContainer } from "../containers/collapsibleObjectContainer";


export const CollapsibleType: React.FC<CollapsibleTypeInterface> = ({
    isExpanded,
    setIsExpanded,
    elementType,
    isAllHighlighted,
    setIsAllHighlighted,
    currentHighlighted,
    setCurrentHighlighted,
    commentBoxValue,
    setCommentBoxValue,
    typingTimeoutRef,
    url,
    typeElements,
    setTypeElements,
    setJsonData
 }) => {

  return (
    <div className='collapsible-item'>
      <div className='collapsible-item-parent'>
        <div className={`item-header row ${isExpanded ? 'pressed' : ''}`} onClick={() => setIsExpanded(!isExpanded)}>

          <div className={"col-4"}>
            <div className="buttons-text">
              <br /> {elementType.name}
            </div>
          </div>

          <div className={"col-4"}>
            <div className="total-buttons">
              <br /> {elementType.nodes.length}
            </div>
          </div>

          <div className={"col-4"}>
            <div className="float-right">
              <ToggleButton isChecked={isAllHighlighted} onToggle={() => toggleCheck(setIsAllHighlighted, isAllHighlighted, setCurrentHighlighted, elementType)} text="Highlight All" />
            </div>
          </div>

        </div>
        {isExpanded && (
          <div className="collapsible-item-children">
            {elementType.nodes.map((elementObject, index) => {
              return (
                <CollapsibleObjectContainer
                  elementType={elementType}
                  index={index}
                  thisElement={elementObject}
                  highlightedElement={currentHighlighted}
                  setHighlightedElement={setCurrentHighlighted}
                  isAllHighlighted={isAllHighlighted}
                  setIsAllHighlighted={setIsAllHighlighted}
                  commentBoxValue={commentBoxValue}
                  setCommentBoxValue={setCommentBoxValue}
                  typingTimeoutRef={typingTimeoutRef}
                  url={url}
                  typeElements={typeElements}
                  setTypeElements={setTypeElements}
                  setJsonData={setJsonData}
                >
                </CollapsibleObjectContainer>
              );
            })}
            <ToastContainer />
          </div>
        )}
      </div>
    </div>
  );
};