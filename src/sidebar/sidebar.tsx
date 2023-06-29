import React, { useState } from 'react';
import { CollapsibleItemType, CollapsibleItemElement } from './collapsibleItem';
import { createRoot } from "react-dom/client";
import "../style/sidebar.css";
import { ElementObject, ElementType } from "./interfaces";
import { RegularButton } from './buttons';
import { MessageSender } from '../messageObjects/messageSender';
import { WebsiteScanner } from '../htmlParser/websiteScanner';



const Sidebar: React.FC = () => {
  const [scanPage, setScanPage] = useState<ElementType[]>([]); // initialize scanPage state as an empty array
  const [highlightedElement, setHighlightedElement] = useState<ElementObject | null>(null);
  const [websiteURL, setWebsiteURL] = useState<string>("");
  const _message : MessageSender = new MessageSender();
  const _scan : WebsiteScanner = new WebsiteScanner();
  const [isClicked, setIsClicked] = useState(false);


  const fetchData = () => {
    _message.scanPageMessage((response: ElementType[]) => {
      setScanPage(response); // update the state with the response data
    });

    _scan.getWebsiteURL((url: string) => {
      setWebsiteURL(url); // update the state with the response data
    });
  };

  return (
    <div className='App'>
      <div className='header-field'>
        <div className='extension-logo'>
          <img src="./scan.png" alt="Extension Logo"/>
        </div>
        <div className='extension-text'> <p>Button Seeker</p></div>
      </div>

      
      <div className="scan-page-button">
      <div className='welcome-text'>
        <p> Welcome to Button Seeker! Click the “Scan Page” to find all buttons</p>
      </div>
        <RegularButton isClicked={isClicked} text="SCAN PAGE" onClick={fetchData} /> 
      </div>
    

      {/* This is the non-collapsible space */}
      <div className='headline'>
        <p>Website: {websiteURL} </p>
        <button className='headline-button' onClick={(e) => { e.stopPropagation();}}>
          Open as table
        </button>
      </div>

      {/*for each element in ScanPage, creates a collapse menu with other nodes*/}
      {scanPage.map((item, index) => 
      <CollapsibleItemType key={index}
      type={item}>

        {/* For each node in the type, creates another collapse to display the button*/}
        {item.nodes.map((item, index) =>
          <CollapsibleItemElement 
          key={index} 
          object={item}
          highlightedElement={highlightedElement}
          setHighlightedElement={setHighlightedElement}>
            {item.htmlString}
          </CollapsibleItemElement>
        )}
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