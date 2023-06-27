import { HighlightAllMessage, HighlightMessage, Message, ScanPageMessage } from './MessageObjects/message';
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
  const _page: PageInteractor = new PageInteractor();
  const _scan: WebsiteScanner = new WebsiteScanner();

  /*
    Compares different actions and calls the appropriate function
  */
  if (message.action === "scanPage") {
    //Sends a list of ElementType containing all the elementObjects on the page
    let result: ElementType[] = _scan.scanPage();
    sendResponse(result);
  } else if (message.action === "highlightElement") {
    _page.handleHighlightSingle((message as HighlightMessage));
    sendResponse({ message: "HighlightSingle response" });
  } else if (message.action === "highlightAllElements") {
    _page.highlightElements((message as HighlightAllMessage));
    sendResponse({message: "Highlighted all with type"})
  } else {
    sendResponse({ message: "Unknown action" });
  }
  return true; //Keeps the message channel open
}