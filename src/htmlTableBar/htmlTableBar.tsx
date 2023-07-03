import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { WebsiteScanner } from '../htmlParser/websiteScanner';
import { ElementType } from '../sidebar/interfaces';

const HtmlTableBar: React.FC = () => {
  const [htmlData, setHtmlData] = useState<ElementType[]>([]); // initialize htmlData state as an empty array

  useEffect(() => {
    // Retrieve data from chrome storage
    chrome.storage.local.get(['scanResults'], function(result) {
      if(result.scanResults){
        setHtmlData(result.scanResults);
        console.log("Data retrieved from chrome storage: ", result.scanResults);
      }
    });
  }, []);

return (
  <div>
    {htmlData.map((item) => (
      <div>
        {item.nodes.map((node) => (
          <p>Name: {node.htmlString}</p>
        ))}
      </div>
    ))}
  </div>
); 
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <HtmlTableBar />
  </React.StrictMode>
);