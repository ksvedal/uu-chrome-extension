import { ElementObject, ElementType } from "../../sidebar/interfaces";

export function createElementObjectElementType(elementObject: ElementObject | undefined): ElementType[] {
    if (!elementObject || !elementObject.title || !elementObject.selector) {
        // Return an empty array when elementObject is not correctly defined.
        return [];
      }
    
      return [{
        name: elementObject.title,
        nodes: [elementObject],
        selector: elementObject.selector,
      }];
}