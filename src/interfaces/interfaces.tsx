import { ReactNode } from "react";

export interface RadioButtonGroupProps {
  presetOption: string;
  index: number;
  onOptionChange: (option: string, index: number) => void;
}

export interface ToggleButtonProps {
  isChecked: boolean;
  onToggle: () => void;
  text: string;
}

export interface RegularButtonProps {
  text: string;
  onClick: () => void;
}

export interface CollapsibleArrowProps {
  isExpanded: boolean;
}

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
}

export interface CollapsibleTypeContainerInterface {
  elementType: ElementType;
  children?: ReactNode;
  url: string;
}

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



export interface ResultsHeaderInterface {
  url: string;
  isScanned: boolean;
}

/**
 * Interface for an elementType
 * Example: Button, Header, Image, Link, etc.
 */
export interface ElementType {
  name: string;
  nodes: ElementObject[];
  selector: string;
}

/**
 * Interface for an elementObject
 * Type is an elementType
 * Title can be the text on the element
 * TODO: test out different cases of title, What should we do with images? Long links? etc. Most likely an alt_text or aria label can be used here
 *          Or just type + index
 * html is the html code for the element as a string
 */
export interface ElementObject {
  title: string;
  htmlString: string;
  selector: string;
  result: JsonDataFormat;
  attributes: ElementAttribute[];
  isCommentVisible: boolean;
}

export interface JsonDataFormat {
  htmlString: string;
  correctText: string;
  name: string;
  comment: string;
  checked: boolean;
  url: string;
  testID: string;
  chromeVersion: string | null;
  chromeExtensionVersion: string | null;
  outcome: string;
}
export interface ElementAttribute {
  name: string;
  value: string;
}

export interface ExtendedElementObject {
  isCommentVisible: boolean;
}