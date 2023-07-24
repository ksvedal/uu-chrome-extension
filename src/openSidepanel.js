// //Might not work with typescript yet :(

// chrome.sidePanel
//   .setPanelBehavior({ openPanelOnActionClick: true })
//   .catch((error) => console.error(error));

// chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
//     await chrome.sidePanel.setOptions({
//       tabId,
//       path: 'sidebar.html',
//       enabled: true
//     });
// });

// chrome.runtime.onInstalled.addListener((details) => {
//   if (details.reason === 'update') {
//       const currentVersion = chrome.runtime.getManifest().version;
//       const previousVersion = details.previousVersion;
//       if (currentVersion !== previousVersion) {
//           // Notify user about the update or show changelog
//           console.log(`Updated from ${previousVersion} to ${currentVersion}`);
//           // Create a notification
//           chrome.notifications.create('updateNotification', {
//               type: 'basic',
//               iconUrl: '../scan.png', // replace with your notification icon
//               title: 'Extension Updated', 
//               message: `Updated from ${previousVersion} to ${currentVersion}`
//           });
//       }
//   }
// });




// export function setSidePanelBehaviour() {
//   chrome.sidePanel
//     .setPanelBehavior({ openPanelOnActionClick: true })
//     .catch((error) => console.error(error));
// }

// export async function setSidePanelOptions(tabId, info, tab) {
//   await chrome.sidePanel.setOptions({
//     tabId,
//     path: 'sidebar.html',
//     enabled: true
//   });
// }

// export function createNotification(details) {
//   if (details.reason === 'update') {
//     const currentVersion = chrome.runtime.getManifest().version;
//     const previousVersion = details.previousVersion;
//     if (currentVersion !== previousVersion) {
//       console.log(`Updated from ${previousVersion} to ${currentVersion}`);
//       chrome.notifications.create('updateNotification', {
//         type: 'basic',
//         iconUrl: '../scan.png',
//         title: 'Extension Updated', 
//         message: `Updated from ${previousVersion} to ${currentVersion}`
//       });
//     }
//   }
// }

// chrome.tabs.onUpdated.addListener(setSidePanelOptions);
// chrome.runtime.onInstalled.addListener(createNotification);
// setSidePanelBehaviour();

export function setSidePanelBehaviour() {
  if (typeof chrome !== 'undefined' && chrome.sidePanel) {
    chrome.sidePanel
      .setPanelBehavior({ openPanelOnActionClick: true })
      .catch((error) => console.error(error));
  }
}

export async function setSidePanelOptions(tabId, info, tab) {
  if (typeof chrome !== 'undefined' && chrome.sidePanel) {
    await chrome.sidePanel.setOptions({
      tabId,
      path: 'sidebar.html',
      enabled: true
    });
  }
}

// export function createNotification(details) {
//   if (details.reason === 'update' && typeof chrome !== 'undefined' && chrome.runtime) {
//     const currentVersion = chrome.runtime.getManifest().version;
//     const previousVersion = details.previousVersion;
//     if (currentVersion !== previousVersion) {
//       console.log(`Updated from ${previousVersion} to ${currentVersion}`);
//       chrome.notifications.create('updateNotification', {
//         type: 'basic',
//         iconUrl: '../scan.png',
//         title: 'Extension Updated', 
//         message: `Updated from ${previousVersion} to ${currentVersion}`
//       });
//     }
//   }
// }

export function createNotification(details) {
  if (details.reason === 'update' && typeof chrome !== 'undefined' && chrome.runtime) {
    const currentVersion = chrome.runtime.getManifest().version;
    const previousVersion = details.previousVersion;
    if (currentVersion !== previousVersion) {
      console.log(`Updated from ${previousVersion} to ${currentVersion}`);
      chrome.runtime.notifications.create('updateNotification', {
        type: 'basic',
        iconUrl: '../scan.png',
        title: 'Extension Updated', 
        message: `Updated from ${previousVersion} to ${currentVersion}`
      });
    }
  }
}


