import { ReactNode } from "react";

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

export interface CollapsibleItemTypeInterface {
  type: ElementType;
  children?: ReactNode;
  isAllHighlighted: boolean;
  setIsAllHighlighted: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentHighlighted: React.Dispatch<React.SetStateAction<ElementObject | null>>;
}

export interface CollapsibleItemElementInterface {
  type: ElementType;
  object: ElementObject;
  children?: ReactNode;
  highlightedElement: ElementObject | null;
  isAllHighlighted: boolean;
  setHighlightedElement: React.Dispatch<React.SetStateAction<ElementObject | null>>;
  setIsAllHighlighted: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ResultsHeaderInterface {
  url: string;
  isScanned: boolean;
  openInNewTab: () => void;
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
  //html: HTMLElement;
  selector: string;
  attributes: ElementAttribute[];
}

export interface ElementAttribute {
  name: string;
  value: string;
}