import { ElementType } from "../sidebar/interfaces";
import { ElementSelector, ButtonSelector, ImageSelector, LinkSelector, MenuItems, Headings } from "./elementSelector";
import { WebUtils } from "./webUtils";

/**
 * Fetches different types of elements from the page
 */
export class WebsiteScanner {
    //private buttonsSelector = "button, input[type='submit'], input[type='button'], [role='button']";
    private selectors: { [key: string]: ElementSelector } = {
        "Button": new ButtonSelector(),
        "Image": new ImageSelector(),
        "Link": new LinkSelector(),
        "Headings": new Headings(),
        "MenuItems": new MenuItems()
    };

    /**
    * Scans for every type we want.
    * @returns 
    */
    public scanPage(): ElementType[] {
        let results: ElementType[] = [];
        for (let key in this.selectors) {
            results.push(WebUtils.toType(this.selectors[key].getElements(), key, this.selectors[key].selector));
        }
        return results;
    }

    public getWebsiteURL(callback: (response: string) => void): void {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const activeTab = tabs[0];
            if (activeTab?.url) {
                callback(activeTab.url)
            }
        });
    }
}
