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

    switch(message.action){
      case 'scanPage':{
        let result: ElementType[] = _scan.scanPage();
        sendResponse(result);
        break;
      }
      case 'highlightElement':{
        _page.handleHighlightSingle((message as HighlightMessage));
        sendResponse({ message: "HighlightSingle response" });
        break;
      }
      case 'highlightAllElements':{
        _page.highlightAllWithType((message as HighlightAllMessage));
        sendResponse({ message: "Highlighted all with type" })
        break;
      }
      case 'highlightAndRemovePrevious':{
        _page.highlightAndRemovePrevious((message as HighlightAndRemovePreviousMessage));
        sendResponse({ message: "Highlighted and removed previous" })
        break;
      }
      case 'unhighlightAllAndHighlightSingle':{
        _page.unhighlightAllAndHighlightSingle((message as UnhighlightAllAndHighlightSingleMessage));
        sendResponse({ message: "Unhighlighted all and highlighted single" })
        break;
      }
      default:{
        sendResponse({ message: "Unknown action" });
        break;
      }
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