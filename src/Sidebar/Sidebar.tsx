import React, { useState } from 'react';
import { CollapsibleItemType, CollapsibleItemElement } from './CollapsibleItem';
import { createRoot } from "react-dom/client";
import "../style/Sidebar.css";
import { ElementType } from "./Interfaces";
import { RegularButton } from './Buttons';
import { WebsiteScanner } from '../PageTools/website_scanner';




const Sidebar: React.FC = () => {
  const [scanPage, setScanPage] = useState<ElementType[]>([]); // initialize scanPage state as an empty array
  const _scan : WebsiteScanner = new WebsiteScanner();

  const fetchData = () => {
    _scan.scanPageMessage((response: ElementType[]) => {
      setScanPage(response); // update the state with the response data
    });
  };


  return (
    <div className='App'>
      <RegularButton text="Scan page" onClick={fetchData} /> 
      {/*for each element in ScanPage, creates a collapse menu with other nodes*/}
      {scanPage.map((item, index) => 
      <CollapsibleItemType key={index}
      type={item}>
        {/* For each node in the type, creates another collapse to display the button*/}
        {item.nodes.map((item, index) =>
          <CollapsibleItemElement 
          key={index} 
          object={item}>
            {item.html}
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