import React, { useEffect, useState } from 'react';
import { createRoot } from "react-dom/client";
import "../style/sidebar.css";
import { ElementType, JsonDataFormat } from "../interfaces/interfaces";
import { RegularButton } from './buttons';
import { MessageSender } from '../messageObjects/messageSender';
import { WebsiteScanner } from '../htmlParser/websiteScanner';
import ResultsHeader from './resultsHeader';
import { CollapsibleItemType } from './collapsibleType';
import { MyContext } from './resultItemsContext';

export const Sidebar: React.FC = () => {
  const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [darkMode, setDarkMode] = useState(prefersDarkMode);
  const [scanPageResult, setScanPageResult] = useState<ElementType[]>([]); 
  const [websiteURL, setWebsiteURL] = useState<string>("");
  const [jsonData, setJsonData] = useState<JsonDataFormat[]>([]);
  const [error, setError] = useState<string | null>(null);


  const _message: MessageSender = new MessageSender();
  const _scan: WebsiteScanner = new WebsiteScanner();
  let dark: String = "light";

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (event: MediaQueryListEvent) => {
      setDarkMode(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const fetchData = () => {
    _message.scanPageMessage((response: ElementType[]) => {
      if (response == null || response.length === 0) {
        const errorMsg = "No response from the content script or the response is empty. Refresh the page and try again.";
        console.error(errorMsg);
        setError(errorMsg); // update error state with the error message
        return;
      }
      setScanPageResult(response); // update the state with the response data
      setError(null); // clear the error message if no error occurs
    });
    _scan.getWebsiteURL((url: string) => {
      if (!url) {
        const errorMsg = "Failed to get the website URL.";
        console.error(errorMsg);
        setError(errorMsg); // update error state with the error message
        return;
      }
      setWebsiteURL(url); // update the state with the response data
      setError(null); // clear the error message if no error occurs
    });

  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  }

  return (
    <div className={`App ${darkMode ? "dark" : ""}`}>
      <div className='header-field'>
        <div className='extension-logo'>
          <img src="scan.png" alt="Extension Logo" />
        </div>
        <div className='extension-text'> <p>Button Seeker 2000</p></div>
        <button className={"dank-toggle-button float-right"} onClick={toggleDarkMode}> moon </button>
      </div>

      <div className={"row scan-page-field"}>
        <div className={"whitebox"}>
          <div className="col-8">
            <div className='welcome-text'>
              <p> Welcome to Button Seeker! Click the “Scan Page” to find all buttons</p>
            </div>
          </div>
          <div className="col-4">
            <RegularButton data-testid="scanPage" text="Scan Page" onClick={fetchData} />
          </div>
          {error && <div className="col-12 error-message">{error}</div>}
        </div>

        <div className="col-12">
          <MyContext.Provider value={{ jsonData, setJsonData }}>
            <div className={"whitebox"}>
              <ResultsHeader url={websiteURL} isScanned={scanPageResult.length !== 0} />
            </div>
            {/*for each element in ScanPage, creates a collapse menu with other nodes*/}
            {scanPageResult.map((elementType, index) =>
              <CollapsibleItemType
                key={index}
                elementType={elementType} // Buttons, Links, Images, etc.
                url={websiteURL}
              >
              </CollapsibleItemType>)}
          </MyContext.Provider>
        </div>
      </div>

    </div>
  );
}

//export default Sidebar;
const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Sidebar />
  </React.StrictMode>
);