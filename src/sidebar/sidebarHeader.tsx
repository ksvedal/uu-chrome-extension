import React, { useEffect, useState } from 'react';
import TabIcon from './tabIcon';
import { WebsiteScanner } from '../htmlParser/websiteScanner';

const SidebarHeader: React.FC = () => {
    const _scan : WebsiteScanner = new WebsiteScanner();
    const [websiteURL, setWebsiteURL] = useState<string>("");
    const [isVisible, setIsVisible] = useState<boolean>(false);
    
    _scan.getWebsiteURL((url: string) => {
        setWebsiteURL(url); // update the state with the response data
      });
    };

  /* useEffect(() => {

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0].id !== undefined) {
        updateFavicon(tabs[0].id);
      }
    });

    // Listener for tab updates
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      if (tab.active && changeInfo.url && tabId !== undefined) {
        updateFavicon(tabId);
      }
    });
  }, []); */

  return (
    <div style={{ height: '150px', backgroundColor: '#f5f5f5' }}>
        <TabIcon></TabIcon>
        <p>Site: {websiteURL} </p>
        {/*<button className='headline-button' onClick={() => openInNewTab('./htmlTableBar')}>*/}
        <button className='headline-button' onClick={openInNewTab}>
          Åpen som tabell
        </button>

      </div>
  );
};

export default SidebarHeader;