import { HighlightAllMessage, HighlightAndRemovePreviousMessage, HighlightMessage, UnhighlightAllAndHighlightSingleMessage } from "../messageObjects/message";
import { ButtonSelector} from "./elementSelector";

/**
 * This class is responsible for interacting with the page
 */
export class PageInteractor {
    private prevElem: HTMLElement | null = null;
    private highlightClass: string = "highlight-selected";
    private highlightDashedClass: string = "highlight-dashed";
    private defaultDashedHighligtedSelector = new ButtonSelector();
    

    highlightAllTypesDashed(): void {
        try { 
            const elements = document.querySelectorAll(this.defaultDashedHighligtedSelector.selector) as NodeListOf<HTMLElement>;
            if (!elements.length) {
                console.log(`No elements found for selector "${this.defaultDashedHighligtedSelector.selector}"`);
            } else {
                
                for (let element of elements) {
                    this.addStyleToElement(element, true);
                }
            }
        } catch (error) {
            console.error(`Error in highlightAllTypesDashed: ${error}`);
        }
    }
    
    public highlightAllWithType(message: HighlightAllMessage): void {

        try {
            const elements = document.querySelectorAll(message.type.selector) as NodeListOf<HTMLElement>;
            if (!elements.length) {
                throw new Error(`No elements found for selector "${message.type.selector}"`);
            }
            if (message.isChecked) {
                for (let element of elements) {
                    this.removeStyleFromElement(element);
                }
            } else {
                for (let element of elements) {
                    this.addStyleToElement(element);
                }
            }
        } catch (error) {
            console.error(`Error in highlightAllWithType: ${error}`);
        }
    }
    
    public handleHighlightSingle(message: HighlightMessage): void {
        try {
            const element = document.querySelector(message.element.selector) as HTMLElement;
            if (!element) {
                throw new Error(`No element found for selector "${message.element.selector}"`);
            }
            if (message.isChecked) {
                this.removeStyleFromElement(element);
            } else {
                this.addStyleToElement(element);
                this.focusAndScroll(message.element.selector);
            }
        } catch (error) {
            console.error(`Error in handleHighlightSingle: ${error}`);
        }
    }

    public highlightAndRemovePrevious(message: HighlightAndRemovePreviousMessage) {
        try {
            const previousElement = document.querySelector(message.previousElement.selector) as HTMLElement;
            if (!previousElement) {
                throw new Error(`No previous element found for selector "${message.previousElement.selector}"`);
            }
            this.removeStyleFromElement(previousElement);

            const newElement = document.querySelector(message.newElement.selector) as HTMLElement;
            if (!newElement) {
                throw new Error(`No new element found for selector "${message.newElement.selector}"`);
            }
            this.addStyleToElement(newElement);
            newElement.focus();
            newElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            this.prevElem = newElement;
        } catch (error) {
            console.error(`Error in highlightAndRemovePrevious: ${error}`);
        }
    }

    private focusAndScroll(target: string) {
        try {
            let elem: HTMLElement = document.querySelector(target) as HTMLElement;
            if (!elem) {
                throw new Error(`No element found for selector "${target}"`);
            }
            if (this.prevElem) {
                this.removeStyleFromElement(this.prevElem);
            }
            this.addStyleToElement(elem);
            elem.focus();
            elem.scrollIntoView({ behavior: 'smooth', block: 'center' });
            this.prevElem = elem;
        } catch (error) {
            console.error(`Error in focusAndScroll: ${error}`);
        }
    }

    public unhighlightAllAndHighlightSingle(message: UnhighlightAllAndHighlightSingleMessage): void {
        try {
            const elements = document.querySelectorAll(message.elementType.selector) as NodeListOf<HTMLElement>;
            if (!elements.length) {
                throw new Error(`No elements found for selector "${message.elementType.selector}"`);
            }
            for (let element of elements) {
                this.removeStyleFromElement(element);
            }
            const element = document.querySelector(message.element.selector) as HTMLElement;
            if (!element) {
                throw new Error(`No element found for selector "${message.element.selector}"`);
            }
            this.addStyleToElement(element);
            element.focus();
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            this.prevElem = element;
        } catch (error) {
            console.error(`Error in unhighlightAllAndHighlightSingle: ${error}`);
        }
    }

    private addStyleToElement(element: HTMLElement, isDashed?: Boolean): void {
        isDashed = isDashed || false;
        if (element) {
            if (!isDashed) {
                element.classList.add(this.highlightClass);
                
            } else {
                element.classList.add(this.highlightDashedClass);
            }
        }
    }

    private removeStyleFromElement(element: HTMLElement): void {
        if (element) {
            element.classList.remove(this.highlightClass);
        }
    }
}
