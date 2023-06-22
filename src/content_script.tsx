import { PageInteractor } from './page_interactor';
import { WebsiteScanner } from './website_scanner';

chrome.runtime.onMessage.addListener(handleMessage);

function handleMessage(message: any, sender:any, sendResponse:any) {
  const buttonsSelector = "[role='button'], button, a, input[type='button'], input[type='submit'], span[role='button']";

  const _page : PageInteractor = new PageInteractor();
  const _scan : WebsiteScanner = new WebsiteScanner();
  if (message.action === "checkButtonsAltText") {
    const buttons = Array.from(document.querySelectorAll(buttonsSelector)) as HTMLElement[];
    buttons.forEach((button) => {
      let altText = "";
      if (button.tagName.toLowerCase() === "img") {
        altText = button.getAttribute("alt") as string;
      } else {
        altText = button.innerText.trim();
      }
      if (!altText) {
        console.log("Button does not have alternative text:", button);
        button.style.cssText += `border: 5px solid #FF0000 !important;`;
      } else {
        console.log("Button has alternative text:", altText);
        button.style.cssText += `border: 5px solid #0000FF !important;`
        // Handle the button with alternative text
      }
    });
    sendResponse({ message: "Button alternative text checked" });
  } else if (message.action === "highlightButtons") {
    _page.highlightElements(_scan.getButtons());
    sendResponse({ message: "Buttons highlighted" });
  } else {
    sendResponse({ message: "Unknown action" });
  }
}