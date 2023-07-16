import { ElementObject, ElementType } from "../sidebar/interfaces";
import { HighlightMessage, ScanPageMessage, HighlightAllMessage, HighlightAndRemovePreviousMessage, UnhighlightAllAndHighlightSingleMessage } from "./message";

export class MessageSender {
    public scanPageMessage(callback: (response: ElementType[]) => void) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const activeTab = tabs[0];
            if (activeTab?.id) {
                chrome.tabs.sendMessage(activeTab.id, new ScanPageMessage, callback);
            }
        });
        return true;
    }

    public highlightSingleMessage(element: ElementObject, isChecked: boolean, callback?: (response: any) => void) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          if (tabs[0]?.id) {
            console.log("Running with a tab id");
            chrome.tabs.sendMessage(tabs[0].id, new HighlightMessage(element, isChecked), (response) => {
              if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError.message);
              } else if (response && response.message) {
                console.log("Result message: " + response.message);
              } else {
                console.log("Response is undefined or missing 'message' property");
              }
              
              //Used for testing purposes
              if (callback) {
                callback(response); // Invoke the callback function with the response
              }
            });
          } else {
            console.log("No tab id");
            
            //Used for testing purposes
            if (callback) {
              callback([]); // Invoke the callback function with an empty array
            }
          }
        });
        
        return true;
      }
      

    public highlightAndRemovePreviousMessage(newElement: ElementObject, previousElement: ElementObject) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            if (tabs[0]?.id) {
                console.log("Running with a tab id");
                chrome.tabs.sendMessage(tabs[0].id, new HighlightAndRemovePreviousMessage(newElement, previousElement), (response) => {
                    if (chrome.runtime.lastError) {
                        console.error(chrome.runtime.lastError.message);
                    } else {
                        console.log("Result message: " + response.message);
                    }
                });
            } else {
                console.log("No tab id");
            }
        });
        return true;
    }

    public highlightAllWithType(element: ElementType, isChecked: boolean) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            if (tabs[0]?.id) {
                console.log("Running with a tab id");
                chrome.tabs.sendMessage(tabs[0].id, new HighlightAllMessage(element, isChecked), (response) => {
                    if (chrome.runtime.lastError) {
                        console.error(chrome.runtime.lastError.message);
                    } else {
                        console.log("Result message: " + response.message);
                    }
                });
            } else {
                console.log("No tab id");
            }
        });
        return true;
    }

    public unhighlightAllAndHighlightSingleMessage(element: ElementObject, elementType: ElementType) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            if (tabs[0]?.id) {
                console.log("Running with a tab id");
                chrome.tabs.sendMessage(tabs[0].id, new UnhighlightAllAndHighlightSingleMessage(element, elementType), (response) => {
                    if (chrome.runtime.lastError) {
                        console.error(chrome.runtime.lastError.message);
                    } else {
                        console.log("Result message: " + response.message);
                    }
                });
            } else {
                console.log("No tab id");
            }
        });
        return true;
    }
}
