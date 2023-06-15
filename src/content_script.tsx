chrome.runtime.onMessage.addListener(handleMessage);
 
 
 
function handleMessage(message: any, sender:any, sendResponse:any) {
  if (message.action === "getButtons") {
    const buttons = Array.from(document.querySelectorAll("[role='button'], button, a, input[type='button'], input[type='submit']"));
    sendResponse({ buttons });
  } else if (message.action === "highlightButtons") {
    const color = message.color;
    const buttons = Array.from(document.querySelectorAll("[role='button'], button, a, input[type='button'], input[type='submit']")) as HTMLButtonElement[];
    buttons.forEach((button) => {
      button.style.border = "5px solid " + color;
      //button.classList.add("button-highlight");
      //console.log(button);
      });
    sendResponse({ message: "Buttons highlighted" });
  } else if(message.color){
    document.body.style.backgroundColor = message.color;
    sendResponse({ message: "Background changed" });
  } else {
    sendResponse({ message: "Unknown action" });
  }
}
