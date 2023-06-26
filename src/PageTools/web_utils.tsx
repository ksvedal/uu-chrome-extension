import { ElementObject, ElementType } from "../Sidebar/Interfaces";

export class WebUtils {

    public static toType(elements: NodeListOf<HTMLElement>, type: string): ElementType {
        let newType: ElementType = { name: type, nodes: [] };
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
        let newObject: ElementObject = { title: name, html: element.outerHTML };
        return newObject;
    }
}