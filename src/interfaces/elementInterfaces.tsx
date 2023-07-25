import { JsonDataFormat } from "./resultInterfaces";

/**
 * Interface for an elementType
 * Example: Button, Header, Image, Link, etc.
 */
export interface ElementType {
    name: string;
    nodes: ElementObject[];
    selector: string;
}
  
export interface ElementObject {
  title: string;
  htmlString: string;
  selector: string;
  result: JsonDataFormat;
  attributes: ElementAttribute[];
  isCommentVisible: boolean;
}

export interface ElementAttribute {
  name: string;
  value: string;
}

export interface ExtendedElementObject {
  isCommentVisible: boolean;
}