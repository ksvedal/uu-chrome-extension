import { post } from '../src/client/httpClient'

setSidePanelBehaviour();
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => setSidePanelOptions(tabId));
chrome.runtime.onInstalled.addListener((details) => createNotification(details));


export function setSidePanelBehaviour() {
  if (typeof chrome !== 'undefined' && chrome.sidePanel) {
    chrome.sidePanel
      .setPanelBehavior({ openPanelOnActionClick: true })
      .catch((error) => console.error(error));
  }
}

export async function setSidePanelOptions(tabId) {
  if (typeof chrome !== 'undefined' && chrome.sidePanel) {
    await chrome.sidePanel.setOptions({
      tabId,
      path: 'sidepanel.html',
      enabled: true
    });
  }
}

  export function createNotification(details) {
  if (details.reason === 'update' && typeof chrome !== 'undefined' && chrome.runtime) {
    const currentVersion = chrome.runtime.getManifest().version;
    const previousVersion = details.previousVersion;
    if (currentVersion !== previousVersion) {
      chrome.notifications.create('updateNotification', {
        type: 'basic',
        iconUrl: '../scan.png',
        title: 'Extension Updated', 
        message: `Updated from ${previousVersion} to ${currentVersion}`
      });
    }
  }
}

//------------------------------------------------------------------------------------------------
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.url) {
      const endpoint = '/computedProperties';
      const dataToSend = { url: message.url };

      post(endpoint, dataToSend)
          .then((result) => {
              sendResponse(result);
          })
          .catch((error) => {
              console.error('Error:', error.message);
              sendResponse({ error: error.message });
          });

      return true;
  }
});
