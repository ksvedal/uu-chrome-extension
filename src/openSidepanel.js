//Might not work with typescript yet :(

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
    await chrome.sidePanel.setOptions({
      tabId,
      path: 'sidebar.html',
      enabled: true
    });
});


chrome.action.onClicked.addListener((tab) => {
  const htmlFilePath = chrome.runtime.getURL('htmlTableBar.html');
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: openHtmlFileInNewTab,
    args: [htmlFilePath]
  });
});

function openHtmlFileInNewTab(htmlFilePath) {
  chrome.tabs.create({ url: htmlFilePath });
}