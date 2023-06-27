import { ElementObject, ElementType } from "../sidebar/interfaces";

export class WebUtils {

    public static toType(elements: NodeListOf<HTMLElement>, type: string, selector: string): ElementType {
        let newType: ElementType = { name: type, nodes: [] , selector : selector};
        let i: number = 1;
        elements.forEach((element) => {
            //TODO: Find out if there is a better way to display names, if it has an outer text display that? anything else we can use?
            newType.nodes.push(this.toObject(element, type + " " + i));
            i++;
        });
        return newType;
    }

    public static toObject(element: HTMLElement, name: string): ElementObject {
        //See if .name here actually gives the name we want
        let selector = this.generateSelector(element);
        let newObject: ElementObject = { title: name, htmlString: element.outerHTML, selector: selector};
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
}