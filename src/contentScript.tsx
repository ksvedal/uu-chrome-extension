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
  if (message.action === "checkButtonsAltText") {
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

  } else if (message.action === "highlightButtons") {
    _page.highlightElements(_scan.getButtons());
    sendResponse({ message: "Buttons highlighted" });
  } else if (message === "scanPage") {
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
