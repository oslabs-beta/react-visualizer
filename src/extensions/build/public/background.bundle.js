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

const extensions = 'https://developer.chrome.com/docs/extensions';
const webstore = 'https://developer.chrome.com/docs/webstore';


chrome.runtime.onInstalled.addListener(async()=> {
  chrome.contextMenus.create({
    "id": "cReactContextMenu",
    "title": "C-React",
    "contexts": ["selection"]
  });
});


chrome.contextMenus.onClicked.addListener((info, tab)=>{
  console.log("item clicked");
  console.log(info);
  if(info.menuItemId == "cReactContextMenu"){
    console.log('onclikc working')
    chrome.windows.create({
      type: 'panel',
      left: 0,
      top: 0,
      width: 1000,
      height: 1000,
      url: chrome.runtime.getURL('panel.html'),
    })
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



/******/ })()
;
//# sourceMappingURL=background.bundle.js.map