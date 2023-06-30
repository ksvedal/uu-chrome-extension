import React, { useState } from 'react';
import { CollapsibleItemType } from './collapsibleItem';
import { createRoot } from "react-dom/client";
import "../style/sidebar.css";
import { ElementObject, ElementType } from "./interfaces";
import { RegularButton } from './buttons';
import { MessageSender } from '../messageObjects/messageSender';
import TabIcon from './tabIcon';
import { WebsiteScanner } from '../htmlParser/websiteScanner';



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
      {/* This is the non-collapsible space */}
      <div style={{ height: '150px', backgroundColor: '#f5f5f5' }}>
        <TabIcon></TabIcon>
        <p>Site: {websiteURL} </p>
        {/*<button className='headline-button' onClick={() => openInNewTab('./htmlTableBar')}>*/}
        <button className='headline-button' onClick={openInNewTab}>
          Åpen som tabell
        </button>

      </div>

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
