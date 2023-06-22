import React, { useEffect, useState } from "react";
import Select from "react-select";
import { createRoot } from "react-dom/client";
import './style/popup.css';

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

  const changeBackground = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tab = tabs[0];
      if (tab.id) {
        chrome.tabs.sendMessage(
          tab.id,
          {
            color: "#555555",
          },
          (msg) => {
            console.log("result message:", msg);
          }
        );
      }
    });
  };

  const hightlightButtons = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tab = tabs[0];
      if (tab.id) {
        chrome.tabs.sendMessage(
          tab.id,
          {
            action: "highlightButtons",
            color: "#FF0000",
          },
          (msg) => {
            console.log("result message:", msg);
          }
        );
      }
    });
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

  const getButtons = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];

      if (activeTab?.id) {
        chrome.tabs.sendMessage(
          activeTab.id,
          {
            action: "getButtons",
          },
          (response) => {
            if (response && response.buttons) {
              console.log(response.buttons);
            } else {
              console.log(response);
            }
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
        <button onClick={() => setCount(count + 1)}>count up</button>

        <button onClick={changeBackground}>change background</button>

        <button onClick={hightlightButtons}>Ny funksjon</button>

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








