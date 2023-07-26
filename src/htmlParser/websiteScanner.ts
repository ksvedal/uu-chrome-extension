import { ElementType } from "../sidebar/interfaces";
import { ElementSelector, ButtonSelector, ImageSelector, LinkSelector, MenuItems, Headings } from "./elementSelector";
import { WebUtils } from "./webUtils";

/**
 * Fetches different types of elements from the page
 */
export class WebsiteScanner {
    private selectors: { [key: string]: ElementSelector } = {
        "Buttons": new ButtonSelector(),
        "Images": new ImageSelector(),
        "Links": new LinkSelector(),
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
            console.log('HTML elements' + this.selectors[key].getElements())
            results.push(WebUtils.toType(this.selectors[key].getElements(), key, this.selectors[key].selector));
        }
        console.log(results.length)
        return results;
    }

    public getWebsiteURL(callback: (response: string) => void): void {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const activeTab = tabs[0];
            if (activeTab?.url) {
                callback(activeTab.url);
            }
        });
    }
}