/* eslint-disable */
// @ts-nocheck

chrome.devtools.panels.create(
  'C-React',
  'assets/C_React_Logo.png',
  'Panel.html',
  () => {
    // code invoked on panel creation
  }
);

chrome.devtools.panels.elements.createSidebarPane('Tree', (sidebar) => {
  // sidebar initialization code here
  console.log('testing if tree sidebar is working ');
  sidebar.setObject({ some_data: 'Some data to show' });
});

chrome.devtools.panels.elements.createSidebarPane('Performance', (sidebar) => {
  // sidebar initialization code here
  console.log('testing if performance sidebar is working ');
  sidebar.setObject({ some_data: 'Some data to show' });
});

// Create a connection to the background page
var backgroundPageConnection = chrome.runtime.connect({
  name: "devtools-page"
});

backgroundPageConnection.onMessage.addListener(function (message) {
  // Handle responses from the background page, if any
  console.log(message);
});

// Relay the tab ID to the background page
backgroundPageConnection.postMessage({
  tabId: chrome.devtools.inspectedWindow.tabId,
  scriptToInject: "contentScript.js"
});
