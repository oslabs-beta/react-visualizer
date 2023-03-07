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


chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    "id": "sampleContextMenu",
    "title": "Sample Context Menu",
    "contexts": ["selection"]
  });
});
// chrome.action.onClicked.addListener(async (tab) => {
//   console.log(
//     'background script running'
//   )
  // if (tab.url.startsWith(extensions) || tab.url.startsWith(webstore)) {
  //   // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
  //   const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
  //   // Next state will always be the opposite
  //   const nextState = prevState === 'ON' ? 'OFF' : 'ON'

  //   // Set the action badge to the next state
  //   await chrome.action.setBadgeText({
  //     tabId: tab.id,
  //     text: nextState,
  //   });

  //   if (nextState === "ON") {
  //       // Insert the CSS file when the user turns the extension on
  //       await chrome.scripting.insertCSS({
  //         files: ["focus-mode.css"],
  //         target: { tabId: tab.id },
  //       });
  //     } else if (nextState === "OFF") {
  //       // Remove the CSS file when the user turns the extension off
  //       await chrome.scripting.removeCSS({
  //         files: ["focus-mode.css"],
  //         target: { tabId: tab.id },
  //       });
  //     }
  //   }
  // });

/******/ })()
;
//# sourceMappingURL=background.bundle.js.map