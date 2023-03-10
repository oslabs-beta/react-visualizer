/* eslint-disable */
// @ts-nocheck

const extensions = 'https://developer.chrome.com/docs/extensions';
const webstore = 'https://developer.chrome.com/docs/webstore';


chrome.runtime.onInstalled.addListener(async()=> {
  chrome.contextMenus.create({
    title: "C-React",
    id:"cReactContextMenu",
    contexts: ["selection"]
  });
});


chrome.contextMenus.onClicked.addListener((info, tab)=>{
  console.log("item clicked");
  console.log(info.menuItemId);
  if(info.menuItemId == "cReactContextMenu"){
    console.log('onclikc working')
    chrome.windows.create({
      url: ('panel.html'),
    })
  }
});

let connections = {};

// Background page -- background.js
chrome.runtime.onConnect.addListener(function(devToolsConnection) {
  // assign the listener function to a variable so we can remove it later
  var devToolsListener = function(message, sender, sendResponse) {
      // Inject a content script into the identified tab
      console.log(message.tabId);
      connections[message.tabId] = devToolsConnection;
      console.log(message.scriptToInject);
      chrome.scripting.executeScript(
          // message.tabId,
          // { file: message.scriptToInject }
          {
            tabId: message.tabId ,
            files : [message.scriptToInject],
          }
          ).then(() => console.log("script injected"));
      console.log(message.tabId);
  }
  // add the listener
  devToolsConnection.onMessage.addListener(devToolsListener);

  devToolsConnection.onDisconnect.addListener(function() {
       //devToolsConnection.onMessage.removeListener(devToolsListener);
       var tabs = Object.keys(connections);
        for (var i=0, len=tabs.length; i < len; i++) {
          if (connections[tabs[i]] == devToolsConnection) {
            delete connections[tabs[i]]
            break;
          }
        }
  });
});


// Receive message from content script and relay to the devTools page for the
// current tab
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // Messages from content scripts should have sender.tab set
    if (sender.tab) {
      console.log(sender.tab.id);
      var tabId = sender.tab.id;
      if (tabId in connections) {
        connections[tabId].postMessage(request);
      } else {
        console.log("Tab not found in connection list.");
      }
    } else {
      console.log("sender.tab not defined.");
    }
    return true;
});

