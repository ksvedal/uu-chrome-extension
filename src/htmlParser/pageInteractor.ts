import { HighlightAllMessage, HighlightMessage } from "../messageObjects/message";

/**
 * This class is responsible for interacting with the page
 */
export class PageInteractor {
    private prevElem: HTMLElement | null = null;
    private highlightClass: string = "highlight";

    /**
     * Highlights an array of elements
     * @param color 
     * @param elements 
     */
      public highlightElements(message: HighlightAllMessage): void {
        const elements = document.querySelectorAll(message.type.selector) as NodeListOf<HTMLElement>;
        if(message.isChecked){
            for (let element of elements) {
                this.removeStyleFromElement(element);
            }
        }else{
            for (let element of elements) {
                this.addStyleToElement(element);
            }
        }
    } 

    public handleHighlightSingle(message: HighlightMessage): void {
        const element = document.querySelector(message.element.selector) as HTMLElement;
        if (message.isChecked) {
            this.removeStyleFromElement(element);
        } else {
            this.addStyleToElement(element);
            this.focusAndScroll(message.element.selector);
        }
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
                this.removeStyleFromElement(this.prevElem);
            }
            //Adds the border to the new element
            this.addStyleToElement(elem);
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
    private addStyleToElement(element: HTMLElement): void {
        element.classList.add(this.highlightClass);

    }
    /**
     * removes a style from a given element
     * @param element 
     * @param style 
     */
    private removeStyleFromElement(element: HTMLElement): void {
        element.classList.remove(this.highlightClass);
    }
}