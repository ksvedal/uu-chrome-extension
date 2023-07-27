import { ElementObject, ElementType } from "../sidebar/interfaces";
import { HighlightMessage, ScanPageMessage, HighlightAllMessage, HighlightAndRemovePreviousMessage, UnhighlightAllAndHighlightSingleMessage, Message, HighlightAllDashedMessage } from "./message";

export class MessageSender {
  

    public scanPageMessage(callback: (response: ElementType[]) => void) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          const activeTab = tabs[0];
          if (activeTab && activeTab.id) {
            try {
              chrome.tabs.sendMessage(activeTab.id, new ScanPageMessage(), callback);
            } catch (error) {
              console.error("Error sending message:", error);
              callback([]); // Call the callback with an empty array to handle the error case
            }
          } else {
            console.log("No active tab");
            callback([]); // Invoke the callback with an empty array to handle the error case
          }
        });
      }
      
      

      public highlightSingleMessage(element: ElementObject, isChecked: boolean) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          if (tabs[0]?.id) {
            console.log("Running with a tab id");
            chrome.tabs.sendMessage(tabs[0].id, new HighlightMessage(element, isChecked), (response) => {
              if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError.message);
              } else if (response && response.message) {
                console.log("Result message: " + response.message);
              }
            });
          } else {
            console.log("No tab id");
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

    public highlightAllTypesDashed(){
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs[0]?.id) {
            console.log("Running with a tab id");
            chrome.tabs.sendMessage(tabs[0].id, new HighlightAllDashedMessage(), (response) => {
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
