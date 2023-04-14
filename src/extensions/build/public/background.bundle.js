/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!**************************************!*\
  !*** ./src/extensions/background.js ***!
  \**************************************/
__webpack_require__.r(__webpack_exports__);
/* eslint-disable */
// @ts-nocheck

class objOfTrees {
  constructor(obj) {
    this.tree = obj;
  }

  getTree() {
    return this.tree;
  }

  // createNewTree() {;
  //   const newTree = new objOfTrees();
  //   return newTree.getTree();
  // }
}

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

// chrome.runtime.onConnect.addListener(function (devToolsConnection) {
//   // assign the listener function to a variable so we can remove it later
//   if (devToolsConnection.name == 'devtools-page') {
//     var devToolsListener = function (message, sender, sendResponse) {
//       // Inject a content script into the identified tab
//       connections[message.tabId] = devToolsConnection;
//       //expecting tabId and file:scriptToInject
//       console.log(connections[message.tabId]);
//       chrome.scripting
//         .executeScript({
//           //target tab
//           target: { tabId: message.tabId },
//           //inject the content script to above tab
//           files: [message.scriptToInject],
//         })
//         .then(() => console.log('script injected'));
//     };

//     // add the listener to the one time message - postMessage
//     devToolsConnection.onMessage.addListener(devToolsListener);

//     // when we are disconnected, we remove the listener
//     devToolsConnection.onDisconnect.addListener(function () {
//       devToolsConnection.onMessage.removeListener(devToolsListener);
//       var tabs = Object.keys(connections);
//       for (var i = 0, len = tabs.length; i < len; i++) {
//         if (connections[tabs[i]] == devToolsConnection) {
//           //delete the connection tab
//           delete connections[tabs[i]];
//           break;
//         }
//       }
//     });
//   }
// });

//4/10
// remove the connection for a tab when the tab is closed
// chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
//   if (tabId in connections) {
//     delete connections[tabId];
//   }
// });
//end 4 10

// chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//   var currentTabId = tabs[0].id;
//   console.log('Current tab ID in background query:', currentTabId);
// });

let treeOfTrees = {};

chrome.tabs.onActivated.addListener((activeInfo) => {
  //chrome.runtime.reload();
  let selectedTabId = activeInfo.tabId;

  //testing 4/12
  chrome.runtime.onConnect.addListener(function (devToolsConnection) {
    // assign the listener function to a variable so we can remove it later
    if (devToolsConnection.name == 'devtools-page') {
      var devToolsListener = function (message, sender, sendResponse) {
        // Inject a content script into the identified tab
        // connections[message.tabId] = devToolsConnection;
        //new 4/13
        connections[selectedTabId] = devToolsConnection;
        //expecting tabId and file:scriptToInject
        chrome.scripting
          .executeScript({
            //target tab
            // target: selectedTabId,
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

  //4/12

  chrome.runtime.onMessage.addListener((message) => {
    // Get the tree object from the message
    if (message.tree) {
      // console.log('selected TabId ' + selectedTabId);
      treeOfTrees[selectedTabId] = message.tree;
      // console.log('this is treeOfTrees');
      chrome.storage.local.set({ key: treeOfTrees }).then(() => {
        console.log('setting chrome storage to ');
        console.log(treeOfTrees);
      });
      // chrome.runtime.sendMessage({ fromBGtree1: treeOfTrees });
    }
    if (message.nestedObject) {
      treeOfTrees[selectedTabId] = message.nestedObject;
      chrome.storage.local.set({ key: treeOfTrees }).then(() => {
        console.log('setting chrome storage to ' + treeOfTrees);
      });
      // chrome.runtime.sendMessage({ fromBGtree2: treeOfTrees });
    }
    if (message.storedVitals) {
      console.log('storing vitals');
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

/******/ })()
;
//# sourceMappingURL=background.bundle.js.map