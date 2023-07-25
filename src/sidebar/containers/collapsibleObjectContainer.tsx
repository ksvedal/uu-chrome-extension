import React, { useEffect, useState } from "react";
import { CollapsibleObjectContainerInterface } from "../../interfaces/interfaces";
import { CollapsibleObject } from "../components/collapsibleObject";
import { RadioButtonGroup } from "../components/buttons";
import { ElementAttributes } from "../components/elementAttributes";
import { handleOptionChange, openCommentSection, handleTextareaChange, storeText, updateJson } from "../utils/typeUtils";

export const CollapsibleObjectContainer: React.FC<CollapsibleObjectContainerInterface> = ({
    elementType,
    thisElement,
    highlightedElement,
    setHighlightedElement,
    isAllHighlighted,
    setIsAllHighlighted,
    commentBoxValue,
    setCommentBoxValue,
    typingTimeoutRef,
    url,
    typeElements,
    setTypeElements,
    setJsonData,
    index,
}) => {

    const [isHighlighted, setIsHighlighted] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
  
    useEffect(() => {
      setIsHighlighted((thisElement === highlightedElement) || isAllHighlighted);
    }, [highlightedElement, isAllHighlighted]);

    return (
        <CollapsibleObject
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            isHighlighted={isHighlighted}
            elementType={elementType}
            thisElement={thisElement}
            highlightedElement={highlightedElement}
            isAllHighlighted={isAllHighlighted}
            setHighlightedElement={setHighlightedElement}
            setIsAllHighlighted={setIsAllHighlighted}
        >
            <ElementAttributes
                attributes={thisElement.attributes}
                title={thisElement.title}
                htmlString={thisElement.htmlString}
                selector={thisElement.selector}
                result={thisElement.result}
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
                        thisElement,
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
    )
        
    

}