/* eslint-disable */
// @ts-nocheck

const extensions = 'https://developer.chrome.com/docs/extensions';
const webstore = 'https://developer.chrome.com/docs/webstore';


chrome.runtime.onInstalled.addListener(async()=> {
  chrome.contextMenus.create({
    "id": "cReactContextMenu",
    "title": "C-React",
    //"contexts": ["selection"]
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

// Background page -- background.js
chrome.runtime.onConnect.addListener(function(devToolsConnection) {
  // assign the listener function to a variable so we can remove it later
  var devToolsListener = function(message, sender, sendResponse) {
      // Inject a content script into the identified tab
      console.log(message.tabId);
      chrome.scripting.executeScript(message.tabId,
          { file: message.scriptToInject });
  }
  // add the listener
  devToolsConnection.onMessage.addListener(devToolsListener);

  devToolsConnection.onDisconnect.addListener(function() {
       devToolsConnection.onMessage.removeListener(devToolsListener);
  });
});


