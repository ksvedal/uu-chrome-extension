import React, { useEffect, useState } from "react";
import Select from "react-select";
import { createRoot } from "react-dom/client";
import "./style/popup.css";

const Popup = () => {
  const [count, setCount] = useState(0);
  const [currentURL, setCurrentURL] = useState<string>();
  const [selectedColor, setSelectedColor] = useState<string>(""); // Default color
  const [noAltTextCount, setNoAltTextCount] = useState<number>(0);


  useEffect(() => {
    chrome.action.setBadgeText({ text: count.toString() });
  }, [count]);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      setCurrentURL(tabs[0].url);
    });
  }, []);

  useEffect(() =>{
    chrome.runtime.onMessage.addListener(handleMessage);

    chrome.storage.local.get("noAltTextCount", (result)=>{
      const countAltText = result.noAltTextCount || 0;
      setNoAltTextCount(countAltText)
    });
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  const handleMessage = (message: any) => {
    if (message.action === "noAltTextCountUpdated"){
      const count = message.count || 0;
      setNoAltTextCount(count)
    }
  }

  /**
   * Reusable callback function
   *  @param {object} response - The response from the content script
   *  @returns {void}
   **/
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
    * @returns {void}
  */


  /**
   * Highlights all buttons in red
   * @returns {void}
  **/

  const highlightButtons = () => {
    sendMessageToActiveTab({ action: "highlightButtons", color: "#FF0000" }, handleResponse);
  };

  /**
   * Checks alternative text of all buttons.
    If the button has alt text, the border will be blue.
    Otherwise the border will be red.
  * @returns {void}
  **/
  const checkButtonsAltText = () => {
    localStorage.clear();
    sendMessageToActiveTab({ action: "checkButtonsAltText" }, handleResponse);
  };

  /**
   * Changes the color of all buttons to given color
   * @param {string} color - The color to be changed
   * @returns {void}
   * */
  const changeButtonsColor = (color: string) => {
    sendMessageToActiveTab({ action: "changeButtonsColor", color: color }, handleResponse);
  };

  /*
    * The options for the color select
    * @type {object[]}
  */
    const colorOptions = [
      { value: "", label: "Select Color" }, // Default title option
      { value: "red", label: "Red" },
      { value: "yellow", label: "Yellow" },
      { value: "blue", label: "Blue" },
      { value: "green", label: "Green" },
      { value: "orange", label: "Orange" },
      { value: "pink", label: "Pink" },
    ];

    /**
     * Sends a message to the active tab
     * @param message
     * @param callback
     */
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

        <p>Antall knapper uten alt text: {noAltTextCount}</p>

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