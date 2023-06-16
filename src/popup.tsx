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

  return (
    <>
      <div className={"content"}>
        <p>Current URL: {currentURL}</p>
        <p>Current Time: <p className={"pink"}> {new Date().toLocaleTimeString()} </p> </p>
      </div>

      <div className={"bottom"}>
        <button onClick={() => setCount(count + 1)}>
          count up
        </button>

        <button onClick={changeBackground}>
          change background
        </button>

        <button onClick={hightlightButtons}>
          Ny funksjon
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
