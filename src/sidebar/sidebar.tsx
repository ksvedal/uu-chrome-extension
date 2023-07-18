import React, {useContext, useEffect, useState} from 'react';
import { createRoot } from "react-dom/client";
import "../style/sidebar.css";
import { ElementObject, ElementResult, ElementType } from "./interfaces";
import { RegularButton } from './buttons';
import { MessageSender } from '../messageObjects/messageSender';
import { WebsiteScanner } from '../htmlParser/websiteScanner';
import ResultsHeader from './resultsHeader';
import { CollapsibleItemType } from './collapsibleItem';
import { MyContext } from './resultItemsContext';

export const Sidebar: React.FC = () => {
  const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [darkMode, setDarkMode] = useState(prefersDarkMode);
  const [scanPage, setScanPage] = useState<ElementType[]>([]); // initialize scanPage state as an empty array
  const [websiteURL, setWebsiteURL] = useState<string>("");
  const [isAllHighlighted, setIsAllHighlighted] = useState<boolean>(false); // add this line
  const [currentHighlighted, setCurrentHighlighted] = useState<ElementObject | null>(null);
  const [elementResults, setElementResults] = useState<ElementResult[]>([]);
  const [index, setIndex] = useState<number[]>([]);
  const [thisElement, setThisElement] = useState<ElementObject | null>(null);
  const [testID, setTestID] = useState<string>("");

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
      setScanPage(response); // update the state with the response data
      chrome.storage.local.set({ scanResults: response });
     
    });

    _scan.getWebsiteURL((url: string) => {
      setWebsiteURL(url); // update the state with the response data
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
            </div>
        <div className="col-12">
            <MyContext.Provider value ={{elementResults, setElementResults}}>
                <div className={"whitebox"}>
                    <ResultsHeader url={websiteURL} isScanned={scanPage.length !== 0}/>
                </div>
            {/*for each element in ScanPage, creates a collapse menu with other nodes*/}
            {scanPage.map((item, index) =>
              <CollapsibleItemType key={index}
                type={item}
                setIsAllHighlighted={setIsAllHighlighted}
                setCurrentHighlighted={setCurrentHighlighted}
                isAllHighlighted={isAllHighlighted}
                parentIndex={index}
                thisElement={thisElement}
                url={websiteURL}
                testID={testID}
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