import { HighlightAllMessage, HighlightAndRemovePreviousMessage, HighlightMessage, UnhighlightAllAndHighlightSingleMessage } from "../messageObjects/message";
import { ButtonSelector} from "./elementSelector";

/**
 * This class is responsible for interacting with the page
 */


export class PageInteractor {
    private prevElem: HTMLElement | null = null;
    private highlightSelectedClass: string = "highlight-selected";
    private highlightDashedClass: string = "highlight-dashed";
    private commonLabelClass: string = "label";
    private selectedLabelClass: string = "label-selected";
    private dashedLabelClass: string = "label-dashed";
    private defaultDashedHighligtedSelector = new ButtonSelector();
    

    highlightAllTypesDashed(): void {
        try { 
            const elements = document.querySelectorAll(this.defaultDashedHighligtedSelector.selector) as NodeListOf<HTMLElement>;
            if (!elements.length) {
                console.log(`No elements found for selector "${this.defaultDashedHighligtedSelector.selector}"`);
            } else {
                
                for (let element of elements) {
                    this.addStyleToElement(element, this.highlightDashedClass);
                }
            }
        } catch (error) {
            console.error(`Error in highlightAllTypesDashed: ${error}`);
        }
    }
    
    public highlightAllWithType(message: HighlightAllMessage): void {

        try {
            const elements = document.querySelectorAll(message.type.selector) as NodeListOf<HTMLElement>;
            let currentHighlightClass: string;
            if (!elements.length) {
                throw new Error(`No elements found for selector "${message.type.selector}"`);
            }
            if (message.hasDashedHighlighting === true) {
                currentHighlightClass = this.highlightDashedClass;
            } else {
                currentHighlightClass = this.highlightSelectedClass;
            }
            
            if (message.isHighlighted) {
                for (let element of elements) {
                    this.removeStyleFromElement(element, currentHighlightClass);
                }
            } else {
                for (let element of elements) {
                    this.addStyleToElement(element, currentHighlightClass);
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
                this.removeStyleFromElement(element, this.highlightSelectedClass);
            } else {
                this.addStyleToElement(element, this.highlightSelectedClass);
                element.focus();
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                this.prevElem = element;
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
            this.addStyleToElement(newElement, this.highlightSelectedClass);
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

    private addStyleToElement(element: HTMLElement, highlightClass?: String): void {
        highlightClass = highlightClass ?? this.highlightSelectedClass;
        if (element) {
            if (highlightClass === this.highlightSelectedClass) {
                element.classList.add(this.highlightSelectedClass);
                this.addLabelToELement(element, this.selectedLabelClass);
            } else {
                element.classList.add(this.highlightDashedClass);
                this.addLabelToELement(element, this.dashedLabelClass);
            }

        }
    }

    private removeStyleFromElement(element: HTMLElement, highlightClass?: String): void {
        highlightClass = highlightClass ?? this.highlightSelectedClass;
        if (element) {
            if (highlightClass === this.highlightSelectedClass) {
                element.classList.remove(this.highlightSelectedClass);
                this.removeLabelFromElement(element, this.selectedLabelClass);
            } else {
                element.classList.remove(this.highlightDashedClass);
                this.removeLabelFromElement(element, this.dashedLabelClass);
            }
            
        }
    }

    private addLabelToELement(element: HTMLElement, labelClass? : string): void {
        labelClass = labelClass ?? this.selectedLabelClass;
        // Create a new DOM element to manipulate the 'element' string
        const tempElement = document.createElement("div");
        tempElement.innerHTML = element.innerHTML;

        // Create the span element with the label
        const labelSpan = document.createElement("label");
        labelSpan.textContent = this.getTagName(element);
        labelSpan.classList.add(labelClass);
        labelSpan.classList.add(this.commonLabelClass); 

        // Append the span element to the 'tempElement'
        tempElement.appendChild(labelSpan);

        // Update the 'element' attribute in the mockElementObject
        element.innerHTML = tempElement.innerHTML;
    }

    private removeLabelFromElement(element: HTMLElement, labelClass?: string): void {
        labelClass = labelClass ?? this.selectedLabelClass;
        const labelsToRemove = element.getElementsByClassName(labelClass);
      
        // Remove all elements with the specified label class
        while (labelsToRemove.length > 0) {
          labelsToRemove[0].remove();
        }
      }
    
      private getTagName(element: HTMLElement): string {
        if (!element || !element.outerHTML) {
          // Handle the case when the element is undefined or has no outerHTML
          return '';
        }
      
        const openingTagRegex = /^<\w+/;
        const match = element.outerHTML.match(openingTagRegex);
      
        if (match) {
          return match[0] + '>'; // Return the first opening tag without attributes
        }
      
        return '';
      }
}
