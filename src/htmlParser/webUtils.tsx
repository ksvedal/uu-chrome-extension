import { ElementAttribute, ElementObject, ElementType } from "../sidebar/interfaces";

export class WebUtils {

    public static toType(elements: NodeListOf<HTMLElement>, type: string, selector: string): ElementType {
        let newType: ElementType = { name: type, nodes: [] , selector : selector};
        let i: number = 1;
        elements.forEach((element) => {
            //TODO: Find out if there is a better way to display names, if it has an outer text display that? anything else we can use?
            newType.nodes.push(this.toObject(element, this.getTitle(element)));
            i++;
        });
        return newType;
    }

    public static toObject(element: HTMLElement, name: string): ElementObject {
        //See if .name here actually gives the name we want
        let selector = this.generateSelector(element);
        let newObject: ElementObject = {title: name,
            htmlString: element.outerHTML,
            selector: selector,
            attributes: this.getAttributes(element)};
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
        for(let i = 0; i < attributes.length; i++){
            console.log("Lagde attributt: " + attributes[i].name + " " + attributes[i].value);
            attributeList.push({name: attributes[i].name, value: attributes[i].value});
        }
        return attributeList;
    }

    /**
     * Gets a descriptive title of the element
     * if it has no inner_text, use other attributes to describe it
     * @param element 
     */
    private static getTitle(element: HTMLElement): string {
        /* let innerText = element.innerText;
        if(innerText != "" && innerText != null){
        return innerText;
        } */
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
    }
}