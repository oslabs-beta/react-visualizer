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

let openCount = 0;
chrome.runtime.onConnect.addListener(function (port) {
  if (port.name == 'devtools-page') {
    openCount++;
    port.onDisconnect.addListener(function (port) {
      openCount--;
    });
  }
});

let connections = {};
const treeOfTrees = {};

chrome.tabs.onActivated.addListener((activeInfo) => {
  //chrome.runtime.reload();
  let selectedTabId = activeInfo.tabId;

  // chrome.scripting
  //   .executeScript({
  //     //target tab
  //     // target: selectedTabId,
  //     target: { tabId: selectedTabId },
  //     //inject the content script to above tab
  //     files: ['contentScript.js'],
  //   })
  //   .then(() => console.log('script injected again'));

  chrome.runtime.onConnect.addListener(function (devToolsConnection) {
    // assign the listener function to a variable so we can remove it later
    if (devToolsConnection.name == 'devtools-page') {
      var devToolsListener = function (message, sender, sendResponse) {
        // Inject a content script into the identified tab
        //new 4/13
        connections[selectedTabId] = devToolsConnection;
        //expecting tabId and file:scriptToInject
        chrome.scripting
          .executeScript({
            //target tab
            target: { tabId: selectedTabId },
            //inject the content script to above tab
            files: [message.scriptToInject],
          })
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

  chrome.runtime.onMessage.addListener((message) => {
    // Get the tree object from the message
    if (message.tree) {
      //set tab as key, tree object as value
      treeOfTrees[selectedTabId] = message.tree;
      // chrome.storage.session.set({ key: treeOfTrees }).then(() => {
      //   console.log('setting chrome storage to trees in first render');
      //   console.log(treeOfTrees);
      // });
      chrome.runtime.sendMessage({ domTreeObj: treeOfTrees });
    }
    if (message.nestedObject) {
      treeOfTrees[selectedTabId] = message.nestedObject;
      //set updated tree in chrome storage
      chrome.storage.local.set({ key: treeOfTrees }).then(() => {
        console.log('setting chrome storage to tres in second render');
        console.log(treeOfTrees);
      });
      // chrome.runtime.sendMessage({ fromBGtree2: treeOfTrees });
    }
    if (message.storedVitals) {
      chrome.runtime.sendMessage({ storedVitalsfromBG: message.storedVitals });
    }
  });
});

// const port = chrome.runtime.connect({ name: 'knockknock' });
// port.postMessage({ joke: 'Knock knock' });
// console.log(port.name);
// port.onMessage.addListener(function (msg) {
//   console.log('msg in content.js', msg);
//   if (msg.question === "Who's there?")
//     port.postMessage({ treeData: treeOfTrees });
//   else if (msg.question === 'Madame who?')
//     port.postMessage({ answer: 'Madame... Bovary' });
// });
