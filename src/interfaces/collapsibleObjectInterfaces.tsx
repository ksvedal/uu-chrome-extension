import { ReactNode } from "react";
import { ElementObject, ElementType } from "./elementInterfaces";
import { JsonDataFormat } from "./resultInterfaces";

export interface CollapsibleObjectInterface {
    isExpanded: boolean
    setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>
    isHighlighted:boolean
    elementType: ElementType;
    thisElement: ElementObject;
    children?: ReactNode;
    highlightedElement: ElementObject | null;
    isAllHighlighted: boolean;
    setHighlightedElement: React.Dispatch<React.SetStateAction<ElementObject | null>>;
    setIsAllHighlighted: React.Dispatch<React.SetStateAction<boolean>>;
  }
  
  export interface CollapsibleObjectContainerInterface {
    children?: ReactNode
    elementType: ElementType
    thisElement: ElementObject
    highlightedElement: ElementObject | null
    setHighlightedElement: React.Dispatch<React.SetStateAction<ElementObject | null>>
    isAllHighlighted: boolean
    setIsAllHighlighted: React.Dispatch<React.SetStateAction<boolean>>
    commentBoxValue: string[]
    setCommentBoxValue: React.Dispatch<React.SetStateAction<string[]>>
    typingTimeoutRef:  React.MutableRefObject<number | null>
    url: string
    typeElements: ElementObject[]
    setTypeElements: React.Dispatch<React.SetStateAction<ElementObject[]>>
    setJsonData:React.Dispatch<React.SetStateAction<JsonDataFormat[]>>
    index: number
  }