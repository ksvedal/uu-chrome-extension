import React, { useContext, useState } from 'react';
import { CollapsibleItemType, CollapsibleItemElement } from './collapsibleItem';
import { createRoot } from "react-dom/client";
import "../style/sidebar.css";
import { ElementObject, ElementType } from "./interfaces";
import { RegularButton } from './buttons';
import { MessageSender } from '../messageObjects/messageSender';
import { WebsiteScanner } from '../htmlParser/websiteScanner';
import ResultsHeader from './resultsHeader';

const Sidebar: React.FC = () => {
  const [scanPage, setScanPage] = useState<ElementType[]>([]); // initialize scanPage state as an empty array
  const [websiteURL, setWebsiteURL] = useState<string>("");
  const [isAllHighlighted, setIsAllHighlighted] = useState<boolean>(false); // add this line
  const [currentHighlighted, setCurrentHighlighted] = useState<ElementObject | null>(null);

  const _message: MessageSender = new MessageSender();
  const _scan: WebsiteScanner = new WebsiteScanner();

  const fetchData = () => {
    _message.scanPageMessage((response: ElementType[]) => {
      setScanPage(response); // update the state with the response data
    });

    _scan.getWebsiteURL((url: string) => {
      setWebsiteURL(url); // update the state with the response data
    });
  };

  const openInNewTab = () => {
    const htmlFilePath = chrome.runtime.getURL('htmlTableBar.html');
    console.log(htmlFilePath);
    chrome.tabs.create({ url: htmlFilePath });

  };

  return (
    <div className='App'>
      <RegularButton text="Scan page" onClick={fetchData} />
      <ResultsHeader
        url={websiteURL}
        isScanned={scanPage.length !== 0}
        openInNewTab={openInNewTab}></ResultsHeader>

      {/*for each element in ScanPage, creates a collapse menu with other nodes*/}
      {scanPage.map((item, index) =>
        <CollapsibleItemType key={index}
          type={item}
          setIsAllHighlighted={setIsAllHighlighted}
          setCurrentHighlighted={setCurrentHighlighted}
          isAllHighlighted={isAllHighlighted}
        >
        </CollapsibleItemType>)}
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