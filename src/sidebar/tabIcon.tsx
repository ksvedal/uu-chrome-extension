import React, { useEffect, useState } from 'react';

const TabIcon: React.FC = () => {
  const [favicon, setFavicon] = useState<string>('');

  useEffect(() => {
    // Function to update favicon
    const updateFavicon = (tabId: number, attempts = 0) => {
      chrome.tabs.get(tabId, (tab) => {
        let url = tab.url ? tab.url.replace(/#.*$/, '') : ''; // drop #hash
        let favicon: React.SetStateAction<string>;
        let delay;
    
        if (tab.favIconUrl && tab.favIconUrl != '' 
            && tab.favIconUrl.indexOf('chrome://favicon/') == -1) {
            // favicon appears to be a normal url
            favicon = tab.favIconUrl;
            delay = 0;
        }
        else {
            // couldn't obtain favicon as a normal url, try using a favicon service
            favicon = 'https://s2.googleusercontent.com/s2/favicons?domain_url=' + url;
            delay = 0;
        }
    
        setTimeout(() => {
          if (favicon !== 'chrome://favicon/' && favicon !== '') {
            setFavicon(favicon);
          } else if (attempts < 10) {
            // If the favicon is not ready yet and we've made less than 10 attempts, retry after 500ms
            setTimeout(() => updateFavicon(tabId, attempts + 1), 500);
          }
        }, delay);
      });
    }
    
    // Initial favicon update
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
  }, []);

  return (
    <div>
      {favicon && <img src={favicon} alt="favicon"/>}
    </div>
  );
};

export default TabIcon;