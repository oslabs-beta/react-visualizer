// /* eslint-disable */
// // @ts-nocheck

chrome.devtools.panels.create(
  'C-React',
  'assets/C_React_Logo.png',
  'Panel.html',
  () => {
    // code invoked on panel creation
  }
);

// Create a connection to the background page - long live
var backgroundPageConnection = chrome.runtime.connect({
  name: 'devtools-page',
});

// Relay the tab ID to the background page
chrome.runtime.sendMessage({
    tabId: chrome.devtools.inspectedWindow.tabId,
    scriptToInject: 'public/content.bundle.js'
});


//listening to the background page for the one time incoming message
backgroundPageConnection.onMessage.addListener(function (message) {
  // Handle responses from the background page, if any
  console.log(message);
});



