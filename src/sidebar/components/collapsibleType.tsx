import React, { useContext, useState, useRef } from "react";
import { CollapsibleTypeInterface, ElementObject, JsonDataFormat } from "../../interfaces/interfaces";
import { CollapsibleObject } from "../collapsibleObject";
import { ToggleButton, RadioButtonGroup } from "./buttons";
import { ElementAttributes } from "./elementAttributes";
import { MyContext } from "./resultItemsContext";
import { ToastContainer } from 'react-toastify';
import { toggleCheck, updateJson, handleTextareaChange, storeText, handleOptionChange, openCommentSection } from "../sidebarUtils/collapsibleFunctions";
import 'react-toastify/dist/ReactToastify.css';


export const CollapsibleItemType: React.FC<CollapsibleTypeInterface> = ({ elementType, url }) => {
  const [currentHighlighted, setCurrentHighlighted] = useState<ElementObject | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAllHighlighted, setIsAllHighlighted] = useState(false);
  const [commentBoxValue, setCommentBoxValue] = useState<string[]>(elementType.nodes.map(node => node.result.comment || ""));
  const [typeElements, setTypeElements] = useState<ElementObject[]>(elementType.nodes);
  const context = useContext(MyContext);
  const typingTimeoutRef = useRef<number | null>(null);

  if (context === null) {
    // handle the case where the context is null
    return null;
  }
  const { jsonData, setJsonData } = context;


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
                <CollapsibleObject
                  elementType={elementType}
                  key={index}
                  thisElement={elementObject}
                  highlightedElement={currentHighlighted}
                  setHighlightedElement={setCurrentHighlighted}
                  isAllHighlighted={isAllHighlighted}
                  setIsAllHighlighted={setIsAllHighlighted}
                >
                  <ElementAttributes
                    attributes={elementObject.attributes}
                    title={elementObject.title}
                    htmlString={elementObject.htmlString}
                    selector={elementObject.selector}
                    result={elementObject.result}
                    isCommentVisible={false} />

                  <RadioButtonGroup onOptionChange={(value) => {
                    handleOptionChange(value, index, url, elementType, typeElements, setTypeElements, setJsonData);
                    openCommentSection(index, elementType);
                  }} presetOption={elementType.nodes[index].result.correctText} index={index} />

                  <div>
                    {elementType.nodes[index].isCommentVisible && (
                      <div className="comment-box">
                        <textarea
                          className="textarea"
                          name="comment"
                          form="usrform"
                          value={commentBoxValue[index]}
                          onChange={(e) => handleTextareaChange(
                              index,
                              e.target.value,
                              setCommentBoxValue,
                              typingTimeoutRef,
                              elementType,
                              elementObject,
                              url,
                              typeElements,
                              setTypeElements,
                              setJsonData)}
                          onBlur={() => {
                            // Execute storeText when the textarea loses focus
                            storeText(index, commentBoxValue[index], elementType);
                            updateJson(elementType.nodes[index], index, url, typeElements, setTypeElements, setJsonData);
                          }}
                        >
                          Enter text here...
                        </textarea>
                      </div>
                    )}

                  </div>
                </CollapsibleObject>
              );
            })}
            <ToastContainer />
          </div>
        )}
      </div>
    </div>
  );
};