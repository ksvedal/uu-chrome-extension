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

export interface CollapsibleItemTypeInterface {
  type: ElementType;
  thisElement: ElementObject | null;
  children?: ReactNode;
  isAllHighlighted: boolean;
  setIsAllHighlighted: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentHighlighted: React.Dispatch<React.SetStateAction<ElementObject | null>>;
  parentIndex: number;
  url: string;
  testID: string;
}

export interface CollapsibleItemElementInterface {
  type: ElementType;
  thisElement: ElementObject;
  children?: ReactNode;
  highlightedElement: ElementObject | null;
  isAllHighlighted: boolean;
  setHighlightedElement: React.Dispatch<React.SetStateAction<ElementObject | null>>;
  setIsAllHighlighted: React.Dispatch<React.SetStateAction<boolean>>;
  /* updateJson: (elementObject: ElementObject, index: number, url: string) => void;
  index: number;
  url: string;
  testregelId: string; */
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
  element: string;
  selector: string;
  result: ElementResult;
  attributes: ElementAttribute[];
  isCommentVisible: boolean;
}

export interface ElementResult {
  testregelId: string;
  nettlesar: string | null;
  utvidelse: string | null;
  side: string;
  element: string;
  samsvar: string;
  utfall: string;
  kommentar: string;
}
export interface ElementAttribute {
  name: string;
  value: string;
}

export interface ExtendedElementObject {
  isCommentVisible: boolean;
}