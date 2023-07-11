import React, { useContext, useState } from 'react';
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
  const [scanPage, setScanPage] = useState<ElementType[]>([]); // initialize scanPage state as an empty array
  const [websiteURL, setWebsiteURL] = useState<string>("");
  const [isAllHighlighted, setIsAllHighlighted] = useState<boolean>(false); // add this line
  const [currentHighlighted, setCurrentHighlighted] = useState<ElementObject | null>(null);
  const [elementResults, setElementResults] = useState<ElementResult[]>([]);

  

  const _message: MessageSender = new MessageSender();
  const _scan: WebsiteScanner = new WebsiteScanner();

  // 1) --> messageSender.tsx
  // 9) <-- updates "setScanPage"
  const fetchData = () => {
    _message.scanPageMessage((response: ElementType[]) => {
      setScanPage(response); // update the state with the response data
      chrome.storage.local.set({ scanResults: response });
     
    });

    _scan.getWebsiteURL((url: string) => {
      setWebsiteURL(url); // update the state with the response data
    });
  };

  return (
    <div className='App'>

      <div className='header-field'>
        <div className='extension-logo'>
          <img src="scan.png" alt="Extension Logo" />
        </div>
        <div className='extension-text'> <p>Button Seeker</p></div>
      </div>


      <div className="scan-page-button">
        <div className='welcome-text'>
          <p> Welcome to Button Seeker! Click the “Scan Page” to find all buttons</p>
        </div>
        <RegularButton data-testid="scanPage" text="SCAN PAGE" onClick={fetchData} />
      </div>
      <MyContext.Provider value ={{elementResults, setElementResults}}>
      <ResultsHeader
        url={websiteURL}
        isScanned={scanPage.length !== 0}
      />

      {/*for each element in ScanPage, creates a collapse menu with other nodes*/}
      {scanPage.map((item, index) =>
        <CollapsibleItemType key={index}
          type={item}
          setIsAllHighlighted={setIsAllHighlighted}
          setCurrentHighlighted={setCurrentHighlighted}
          isAllHighlighted={isAllHighlighted}
        >
        </CollapsibleItemType>)}
        </MyContext.Provider>
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