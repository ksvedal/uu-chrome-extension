//---------------------------------------------------------------------------------------------//
//This file is used to create the popup window that appears when the extension icon is clicked.//
//Not everything in this file is useful for the extension.                                     //
//---------------------------------------------------------------------------------------------//

// Testing
function updateTime() {
    const timeElement = document.getElementById('time');
    if (timeElement) {
      const currentTime = new Date().toLocaleTimeString();
      timeElement.textContent = 'Current time: ' + currentTime;
    }
  }
  
  // Update the time and appearance every second
  setInterval(updateTime, 1000);
  
  // Call the updateTime function once when the popup window loads
  updateTime();
  
  function updateImageBorderColor() {
    const imageFrame = document.getElementById('image-frame');
    if (imageFrame) {
      const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
      const currentColor = imageFrame.style.borderColor;
      const currentIndex = colors.indexOf(currentColor);
  
      // Find the next color in the sequence
      const nextIndex = (currentIndex + 1) % colors.length;
      const nextColor = colors[nextIndex];
  
      // Update the border color of the image frame
      imageFrame.style.borderColor = nextColor;
    }
  }
  
  // Update the image border color every second -Not useful right 
  //setInterval(updateImageBorderColor, 1000);
  
  // Call the updateImageBorderColor function once when the popup window loads
  updateImageBorderColor();
  
  const imageFolder = 'images/';
  
  function updateImage() {
    const imageElement = document.getElementById('image') as HTMLImageElement;
    if (imageElement) {
      // Generate a random number between 1 and 4
      const randomNumber = Math.floor(Math.random() * 3) + 1;

      // Generate the file path to the random image
      const imageUrl = chrome.runtime.getURL(imageFolder + 'face' + randomNumber + '.jpg');
      imageElement.src = imageUrl;
    }
  }
  
  // Update the image every second -Not useful right now
  //setInterval(updateImage, 1000);
  updateImage();