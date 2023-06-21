chrome.runtime.onMessage.addListener(handleMessage);

function handleMessage(message: any, sender:any, sendResponse:any) {
  const buttonsSelector = "[role='button'], button, a, input[type='button'], input[type='submit'], span[role='button']";
  const imagesSelector = "img";

  if (message.action === "getButtons") {
    const buttons = Array.from(document.querySelectorAll(buttonsSelector));
    sendResponse({ buttons });
  } else if (message.action === "highlightButtons") {
    const color = message.color;
    const buttons = Array.from(document.querySelectorAll(buttonsSelector)) as HTMLElement[];
    buttons.forEach((button) => {
      button.style.cssText += `border: 5px solid ${color} !important;`;
    });
    sendResponse({ message: "Buttons highlighted" });
  } else if (message.action === "getImages") {
    const images = Array.from(document.querySelectorAll(imagesSelector));
    sendResponse({ images });
  } else if (message.action === "highlightImages") {
    const color = message.color;
    const images = Array.from(document.querySelectorAll(imagesSelector)) as HTMLElement[];
    images.forEach((image) => {
      image.style.cssText += `border: 5px solid ${color} !important;`;
      const altValue = image.getAttribute("alt");
      if (!altValue) {
        console.log(`Image has no alt text: ${image}`);
        image.style.cssText += `border: 10px solid #0000FF !important;`;
      } else {
        console.log(`Image has alt text: ${altValue}`);
        image.style.cssText += `border: 10px solid #00FF00 !important;`;
      }
    });
    sendResponse({ message: "Images highlighted" });
  } else if (message.color) {
    document.body.style.cssText += `background-color: ${message.color} !important;`;
    sendResponse({ message: "Background changed" });
  } else {
    sendResponse({ message: "Unknown action" });
  }
}
