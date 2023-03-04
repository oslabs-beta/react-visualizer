/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/extensions/background.js":
/*!**************************************!*\
  !*** ./src/extensions/background.js ***!
  \**************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* eslint-disable */\n// @ts-nocheck\n\nconst extensions = 'https://developer.chrome.com/docs/extensions';\nconst webstore = 'https://developer.chrome.com/docs/webstore';\n\nchrome.action.onClicked.addListener(async (tab) => {\n  if (tab.url.startsWith(extensions) || tab.url.startsWith(webstore)) {\n    // Retrieve the action badge to check if the extension is 'ON' or 'OFF'\n    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });\n    // Next state will always be the opposite\n    const nextState = prevState === 'ON' ? 'OFF' : 'ON'\n\n    // Set the action badge to the next state\n    await chrome.action.setBadgeText({\n      tabId: tab.id,\n      text: nextState,\n    });\n\n    if (nextState === \"ON\") {\n        // Insert the CSS file when the user turns the extension on\n        await chrome.scripting.insertCSS({\n          files: [\"focus-mode.css\"],\n          target: { tabId: tab.id },\n        });\n      } else if (nextState === \"OFF\") {\n        // Remove the CSS file when the user turns the extension off\n        await chrome.scripting.removeCSS({\n          files: [\"focus-mode.css\"],\n          target: { tabId: tab.id },\n        });\n      }\n    }\n  });\n\n\n//# sourceURL=webpack://react-visualizer/./src/extensions/background.js?");

/***/ })

/******/ 	});
/************************************************************************/
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/extensions/background.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;