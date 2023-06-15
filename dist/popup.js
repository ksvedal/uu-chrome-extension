"use strict";
//---------------------------------------------------------------------------------------------//
//This file is used to create the popup window that appears when the extension icon is clicked.//
//It has a random border and a picture                                                         //
//---------------------------------------------------------------------------------------------//
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
updateImageBorderColor();
const imageFolder = 'images/';
function updateImage() {
    const imageElement = document.getElementById('image');
    if (imageElement) {
        // Generate a random number between 1 and 4
        const randomNumber = Math.floor(Math.random() * 3) + 1;
        // Generate the file path to the random image
        const imageUrl = chrome.runtime.getURL(imageFolder + 'face' + randomNumber + '.jpg');
        imageElement.src = imageUrl;
    }
}
updateImage();
