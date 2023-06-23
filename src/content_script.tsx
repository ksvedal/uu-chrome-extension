chrome.runtime.onMessage.addListener(handleMessage);

function handleMessage(message: any, sender:any, sendResponse:any) {
  const buttonsSelector = "[role='button'], button, a, input[type='button'], input[type='submit'], span[role='button']";

  if (message.action === "checkButtonsAltText") {
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
    chrome.storage.local.set({noAltTextCount: noAltTextCount} as {noAltTextCount: number},
      ()=> {
        chrome.runtime.sendMessage({action: "noAltTextCountUpdated", count: noAltTextCount})
      })
    sendResponse({message: "Button alternative text checked"});
  
    
    } else if (message.action === "highlightButtons") {
      const color = message.color;
      const buttons = Array.from(document.querySelectorAll(buttonsSelector)) as HTMLElement[];

      buttons.forEach((button) => {
        button.style.cssText += `
        background-color: ${color} !important; 
        border-radius: 10px;
      `;
      });

      sendResponse({message: "Buttons highlighted"});

    } else if (message.action === "changeButtonsColor") {
        const color = message.color;
        const buttons = Array.from(
          document.querySelectorAll(
              buttonsSelector
          )
        ) as HTMLElement[];
        buttons.forEach((button) => {
          button.style.backgroundColor = color;
        });
        sendResponse({message: "Buttons color changed"});

    } else {
        sendResponse({message: "Unknown action"});
    }

}
