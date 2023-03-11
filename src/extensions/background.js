/* eslint-disable */
// @ts-nocheck

const extensions = 'https://developer.chrome.com/docs/extensions';
const webstore = 'https://developer.chrome.com/docs/webstore';

chrome.runtime.onInstalled.addListener(async () => {
  chrome.contextMenus.create({
    id: 'cReactContextMenu',
    title: 'C-React',
    contexts: ['selection'],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  console.log('item clicked');
  console.log(info.menuItemId);
  if (info.menuItemId == 'cReactContextMenu') {
    console.log('onclikc working');
    chrome.windows.create({
      url: 'panel.html',
    });
    // chrome.windows.create({
    //   type: 'panel',
    //   left: 0,
    //   top: 0,
    //   width: 1000,
    //   height: 1000,
    //   url: chrome.runtime.getURL('panel.html'),
    // })
  }
});

chrome.runtime.onConnect.addListener(function (port) {
  let name = 'knockknock';
});

// function injectCode(tabId) {
//   chrome.scripting.executeScript({
//     target: { tabId: tabId },
//     files: ['/injectScript.js'],
//   });
// }

// // Background page -- background.js
// chrome.runtime.onConnect.addListener(function (devToolsConnection) {
//   // assign the listener function to a variable so we can remove it later
//   var devToolsListener = function (message, sender, sendResponse) {
//     // Inject a content script into the identified tab
//     console.log(message.tabId);
//     chrome.scripting.executeScript(message.tabId, {
//       file: message.scriptToInject,
//     });
//   };
//   // add the listener
//   devToolsConnection.onMessage.addListener(devToolsListener);

//   devToolsConnection.onDisconnect.addListener(function () {
//     devToolsConnection.onMessage.removeListener(devToolsListener);
//   });
// });

// chrome.runtime.onConnect.addListener(function (devToolsConnection) {
//   // assign the listener function to a variable so we can remove it later
//   var devToolsListener = function (message, sender, sendResponse) {
//     // Inject a content script into the identified tab
//     console.log(message.tabId);
//     connections[message.tabId] = devToolsConnection;
//     chrome.scripting
//       .executeScript({
//         tabId: message.tabId,
//         target: { tabId: message.tabId },
//         files: [message.scriptToInject],
//       })
//       .then(() => console.log('script injected'));
//     console.log(message.tabId);
//   };
//   // add the listener
//   devToolsConnection.onMessage.addListener(devToolsListener);

//   devToolsConnection.onDisconnect.addListener(function () {
//     //devToolsConnection.onMessage.removeListener(devToolsListener);
//     var tabs = Object.keys(connections);
//     for (var i = 0, len = tabs.length; i < len; i++) {
//       if (connections[tabs[i]] == devToolsConnection) {
//         delete connections[tabs[i]];
//         break;
//       }
//     }
//   });
// });

//

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   // Messages from content scripts should have sender.tab set
//   if (sender.tab) {
//     console.log('this is sender id in background js ' + sender.tab.id);
//     var tabId = sender.tab.id;
//     if (tabId in connections) {
//       connections[tabId].postMessage(request);
//     } else {
//       console.log('Tab not found in connection list.');
//     }
//   } else {
//     console.log('sender.tab not defined.');
//   }
//   return true;
// });

// chrome.browserAction.onClicked.addListener(function () {
//   chrome.tabs.query(
//     {
//       currentWindow: true,
//       active: true,
//       // Select active tab of the current window
//     },
//     function (tab) {
//       chrome.tabs.sendMessage(
//         // Send a message to the content script
//         tab[0].id,
//         { line: 'countparas' }
//       );
//     }
//   );
// });

//new 3/11/23
let id = null;
const connections = {};

chrome.runtime.onConnect.addListener((devToolsConnection) => {
  // Assign the listener function to a variable so we can remove it later
  let devToolsListener = (message, sender, sendResponse) => {
    if (message.name == 'init') {
      id = message.tabId;
      connections[id] = devToolsConnection;
      // Send a message back to DevTools
      console.log('one line above connections[id].postMessage("Connected!")');
      connections[id].postMessage('Connected!');
    }
  };

  // Listen to messages sent from the DevTools page
  devToolsConnection.onMessage.addListener(devToolsListener);

  devToolsConnection.onDisconnect.addListener(() => {
    devToolsConnection.onMessage.removeListener(devToolsListener);
  });
});

// var source = new EventSource('http://localhost:3001/stream');
// source.addEventListener(
//   'open',
//   function (e) {
//     // send the information to the panel
//     connections[id].postMessage({
//       name: 'init',
//       tabId: id,
//     });
//     console.log('Connection to the server established');
//   },
//   false
// );

// source.onmessage = function (e) {
//   console.log('Received message from server: ', e.data);
//   // send the information to the panel
//   connections[id].postMessage({
//     name: 'init',
//     tabId: id,
//   });

//   chrome.runtime.sendMessage({ data: e.data, log: e.log });
//   // document.getElementById("content").innerHTML += e.data + "<br/>";
// };
