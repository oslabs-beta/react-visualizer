/* eslint-disable */
// @ts-nocheck

const extensions = 'https://developer.chrome.com/docs/extensions';
const webstore = 'https://developer.chrome.com/docs/webstore';

//creating a context menu 
chrome.runtime.onInstalled.addListener(async () => {
  chrome.contextMenus.create({
    title: 'C-React',
    id: 'cReactContextMenu',
    contexts: ['selection'],
  });
});

//opening up a new window when the cReact is selected
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId == 'cReactContextMenu') {
    chrome.windows.create({
      url: 'panel.html',
    });
  }
});

//
var openCount = 0;
chrome.runtime.onConnect.addListener(function (port) {
  if (port.name == 'devtools-page') {
    openCount++;
    port.onDisconnect.addListener(function (port) {
      openCount--;
    });
  }
});


let connections = {};
chrome.runtime.onConnect.addListener(function (devToolsConnection) {
  // assign the listener function to a variable so we can remove it later
  if (devToolsConnection.name == 'devtools-page') {
    var devToolsListener = function (message, sender, sendResponse) {
      // Inject a content script into the identified tab
      connections[message.tabId] = devToolsConnection;
      //expecting tabId and file:scriptToInject
      console.log(connections[message.tabId]);
      chrome.scripting
        .executeScript(
          {
            //target tab
            target: { tabId: message.tabId },
            //inject the content script to above tab
            files: [message.scriptToInject],
          }
        )
        .then(() => console.log('script injected'));
    };

    // add the listener to the one time message - postMessage
    devToolsConnection.onMessage.addListener(devToolsListener);

    // when we are disconnected, we remove the listener
    devToolsConnection.onDisconnect.addListener(function () {
      devToolsConnection.onMessage.removeListener(devToolsListener);
      var tabs = Object.keys(connections);
      for (var i = 0, len = tabs.length; i < len; i++) {
        if (connections[tabs[i]] == devToolsConnection) {
          //delete the connection tab
          delete connections[tabs[i]];
          break;
        }
      }
    });
  }
});

// Message listener for content script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // Messages from content scripts should have sender.tab set
  if (sender.tab) {
    console.log(sender.tab.id);
    var tabId = sender.tab.id;
    if (tabId in connections) {
      connections[tabId].postMessage(request);
    } else {
      console.log('Tab not found in connection list.');
    }
  } else {
    console.log('sender.tab not defined.');
  }
  return true;
});
