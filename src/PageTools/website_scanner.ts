import { ElementType } from "../Sidebar/Interfaces";
import { WebUtils } from "./web_utils";

/**
 * Fetches different types of elements from the page
 */
export class WebsiteScanner{

    /* public testFunction(){
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          const activeTab = tabs[0];
          if (activeTab?.id) {
            chrome.tabs.sendMessage(activeTab.id, "scanPage", this.testResponse);
          }
        });
      } */
      public testFunction(callback: (response: any) => void){
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          const activeTab = tabs[0];
          if (activeTab?.id) {
            chrome.tabs.sendMessage(activeTab.id, "scanPage", callback);
          }
        });
      }
    

      public testResponse(response: any){
        console.log(response);
      }

    /**
     * Scans for every type we want.
     * To expand, create a new getElement and push it to results
     * @returns 
     */
    public scanPage(): ElementType[]{
        let results: ElementType[] = [];
        results.push(WebUtils.toType(this.getButtons(), "Buttons"));
        return results;
    }

    public getButtons(): NodeListOf<HTMLElement> {
        const buttonsSelector = "button, input[type='submit'], input[type='button'], [role='button']";
        return document.querySelectorAll(buttonsSelector) as NodeListOf<HTMLElement>;
    }
}