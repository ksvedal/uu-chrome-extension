import React, { useEffect, useState } from 'react';
import { createRoot } from "react-dom/client";
import "../style/sidebar.css";
import { ElementType, JsonDataFormat } from "../interfaces/interfaces";
import { RegularButton } from './components/buttons';
// import { MessageSender } from '../messageObjects/messageSender';
// import { WebsiteScanner } from '../htmlParser/websiteScanner';
import ResultsHeader from './resultsHeader';
import { CollapsibleItemType } from './components/collapsibleType';
import { MyContext } from './components/resultItemsContext';
import { fetchData, toggleDarkMode } from './sidebarUtils/sidebarFunctions';


export const Sidebar: React.FC = () => {
  const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [darkMode, setDarkMode] = useState(prefersDarkMode);
  const [scanPageResult, setScanPageResult] = useState<ElementType[]>([]); 
  const [websiteURL, setWebsiteURL] = useState<string>("");
  const [jsonData, setJsonData] = useState<JsonDataFormat[]>([]);
  const [error, setError] = useState<string | null>(null);


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


  return (
    <div className={`App ${darkMode ? "dark" : ""}`}>
      <div className='header-field'>
        <div className='extension-logo'>
          <img src="scan.png" alt="Extension Logo" />
        </div>
        <div className='extension-text'> <p>Button Seeker 2000</p></div>
        <button className={"dank-toggle-button float-right"} onClick={() => toggleDarkMode(setDarkMode, darkMode)}> moon </button>
      </div>

      <div className={"row scan-page-field"}>
        <div className={"whitebox"}>
          <div className="col-8">
            <div className='welcome-text'>
              <p> Welcome to Button Seeker! Click the “Scan Page” to find all buttons</p>
            </div>
          </div>
          <div className="col-4">
            <RegularButton data-testid="scanPage" text="Scan Page" onClick={()=> fetchData(setScanPageResult, setError, setWebsiteURL)} />
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