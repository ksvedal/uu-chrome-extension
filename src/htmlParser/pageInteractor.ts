import { HighlightAllMessage, HighlightAndRemovePreviousMessage, HighlightMessage, UnhighlightAllAndHighlightSingleMessage } from "../messageObjects/message";
import { ButtonSelector, ElementSelector, Headings, ImageSelector, LinkSelector, MenuItems} from "./elementSelector";

/**
 * This class is responsible for interacting with the page
 */
export class PageInteractor {
    private prevElem: HTMLElement | null = null;
    private highlightSelectedClass: string = "highlight-selected-1";
    private highlightDashedClass: string = "highlight-dashed";
    private commonLabelClass: string = "label";
    private selectedLabelClass: string = "label-selected";
    private dashedLabelClass: string = "label-dashed";
    
    /*
    private elementTypeHighlightMap: Record<string, string> = {
        // Define mappings of element types to their corresponding highlight classes
        'type1': 'highlight-type1',
        'type2': 'highlight-type2',
        'type3': 'highlight-type3',
        'type4': 'highlight-type4',
        // ... Add more mappings as needed
    };
    */

    private elementTypeHighlightMap: { [key: string]: string } = {
        "Buttons": "highlight-selected-1",
        "Images": "highlight-selected-2",
        "Links": "highlight-selected-3",
        "Headings": "highlight-selected-4",
        "MenuItems": "highlight-selected-5", // You can customize this mapping as needed
    };

    private elementTypeLabelMap: { [key: string]: string } = {
        "Buttons": "label-selected-1",
        "Images": "label-selected-2",
        "Links": "label-selected-3",
        "Headings": "label-selected-4",
        "MenuItems": "label-selected-5", 
    }
    
    public highlightAllWithType(message: HighlightAllMessage): void {

        try {
            const elements = document.querySelectorAll(message.type.selector) as NodeListOf<HTMLElement>;
            let currentHighlightClass: string;
            if (!elements.length) {
                throw new Error(`No elements found for selector "${message.type.selector}"`);
            }
            this.updateLabelAndHighlightClasses(message.type.name);
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
            this.updateLabelAndHighlightClasses(message.element.selector);
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
            this.updateLabelAndHighlightClasses(message.previousElement.selector);
            this.removeStyleFromElement(previousElement);

            this.updateLabelAndHighlightClasses(message.newElement.selector);
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


    public unhighlightAllAndHighlightSingle(message: UnhighlightAllAndHighlightSingleMessage): void {
        try {
            const elements = document.querySelectorAll(message.elementType.selector) as NodeListOf<HTMLElement>;
            if (!elements.length) {
                throw new Error(`No elements found for selector "${message.elementType.selector}"`);
            }
            this.updateLabelAndHighlightClasses(message.elementType.selector);
            for (let element of elements) {
                this.removeStyleFromElement(element);
            }

            const element = document.querySelector(message.element.selector) as HTMLElement;
            if (!element) {
                throw new Error(`No element found for selector "${message.element.selector}"`);
            }
            this.updateLabelAndHighlightClasses(message.element.selector);
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
            if (highlightClass === this.highlightDashedClass) {
                element.classList.add(this.highlightDashedClass);
                this.addLabelToELement(element, this.dashedLabelClass);
            } else {
                element.classList.add(this.highlightSelectedClass);
                this.addLabelToELement(element, this.selectedLabelClass);
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

      private updateLabelAndHighlightClasses(selector: string) {
        console.log("selector: " + selector);
        this.highlightSelectedClass = this.elementTypeHighlightMap[selector] ?? "highlight-selected-1";
        this.selectedLabelClass = this.elementTypeLabelMap[selector] ?? "label-selected-1";
        console.log("highlightSelectedClass: " + this.highlightSelectedClass);
        console.log("selectedLabelClass: " + this.selectedLabelClass);
      }
}
