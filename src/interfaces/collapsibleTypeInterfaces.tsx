import { ReactNode } from "react"
import { JsonDataFormat } from "./resultInterfaces"
import { ElementObject, ElementType } from "./elementInterfaces"

export interface CollapsibleTypeInterface {
    children?: ReactNode
    isExpanded: boolean
    setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>
    elementType: ElementType
    isAllHighlighted: boolean
    setIsAllHighlighted: React.Dispatch<React.SetStateAction<boolean>>
    currentHighlighted: ElementObject | null
    setCurrentHighlighted: React.Dispatch<React.SetStateAction<ElementObject | null>>
    commentBoxValue: string[]
    setCommentBoxValue: React.Dispatch<React.SetStateAction<string[]>>
    typingTimeoutRef: React.MutableRefObject<number | null>
    url: string
    typeElements: ElementObject[]
    setTypeElements: React.Dispatch<React.SetStateAction<ElementObject[]>>
    setJsonData: React.Dispatch<React.SetStateAction<JsonDataFormat[]>>
    handleHighlightAll: () => void
    computedProperties?: JSON | null;
  }
  
  export interface CollapsibleTypeContainerInterface {
    elementType: ElementType;
    children?: ReactNode;
    url: string;
  }