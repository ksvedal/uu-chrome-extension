import React, { useEffect, useState } from "react";
import { CollapsibleObjectContainerInterface } from "../../interfaces/collapsibleObjectInterfaces";
import { highlightElement } from "../utils/objectUtils";
import { handleOptionChange, handleTextareaChange, openCommentSection, storeText, updateJson } from "../utils/radioButtonUtils";
import { CollapsibleObject } from "../components/body/collapsibleObject";
import { ElementAttributesTable } from "../components/body/elementAttributesTable";
import { RadioButtons } from "../components/body/radioButtons";

//export const CollapsibleObjectContainer: React.FC<CollapsibleObjectContainerInterface> = ({
export const CollapsibleObjectContainer: React.FC<CollapsibleObjectContainerInterface & { computedProperties: JSON | null }> = ({
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
    computedProperties
}) => {

    const [isHighlighted, setIsHighlighted] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
  

    useEffect(() => {
      setIsHighlighted((thisElement === highlightedElement) || isAllHighlighted);
    }, [highlightedElement, isAllHighlighted]);


    const handleHighlightElement = () => {
        highlightElement (
            highlightedElement,
            thisElement,
            setHighlightedElement,
            isAllHighlighted,
            setIsAllHighlighted,
            elementType)
    }

    return (
        <CollapsibleObject
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            isHighlighted={isHighlighted}
            thisElement={thisElement}
            isAllHighlighted={isAllHighlighted}
            handleHighlightElement={handleHighlightElement} >

            <ElementAttributesTable
                attributes={thisElement.attributes}
                title={thisElement.title}
                element={thisElement.element}
                selector={thisElement.selector}
                result={thisElement.result}
                isCommentVisible={false}
                computedProperties={computedProperties}
            />

            <RadioButtons 
                onOptionChange={(value) => {
                    handleOptionChange(value, index, url, elementType, typeElements, setTypeElements, setJsonData);
                    openCommentSection(index, elementType);}}
                presetOption={elementType.nodes[index].result.samsvar}
                index={index} />

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
                            setJsonData
                        )}
                        onBlur={() => {
                            storeText(index, commentBoxValue[index], elementType);
                            updateJson(elementType.nodes[index], index, url, typeElements, setTypeElements, setJsonData);
                        }} >
                        Enter text here...
                        </textarea>
                    </div>
                )}
            </div>
        </CollapsibleObject>
    )
}