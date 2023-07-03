import { ElementAttribute, ElementObject, ElementType } from "../sidebar/interfaces";

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
        let newObject: ElementObject = {
            title: title ? title : '',
            htmlString: element.outerHTML,
            selector: selector,
            attributes: this.getAttributes(element),
            children: Array.from(element.children).map(child => this.toObject(child as HTMLElement))
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
        const unwantedAttributes = ['width', 'height', 'viewBox', 'fill', 'xmlns'];

        for (let i = 0; i < attributes.length; i++) {
            if (!unwantedAttributes.includes(attributes[i].name)) {
                attributeList.push({ name: attributes[i].name, value: attributes[i].value });
            }
        }
        return attributeList;
    }

    /**
     * Gets a descriptive title of the element
     * if it has no inner_text, use other attributes to describe it
     * @param element 
     */
    /* private static getTitle(element: HTMLElement): string {
        
        let alt = element.getAttribute("alt");
        if (alt != null && alt != "") {
            return alt;
        }
        let title = element.getAttribute("title");
        if(title != null && title != ""){
            return title;
        }
        let aria = element.getAttribute("aria-label");
        if(aria != null && aria != ""){
            return aria;
        }

        return element.innerText;
    } */
    /*  private static getTitle(element: HTMLElement): string {
         let title = element.getAttribute("title") || element.getAttribute("aria-label") || element.getAttribute("alt") || element.innerText || '';
         return title.trim() !== '' ? title : this.getChildTitle(element);
     } */

    private static getTitle(element: HTMLElement): string {
        let title = 
        element.getAttribute("title") ||
        element.getAttribute("aria-label") ||
        element.getAttribute("alt") ||
        element.getAttribute("name") ||
        element.getAttribute("placeholder") ||
        element.innerText ||
        element.getAttribute("src") ||'';

        if (title.trim() === '') {
            if (element instanceof HTMLButtonElement) {
                title = element.value || '';
            } else if (element instanceof HTMLImageElement) {
                title = element.src || '';
            } else if (element instanceof SVGSVGElement) {
                let svgTitleElement = element.querySelector('title');
                if (svgTitleElement) {
                    title = svgTitleElement.textContent || '';
                }
            }
        }

        return title.trim()/*  !== '' ? title : this.getChildTitle(element); */;
    }


   /*  private static getChildTitle(element: HTMLElement): string {
        for (let child of Array.from(element.children)) {
            let title = this.getTitle(child as HTMLElement);
            if (title.trim() !== '') {
                return title;
            }
        }
        return '';
    } */
}