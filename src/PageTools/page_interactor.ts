/**
 * This class is responsible for interacting with the page
 */
export class PageInteractor {
    private prevElem: HTMLElement | null = null;
    private borderStyle: string = "border: 5px solid #FF0000 !important;";

    /**
     * Highlights an array of elements
     * @param color 
     * @param elements 
     */
    public highlightElements(elements: NodeListOf<HTMLElement>): void {
        for (let element of elements) {
            this.addStyleToElement(element, this.borderStyle);
        }
        console.log("highlighted " + elements.length + " elements");
    }

    /**
     * Focuses and scrolls to a given element, also gives it a border
     * @param target 
     */
    public focusAndScroll(target: string) {
        let elem: HTMLElement = document.querySelector(target) as HTMLElement;
        if (elem) {
            if (this.prevElem) {
                //Removes the border from the previous element
                this.removeStyleFromElement(this.prevElem, this.borderStyle);
            }
            //Adds the border to the new element
            this.addStyleToElement(elem, this.borderStyle);
            elem.focus();
            elem.scrollIntoView({ behavior: 'smooth', block: 'center' });
            this.prevElem = elem;
        }
    }

    /**
     * Adds a style to a given element
     * @param element 
     * @param style 
     */
    private addStyleToElement(element: HTMLElement, style: string): void {
        element.style.cssText += style;
    }
    /**
     * removes a style from a given element
     * @param element 
     * @param style 
     */
    private removeStyleFromElement(element: HTMLElement, style: string): void {
        element.style.cssText = element.style.cssText.replace(style, "");
    }
}