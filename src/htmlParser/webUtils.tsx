import { ElementAttribute, ElementObject, ElementType } from "../sidebar/interfaces";
import pretty from 'pretty';

export class WebUtils {

    public static toType(elements: NodeListOf<HTMLElement>, type: string, selector: string): ElementType {
        let newType: ElementType = { name: type, nodes: [], selector: selector };
        let i: number = 1;
        elements.forEach((element) => {
            //TODO: Find out if there is a better way to display names, if it has an outer text display that? anything else we can use?
            newType.nodes.push(this.toObject(element));
            i++;
        });
        return newType;
    }


    public static toObject(element: HTMLElement): ElementObject {
        let selector = this.generateSelector(element);
        let title = this.getTitle(element);
        let mainObjectAttributes = this.getAttributes(element);
        let newObject: ElementObject = {
            title: title ? title : '',
            htmlString: pretty(element.outerHTML),
            selector: selector,
            attributes: mainObjectAttributes,
        };

        console.log(newObject);
        return newObject;
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
        let attributeList: ElementAttribute[] = [];
        const attributes = element.attributes;
        /* const unwantedAttributes = ['width', 'height', 'viewBox', 'fill', 'xmlns', "media", "sizes", "data-srcset", "itemprop", "itemtype", "srcset", "itemscope", "clip-rule", "fill-rule", "d", "data-ec-variant", "data-ec-position", "data-ga-category", "data-ga-label", "data-ga-action", "data-ga-value", "data-ga-non-interaction", "data-ga-event", "data-ga-event-category", "data-ga-event-action", "data-ga-event-label", "data-ga-event-value", "data-ga-event-non-interaction", "da", "cx", "cy", "r", "stroke", "stroke-width", "stroke-linejoin", "stroke-linecap", "stroke-width", "style", "content", "src"]; */
        const wantedAttributes = ["aria-labelledby", "aria-label", "aria-expand", "aria-controls","class","type","focusable"];

        for (let i = 0; i < attributes.length; i++) {
            if (wantedAttributes.includes(attributes[i].name) && attributes[i].value.length > 0) {
                attributeList.push({ name: attributes[i].name, value: attributes[i].value });
            }
        }
        attributeList.push({ name: "contentText", value: element.textContent || "" })
        return attributeList;
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