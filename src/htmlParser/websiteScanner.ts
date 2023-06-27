import { ElementType } from "../sidebar/interfaces";
import { WebUtils } from "./webUtils";

/**
 * Fetches different types of elements from the page
 */
export class WebsiteScanner {
    private buttonsSelector = "button, input[type='submit'], input[type='button'], [role='button']";
    /**
     * Scans for every type we want.
     * To expand, create a new getElement and push it to results
     * @returns 
     */
    public scanPage(): ElementType[] {
        let results: ElementType[] = [];
        results.push(WebUtils.toType(this.getButtons(), "Buttons", this.buttonsSelector));
        return results;
    }

    public getButtons(): NodeListOf<HTMLElement> {
        return document.querySelectorAll(this.buttonsSelector) as NodeListOf<HTMLElement>;
    }
}
