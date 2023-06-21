import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import './style/popup.css';

const Popup = () => {
  const [count, setCount] = useState(0);
  const [currentURL, setCurrentURL] = useState<string>();

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

  const getButtons = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];

      if (activeTab?.id) {
        chrome.tabs.sendMessage(
          activeTab.id, {
          action: "getButtons" 
        }, (response) => {

          if (response && response.buttons) {

            console.log(response.buttons);
          }else{
            console.log(response);

          }
        });
      }
    });
  };

  const getImages = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab?.id) {
        chrome.tabs.sendMessage(
          activeTab.id, {
          action: "getLabels" 
        }, (response) => {
          if (response && response.image) {
            console.log(response.image);
          }else{
            console.log(response);
          }
        });
      }
    });
  };

  const hightlightImages = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tab = tabs[0];
      if (tab.id) {
        chrome.tabs.sendMessage(
          tab.id,
          {
            action: "highlightImages",
            color: "#FFFF33",
          },
          (msg) => {
            console.log("result message:", msg);
          }
        );
      }
    });
  };

  return (
    <>
      <div className={"content"}>
        <p>Current URL: {currentURL}</p>
        <p>Current Time: <p className={"pink bold"}> {new Date().toLocaleTimeString()} </p> </p>
      </div>

      <div className={"bottom"}>
        <button onClick={() => setCount(count + 1)}>
          Count up
        </button>

        <button onClick={changeBackground}>
          Change background
        </button>

        <button onClick={hightlightButtons}>
          Highlight buttons
        </button>

        <button onClick={hightlightImages}>
          Highlight images
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
