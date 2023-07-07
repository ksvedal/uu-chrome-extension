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
function handleMessage(
  message: {action: string},
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: ElementType[] | { message: string } ) => void) {
  try {
    const _page: PageInteractor = new PageInteractor();
    const _scan: WebsiteScanner = new WebsiteScanner();
    console.log("Message received:", message.action);

    /*
   Compares different actions and calls the appropriate function
 */
      if (message.action === "scanPage") {
        let scannedHtmlResults: ElementType[] = _scan.scanPage();
        sendResponse(scannedHtmlResults);
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