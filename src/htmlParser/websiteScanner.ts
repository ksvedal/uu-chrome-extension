import { ElementType } from "../sidebar/interfaces";
import { WebUtils } from "./webUtils";

/**
 * Fetches different types of elements from the page
 */
export class WebsiteScanner {
    private buttonsSelector = "button, input[type='submit'], input[type='button'], [role='button']";

    public getWebsiteURL(callback: (response: string) => void): void {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const activeTab = tabs[0];
            if (activeTab?.url) {
                callback(activeTab.url)
            }
        });
    }

    /**
     * Scans for every type we want.
     * To expand, create a new getElement and push it to results
     * @returns 
     */
    public scanPage(): ElementType[] {
        let results: ElementType[] = [];
        results.push(WebUtils.toType(this.getButtons(), "Button", this.buttonsSelector));
        return results;
    }

    public getButtons(): NodeListOf<HTMLElement> {
        const buttonsSelector = "button, input[type='submit'], input[type='button'], [role='button']";
        return document.querySelectorAll(buttonsSelector) as NodeListOf<HTMLElement>;
    }
}