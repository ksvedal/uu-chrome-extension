import React, { useContext, useEffect, useState } from "react";
import { CollapsibleItemElementInterface, CollapsibleItemTypeInterface, ElementObject, ElementResult } from "./interfaces";
import { ToggleButton, CollapsibleArrowButton } from "./buttons";
import { MessageSender } from "../messageObjects/messageSender";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ElementAttributes } from "./elementAttributes";
import { MyContext } from "./resultItemsContext";

const messageSender = new MessageSender();

export const CollapsibleItemType: React.FC<CollapsibleItemTypeInterface> = ({ type }) => {
    const [currentHighlighted, setCurrentHighlighted] = useState<ElementObject | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isAllHighlighted, setIsAllHighlighted] = useState(false);
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
                            object={item}
                            highlightedElement={currentHighlighted}
                            setHighlightedElement={setCurrentHighlighted}
                            isAllHighlighted={isAllHighlighted}
                            setIsAllHighlighted={setIsAllHighlighted}
                            updateJson={updateJson}
                            index={index}
                            //setElementResults={setElementResults} // pass down the setter
                        ><ElementAttributes
                                attributes={item.attributes}
                                title={item.title}
                                htmlString={item.htmlString}
                                selector={item.selector}
                                result={item.result} />
                            <SyntaxHighlighter language="html" style={vs}>
                                {item.htmlString}
                            </SyntaxHighlighter>

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
    updateJson,
    index
}) => {
    const [isHighlighted, setIsHighlighted] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [textareaValue, setTextareaValue] = useState("");

    useEffect(() => {
        setIsHighlighted((object === highlightedElement) || isAllHighlighted);
    }, [highlightedElement, isAllHighlighted]);

    const handleCheckboxClick = (e: React.MouseEvent<HTMLInputElement>, update: string) => {
        e.stopPropagation(); // prevent event propagation
        if (update === "issue") {
            object.result.issue = !object.result.issue;
        } else if (update === "checked") {
            object.result.checked = !object.result.checked;
        }
        updateJson(object, index);
    };

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
        <div className="collapsible-item-child">
            <div className='collapsible-item'>
                <div className={`item-header ${isExpanded ? 'pressed' : ''}`} onClick={() => setIsExpanded(!isExpanded)}>
                    <div className="flex-item">
                        <CollapsibleArrowButton isExpanded={isExpanded} />
                        <div className="buttons-text">
                            {object.title}
                        </div>
                        <label htmlFor={`issueCheckbox-${index}`}>
                            Feil:
                            <input
                                id={`issueCheckbox-${index}`}
                                type="checkbox"
                                className="checkbox-custom"
                                tabIndex={2}
                                checked={object.result.issue}
                                onClick={(e) => handleCheckboxClick(e, "issue")}
                            />
                        </label>
                        <label htmlFor={`viewedCheckbox-${index}`}>
                            Checked:
                            <input
                                id={"viewedCheckbox-${index}"}
                                type="checkbox"
                                className="checkbox-custom"
                                tabIndex={2}
                                checked={object.result.checked}
                                onClick={(e) => handleCheckboxClick(e, "checked")} />
                        </label>

                    </div>
                    <ToggleButton isChecked={isHighlighted || isAllHighlighted} onToggle={toggleCheck} text="Jump to" />
                </div>

                       <div className="content-data">
          {isExpanded && children}
          <div className="comment-box">
            <textarea
              className="textarea"
              name="comment"
              form="usrform"
              value={textareaValue}
              onChange={(e) => setTextareaValue(e.target.value)}
            >
              Enter text here...
            </textarea>
          </div>
          <button onClick={() => console.log(textareaValue)}>Store Text</button>
        </div>
      </div>
    </div>
  );
};