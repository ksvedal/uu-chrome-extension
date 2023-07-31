import React, { useEffect, useState } from 'react';

const TabIcon: React.FC = () => {
  const [favicon, setFavicon] = useState<string>('');

  useEffect(() => {
    // Function to update favicon
    const updateFavicon = (tabId: number, attempts = 0) => {
      if (!chrome.tabs) {
        console.error('Chrome tabs API is not available');
        return;
      }

      chrome.tabs.get(tabId, (tab) => {
        if (chrome.runtime.lastError) {
          console.error(`Error getting tab: ${chrome.runtime.lastError.message}`);
          return;
        }

        if (!tab.url) {
          console.error(`Tab has no URL`);
          return;
        }

        let url = tab.url.replace(/#.*$/, ''); // drop #hash
        let faviconUrl: string;
        let delay;

        if (tab.favIconUrl && tab.favIconUrl != ''
          && tab.favIconUrl.indexOf('chrome://favicon/') === -1) {
          // favicon appears to be a normal url
          faviconUrl = tab.favIconUrl;
          delay = 0;
        } else {
          // couldn't obtain favicon as a normal url, try using a favicon service
          faviconUrl = 'https://s2.googleusercontent.com/s2/favicons?domain_url=' + url;
          delay = 0;
        }

        setTimeout(() => {
          if (faviconUrl !== 'chrome://favicon/' && faviconUrl !== '') {
            setFavicon(faviconUrl);
          } else if (attempts < 10) {
            // If the favicon is not ready yet and we've made less than 10 attempts, retry after 500ms
            setTimeout(() => updateFavicon(tabId, attempts + 1), 500);
          }
        }, delay);
      });
    }

    const handleTabUpdate = (tabId: number, changeInfo: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) => {
      if (tab.active && changeInfo.url && tabId !== undefined) {
        updateFavicon(tabId);
      }
    }

    // Initial favicon update
    if (!chrome.tabs) {
      console.error('Chrome tabs API is not available');
      return;
    }

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (chrome.runtime.lastError) {
        console.error(`Error querying tabs: ${chrome.runtime.lastError.message}`);
        return;
      }

      if (tabs[0].id !== undefined) {
        updateFavicon(tabs[0].id);
      }
    });

    // Listener for tab updates
    if (!chrome.tabs.onUpdated.hasListener(handleTabUpdate)) {
      chrome.tabs.onUpdated.addListener(handleTabUpdate);
    }

    // Remove listener when component unmounts
    return () => {
      if (chrome.tabs.onUpdated.hasListener(handleTabUpdate)) {
        chrome.tabs.onUpdated.removeListener(handleTabUpdate);
      }
    }
  }, []);

  return (
    <div>
      {favicon && <img src={favicon} alt="favicon" />}
    </div>
  );
};

export default TabIcon;