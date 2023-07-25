import { ElementAttribute, ElementObject, ElementType, ElementResult } from "../sidebar/interfaces";
import pretty from 'pretty';

export class WebUtils {

    public static toType(elements: NodeListOf<HTMLElement>, type: string, selector: string): ElementType {
        let newType: ElementType = { name: type, nodes: [], selector: selector };
        let i: number = 1;
        elements.forEach((element) => {
            newType.nodes.push(this.toObject(element));
            i++;
        });
        return newType;
    }

    public static toObject(element: HTMLElement): ElementObject {
        try {
          const selector = this.generateSelector(element);
          const title = this.getTitle(element);
          const mainObjectAttributes = this.getAttributes(element);
      
          if (!selector || !title) {
            throw new Error('Error: Missing selector or title for the element.');
          }
      
          const newObject: ElementObject = {
            title: title,
            htmlString: pretty(element.outerHTML),
            selector: selector,
            attributes: mainObjectAttributes,
            isCommentVisible: false,
            result: { testID: "", name: title, htmlString: pretty(element.outerHTML), correctText: "", comment: "", checked: false, url: "", chromeVersion: "", chromeExtensionVersion: "", outcome: "" },
          };
      
          console.log(newObject);
          return newObject;
        } catch (error:any) {
          console.error(`Error in toObject: ${error.message}`);
          // Optionally, report the error to a logging service
      
          // Return a default object when an error occurs
          return {
            title: 'Error creating object',
            htmlString: pretty(element.outerHTML),
            selector: 'Error creating object',
            attributes: [],
            isCommentVisible: false,
            result: { testID: "", name: 'Error creating object', htmlString: "", correctText: "Error creating object", comment: "", checked: false, url: "", chromeVersion: "", chromeExtensionVersion: "", outcome: "" },
          };
        }
      }
      

    // A simple function to generate an index-based selector for an element
    private static generateSelector(element: HTMLElement): string {
        let path = [];
        let currentElement = element;

        while (currentElement.parentNode instanceof HTMLElement) {
            let index = Array.prototype.indexOf.call(currentElement.parentNode.children, currentElement) + 1;
            path.unshift(`${currentElement.tagName}:nth-child(${index})`);
            currentElement = currentElement.parentNode;
        }

        return path.join('>');
    }

    private static getAttributes(element: HTMLElement): ElementAttribute[] {
        try {
            let attributeList: ElementAttribute[] = [];
            const attributes = element.attributes;
            const wantedAttributes = ["aria-labelledby", "aria-label", "aria-expand", "aria-controls", "class", "type", "focusable"];
            for (let i = 0; i < attributes.length; i++) {
                if (wantedAttributes.includes(attributes[i].name) && attributes[i].value.length > 0) {
                    attributeList.push({ name: attributes[i].name, value: attributes[i].value });
                }
            }
            attributeList.push({ name: "contentText", value: element.textContent || "" });
            return attributeList;
        } catch (error) {
            console.error(`Error in getAttributes: ${error}`);
            // Optionally, report the error to a logging service
            return []; // Return an empty array as a fallback
        }
    }

    /**
     * Gets a descriptive title of the element
     * if it has no inner_text, use other attributes to describe it
     * @param element 
     */

    private static getTitle(element: HTMLElement): string {
        const MAXLENGTH = 35;
        let title =
            element.getAttribute("aria-labelledby") ||
            element.getAttribute("aria-label") ||
            element.textContent ||
            element.getAttribute("title") || "";
        title = title.replace(/[\n\r]+|[\s]{2,}/g, ' ')
        if (title.length > MAXLENGTH) {
            title = title.slice(0, MAXLENGTH) + "...";
        }
        return title.trim();
    }
}