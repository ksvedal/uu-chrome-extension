import { HighlightAllMessage, HighlightAndRemovePreviousMessage, HighlightMessage, UnhighlightAllAndHighlightSingleMessage } from './messageObjects/message';
import { PageInteractor } from './htmlParser/pageInteractor';
import { WebsiteScanner } from './htmlParser/websiteScanner';
import { ElementType } from './sidebar/interfaces';
import './style/contentScriptHighlightStyle.css';

chrome.runtime.onMessage.addListener(handleMessage);

/**
 * handles the message from popup.tsx
 * @param message 
 * @param sender 
 * @param sendResponse 
 */

export function handleMessage(
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