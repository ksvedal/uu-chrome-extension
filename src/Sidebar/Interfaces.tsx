import { ReactNode } from "react";

export interface ToggleButtonProps {
  isChecked: boolean;
  onToggle: () => void;
}

export interface RegularButtonProps {
  text: string;
  onClick: () => void;
}

export interface CollapsibleArrowProps {
  isExpanded: boolean;
}


/**
 * Interface for the CollapsibleItemType
 * Type will be the type of element that is displayed
 */
export interface CollapsibleItemTypeInterface {
  type: ElementType;
  children?: ReactNode;
}

/**
 * Interface for the CollapsibleItemElement
 * Object will be the element that is displayed
 * for example one button on the page
 */
export interface CollapsibleItemElementInterface {
  object: ElementObject;
  children?: ReactNode;
  highlightedElement: ElementObject | null;
  setHighlightedElement: React.Dispatch<React.SetStateAction<ElementObject | null>>;
}

/**
 * Interface for an elementType
 * Example: Button, Header, Image, Link, etc.
 */
export interface ElementType{
  name : string;
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
export interface ElementObject{
  title: string;
  htmlString: string;
  //html: HTMLElement;
  selector: string;
}
