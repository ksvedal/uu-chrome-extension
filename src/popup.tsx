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

const sendMessage = (message:any, callback:any) => {
  sendMessageToActiveTab(message, callback);
};


const highlightButtons = () => {
  sendMessage({ action: "highlightButtons", color: "#FF0000" }, handleResponse);
};

const checkButtonsAltText = () => {
  sendMessage({ action: "checkButtonsAltText" }, handleResponse);
};

  const changeButtonsColor = (color: string) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tab = tabs[0];
      if (tab.id) {
        chrome.tabs.sendMessage(
          tab.id,
          {
            action: "changeButtonsColor",
            color: color,
          },
          (msg) => {
            console.log("result message:", msg);
          }
        );
      }
    });
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

  const sendMessageToActiveTab = (message:any , callback:any) => {
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