import React, { useEffect, useState } from "react";
import Select from "react-select";
import { createRoot } from "react-dom/client";
import "./style/popup.css";

const Popup = () => {
  const [count, setCount] = useState(0);
  const [currentURL, setCurrentURL] = useState<string>();
  const [selectedColor, setSelectedColor] = useState<string>(""); // Default color


  useEffect(() => {
    chrome.action.setBadgeText({ text: count.toString() });
  }, [count]);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      setCurrentURL(tabs[0].url);
    });
  }, []);

  // Reusable callback function
const handleResponse = (response:any) => {
  if (response && response.buttons) {
    console.log(response.buttons);
  } else if (response && response.images) {
    console.log(response.images);
  } else {
    console.log(response);
  }
};

/*
  * The functions below send messages to content script
  * @param {object} message - The message to be sent to the content script
  * @param {function} callback - The callback function to handle the response
  * @returns {void} */

/* Highlight buttons */

const highlightButtons = () => {
  sendMessageToActiveTab({ action: "highlightButtons", color: "#FF0000" }, handleResponse);
};

const checkButtonsAltText = () => {
  sendMessageToActiveTab({ action: "checkButtonsAltText" }, handleResponse);
};

const changeButtonsColor = (color: string) => {
  sendMessageToActiveTab({ action: "changeButtonsColor", color: color }, handleResponse);

  };
  
  const colorOptions = [
    { value: "", label: "Select Color" }, // Default title option
    { value: "red", label: "Red" },
    { value: "yellow", label: "Yellow" },
    { value: "blue", label: "Blue" },
    { value: "green", label: "Green" },
    { value: "orange", label: "Orange" },
    { value: "pink", label: "Pink" },
  ];

const sendMessageToActiveTab = (message:any, callback:any) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    if (activeTab?.id) {
      chrome.tabs.sendMessage(activeTab.id, message, callback);
    }
  });
};

  return (
    <>
      <div className={"content"}>
        <p>Current URL: {currentURL}</p>
        <p>
          Current Time:{" "}
          <p className={"pink bold"}> {new Date().toLocaleTimeString()} </p>{" "}
        </p>
      </div>

      <div className={"bottom"}>
        
        <button onClick={highlightButtons}>Highlight buttons</button>

        <button onClick={checkButtonsAltText}>Check alternative text of buttons</button>

        <Select
          options={colorOptions}
          value={colorOptions.find((option) => option.value === selectedColor)}
          onChange={(selectedOption) => setSelectedColor(selectedOption?.value || "")}
        />

        <button onClick={() => changeButtonsColor(selectedColor)}>
          Change color for the buttons
        </button>
      </div>
    </>
  );
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);