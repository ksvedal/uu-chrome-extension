import { HighlightAllMessage, HighlightAndRemovePreviousMessage, HighlightMessage, Message, ScanPageMessage, UnhighlightAllAndHighlightSingleMessage } from './messageObjects/message';
import { PageInteractor } from './htmlParser/pageInteractor';
import { WebsiteScanner } from './htmlParser/websiteScanner';
import { ElementType } from './sidebar/interfaces';

chrome.runtime.onMessage.addListener(handleMessage);
//This is used in page_interactor to add and remove the style
const styleElement: HTMLStyleElement = document.createElement('style');
// Add CSS rules to the style element
styleElement.textContent = `
    .highlight {
        border: 5px solid #FF0000 !important;
    }
`;
// Append the style element to the head of the documentto
document.head.append(styleElement);

/**
 * handles the message from popup.tsx
 * @param message 
 * @param sender 
 * @param sendResponse 
 */
function handleMessage(message: Message, sender: any, sendResponse: any) {
  try {
    const _page: PageInteractor = new PageInteractor();
    const _scan: WebsiteScanner = new WebsiteScanner();
    console.log("Message received:", message.action);

    /*
   Compares different actions and calls the appropriate function
 */

   /**
    * checkButtonAltText is not currently used, keeping it for future use
    */
    /* if (message.action === "checkButtonsAltText") {
      const buttonsSelector = "button, input[type='submit'], input[type='button'], [role='button']";
      const buttons = Array.from(document.querySelectorAll(buttonsSelector)) as HTMLElement[];
      let noAltTextCount = 0;

      buttons.forEach((button) => {
        let altText = "";
        if (button.tagName.toLowerCase() === "img") {
          altText = button.getAttribute("alt") as string;
        } else {
          altText = button.innerText.trim();
        }
        if (!altText) {
          noAltTextCount++;
          console.log("Button does not have alternative text:", button);
          button.style.cssText += `border: 5px solid #FF0000 !important;`;
        } else {
          button.style.cssText += `border: 5px solid #0000FF !important;`
          // Handle the button with alternative text
        }
      });
      console.log("Antall knapper uten alt tekst:", noAltTextCount);
      chrome.storage.local.set({ noAltTextCount: noAltTextCount } as { noAltTextCount: number },
        () => {
          chrome.runtime.sendMessage({ action: "noAltTextCountUpdated", count: noAltTextCount })
        })
      sendResponse({ message: "Button alternative text checked" });

    } else */
      if (message.action === "scanPage") {
        let result: ElementType[] = _scan.scanPage();
        sendResponse(result);
      } else if (message.action === "highlightElement") {
        _page.handleHighlightSingle((message as HighlightMessage));
        sendResponse({ message: "HighlightSingle response" });
      } else if (message.action === "highlightAllElements") {
        _page.highlightAllWithType((message as HighlightAllMessage));
        sendResponse({ message: "Highlighted all with type" })
      } else if (message.action === "highlightAndRemovePrevious") {
        _page.highlightAndRemovePrevious((message as HighlightAndRemovePreviousMessage));
        sendResponse({ message: "Highlighted and removed previous" })
      } else if (message.action === "unhighlightAllAndHighlightSingle") {
        _page.unhighlightAllAndHighlightSingle((message as UnhighlightAllAndHighlightSingleMessage));
        sendResponse({ message: "Unhighlighted all and highlighted single" })
      } else {
        sendResponse({ message: "Unknown action" });
      }
    return true; //Keeps the message channel open
  } catch (error: unknown) {
    console.error(`Error handling message:`, error);
    let errorMessage = '';
    if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = String(error);
    }
    sendResponse({ message: `Error: ${errorMessage}` });
    return true; //Keeps the message channel open
  }

}

