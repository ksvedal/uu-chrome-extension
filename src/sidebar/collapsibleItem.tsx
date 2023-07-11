import React, { useContext, useEffect, useState } from "react";
import { CollapsibleItemElementInterface, CollapsibleItemTypeInterface, ElementObject, ElementResult } from "./interfaces";
import { ToggleButton, CollapsibleArrowButton } from "./buttons";
import { MessageSender } from "../messageObjects/messageSender";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ElementAttributes } from "./elementAttributes";
import { MyContext } from "./resultItemsContext";

const messageSender = new MessageSender();

export const CollapsibleItemType: React.FC<CollapsibleItemTypeInterface> = ({ type, thisElement, index }) => {
    const [currentHighlighted, setCurrentHighlighted] = useState<ElementObject | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isAllHighlighted, setIsAllHighlighted] = useState(false);
    const [textareaValues, setTextareaValues] = useState<string[]>(type.nodes.map(node => node.result.comment || ""));
    const [typeElements, setTypeElements] = useState<ElementObject[]>(type.nodes);
    const context = useContext(MyContext);
    if (context === null) {
      // handle the case where the context is null
      return null;
    }
    const { elementResults, setElementResults } = context;
    console.log(elementResults)
  
    const toggleCheck = () => {
        setIsAllHighlighted(!isAllHighlighted);
        console.log("Setter allhighlighted til " + isAllHighlighted);
        console.log("allhightlighted: " + isAllHighlighted);
        setCurrentHighlighted(null);
        highlightAll();
    };

    const updateJson = (elementObject: ElementObject, index: number) => {
        let newNodes = [...type.nodes];  // copy the array
        newNodes[index] = elementObject;  // replace the element
        setTypeElements(newNodes);  // update the state
        let elementResults : ElementResult[] = newNodes.map(node => node.result).flat();
        setElementResults(elementResults);
    };

    const storeText = (index: number) => {
        setTypeElements((prevTypeElements) => {
            const newNodes = [...prevTypeElements]; // copy the array
            if (newNodes[index]) {
                newNodes[index].result.comment = textareaValues[index]; // update the comment value
                updateJson(newNodes[index], index); // update the JSON with the updated element
            }
            return newNodes; // return the updated array
        });
    };
      
    const highlightAll = () => {
        messageSender.highlightAllWithType(type, isAllHighlighted);
    };
    return (
        <div className='collapsible-item'>
            <div className='collapsible-item-parent'>
                <div className={`item-header ${isExpanded ? 'pressed' : ''}`} onClick={() => setIsExpanded(!isExpanded)}>
                    <CollapsibleArrowButton isExpanded={isExpanded} />
                    <div className="buttons-text">
                        {type.name}
                    </div>
                    <ToggleButton isChecked={isAllHighlighted} onToggle={toggleCheck} text="Highlight All" />
                    <div className="total-buttons">
                        <p>{type.nodes.length}</p>
                    </div>
                </div>
            </div>

            {isExpanded && (
                <div className="collapsible-item-children">
                    {type.nodes.map((item, index) => (
                        <CollapsibleItemElement
                            type={type}
                            key={index}
                            thisElement={item}
                            highlightedElement={currentHighlighted}
                            setHighlightedElement={setCurrentHighlighted}
                            isAllHighlighted={isAllHighlighted}
                            setIsAllHighlighted={setIsAllHighlighted}
                            updateJson={updateJson}
                            index={index}
                        ><ElementAttributes
                                attributes={item.attributes}
                                title={item.title}
                                htmlString={item.htmlString}
                                selector={item.selector}
                                result={item.result} />
                            <SyntaxHighlighter language="html" style={vs}>
                                {item.htmlString}
                            </SyntaxHighlighter>
                            <div className="comment-box">

                        <textarea
                          className="textarea"
                          name="comment"
                          form="usrform"
                          value={textareaValues[index]}
                            onChange={(e) => setTextareaValues(prevValues => {
                                const newValues = [...prevValues];
                                newValues[index] = e.target.value;
                                return newValues;
                            })}
                        >
                            Enter text here...
                        </textarea>
                            </div>
                                <button className="store-text-button" onClick={() => storeText(index)}>
                                 Store Text
                                </button>
                        </CollapsibleItemElement>
                    ))}
                </div>
            )}
        </div>
    );
};

export const CollapsibleItemElement: React.FC<CollapsibleItemElementInterface> = ({
  type,
  thisElement,
  children,
  highlightedElement,
  isAllHighlighted,
  setHighlightedElement,
  setIsAllHighlighted,
  updateJson,
  index

}) => {

  const [isHighlighted, setIsHighlighted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);


  useEffect(() => {
    setIsHighlighted((thisElement === highlightedElement) || isAllHighlighted);
  }, [highlightedElement, isAllHighlighted]);

  const handleCheckboxClick = (e: React.MouseEvent<HTMLInputElement>, update: string) => {
    e.stopPropagation(); // prevent event propagation
    if (update === "issue") {
        thisElement.result.issue = !thisElement.result.issue;
    } else if (update === "checked") {
        thisElement.result.checked = !thisElement.result.checked;
    }
    updateJson(thisElement, index);
};


  const toggleCheck = () => {
    //If we press the currently highlighted element, unhighlight it
    if (highlightedElement === thisElement) {
      setHighlightedElement(null);
      messageSender.highlightSingleMessage(thisElement, true);
      //} else if (isAllHighlighted && highlightedElement === null) {
    } else if (isAllHighlighted) {
      setIsAllHighlighted(false);
      messageSender.unhighlightAllAndHighlightSingleMessage(thisElement, type);
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
    <div className="collapsible-item-child">
      <div className="collapsible-item">
        <div className={`item-header ${isExpanded ? 'pressed' : ''}`} onClick={() => setIsExpanded(!isExpanded)}>
          <div className="flex-item">
            <CollapsibleArrowButton isExpanded={isExpanded} />
            <div className="buttons-text">
              {thisElement.title}
            </div>
            <label htmlFor={`issueCheckbox-${index}`}>
                &nbsp;&nbsp;&nbsp;Error:
                  <input
                      id={`issueCheckbox-${index}`}
                      type="checkbox"
                      className="checkbox-custom"
                      tabIndex={2}
                      checked={thisElement.result.issue}
                      onClick={(e) => handleCheckboxClick(e, "issue")}
                  />
              </label>
              <label htmlFor={`viewedCheckbox-${index}`}>
                &nbsp;&nbsp;&nbsp;Checked:
                  <input
                      id={`viewedCheckbox-${index}`}
                      type="checkbox"
                      className="checkbox-custom"
                      tabIndex={2}
                      checked={thisElement.result.checked}
                      onClick={(e) => handleCheckboxClick(e, "checked")} />
              </label>
          </div>
          <ToggleButton isChecked={isHighlighted || isAllHighlighted} onToggle={toggleCheck} text="Jump to" />
        </div>
        <div className="content-data">
          {isExpanded && children}
        </div>
      </div>
    </div>
  );
};