import { useState, useContext, useRef } from "react";
import { CollapsibleTypeContainerInterface, ElementObject } from "../../interfaces/interfaces";
import { MyContext } from "../components/resultItemsContext";
import { CollapsibleType } from "../components/collapsibleType";
import React from "react";


export const CollapsibleTypeContainer: React.FC<CollapsibleTypeContainerInterface> = ({elementType, url}) => {

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
        <CollapsibleType 
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            elementType={elementType}
            isAllHighlighted={isAllHighlighted}
            setIsAllHighlighted={setIsAllHighlighted}
            currentHighlighted={currentHighlighted}
            setCurrentHighlighted={setCurrentHighlighted}
            commentBoxValue={commentBoxValue}
            setCommentBoxValue={setCommentBoxValue}
            typingTimeoutRef={typingTimeoutRef}
            url={url}
            typeElements={typeElements}
            setTypeElements={setTypeElements}
            setJsonData={setJsonData}
        >
        </CollapsibleType>
    )

}
