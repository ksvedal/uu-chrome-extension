chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
    await chrome.sidePanel.setOptions({
      tabId,
      path: 'sidepanel.html',
      enabled: true
    });
});

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'update') {
      const currentVersion = chrome.runtime.getManifest().version;
      const previousVersion = details.previousVersion;
      if (currentVersion !== previousVersion) {
          // Notify user about the update or show changelog
          console.log(`Updated from ${previousVersion} to ${currentVersion}`);
          // Create a notification
          chrome.notifications.create('updateNotification', {
              type: 'basic',
              iconUrl: '../scan.png', // replace with your notification icon
              title: 'Extension Updated', 
              message: `Updated from ${previousVersion} to ${currentVersion}`
          });
      }
  }
});

//------------------------------------------------------------------------------------------------
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.url) {
    fetch('http://localhost:8080/computedProperties', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: message.url }),
    })
    .then((response) => response.json())
    .then((result) => { 
      sendResponse(result)
    })
    .catch((error) => {
      console.error('Error:', error.message);
      sendResponse({ error: error.message });
    });

    return true
  }
});       