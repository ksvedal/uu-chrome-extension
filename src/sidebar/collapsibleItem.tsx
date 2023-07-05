import React, { useEffect, useState } from "react";
import { CollapsibleItemElementInterface, CollapsibleItemTypeInterface, ElementObject, ElementResult } from "./interfaces";
import { ToggleButton, CollapsibleArrowButton } from "./buttons";
import { MessageSender } from "../messageObjects/messageSender";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';

const messageSender = new MessageSender();

export const CollapsibleItemType: React.FC<CollapsibleItemTypeInterface> = ({ type }) => {
    const [currentHighlighted, setCurrentHighlighted] = useState<ElementObject | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isAllHighlighted, setIsAllHighlighted] = useState(false);
    const [typeElements, setTypeElements] = useState<ElementObject[]>(type.nodes);

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
                        {type.name + 's'}
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
                        >
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

    useEffect(() => {
        setIsHighlighted((object === highlightedElement) || isAllHighlighted);
    }, [highlightedElement, isAllHighlighted]);

    const handleCheckboxClick = (e: React.MouseEvent<HTMLInputElement>, update: string) => {
        e.stopPropagation(); // prevent event propagation
        if (update === "approved") {
            object.result.approved = !object.result.approved;
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
                        <label htmlFor={`approvedCheckbox-${index}`}>
                            Feil:
                            <input
                                id={`approvedCheckbox-${index}`}
                                type="checkbox"
                                className="checkbox-custom"
                                tabIndex={2}
                                checked={object.result.approved}
                                onClick={(e) => handleCheckboxClick(e, "approved")}
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
                </div>
            </div>
        </div>
    );
};