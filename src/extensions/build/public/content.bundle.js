/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/web-vitals-reporter/src/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/web-vitals-reporter/src/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createApiReporter": () => (/* binding */ createApiReporter),
/* harmony export */   "getDeviceInfo": () => (/* binding */ getDeviceInfo)
/* harmony export */ });
/**
 * @typedef {Object<string,any>} Result
 * @typedef {import('web-vitals').Metric | Object<string,any>} Metric
 * @typedef {{ effectiveType: 'slow-2g' | '2g' | '3g' | '4g', rtt: number, downlink: number }} NetworkInformation
 *
 * @typedef {object} CreateApiReporterOptions
 * @prop {object} [initial]
 * @prop {(metric: Metric, result: Result) => Result} [mapMetric]
 * @prop {(result: Result) => Result | void} [beforeSend]
 * @prop {(url: string, result: Result) => any} [onSend]
 */

/**
 * Create Web Vitals API reporter, that accepts `Metric` values and sends it to `url`
 * using `navigator.sendBeacon` when available or fallbacks back to XMLHttpRequest.
 *
 * The function sends request only once.
 * Use `onSend` to implement a custom logic.
 *
 * @param {string} url
 * @param {CreateApiReporterOptions} [opts]
 * @return {(metric: Metric) => void}
 */

function createApiReporter(url, opts = {}) {
  let isSent = false
  let isCalled = false
  let result = /** @type {Result} */ ({ id: generateUniqueId(), ...opts.initial })

  const sendValues = () => {
    if (isSent) return // data is already sent
    if (!isCalled) return // no data collected

    result.duration = now()
    if (opts.beforeSend) {
      const newResult = opts.beforeSend(result)
      if (newResult) result = { ...result, ...newResult }
    }
    isSent = true
    if (opts.onSend) {
      opts.onSend(url, result)
    } else {
      if (typeof navigator === 'undefined') return
      if (navigator.sendBeacon) return navigator.sendBeacon(url, JSON.stringify(result))
      const client = new XMLHttpRequest()
      client.open('POST', url, false) // third parameter indicates sync xhr
      client.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8')
      client.send(JSON.stringify(result))
    }
  }

  const mapMetric =
    opts.mapMetric ||
    function (metric) {
      const isWebVital = ['FCP', 'TTFB', 'LCP', 'CLS', 'FID'].indexOf(metric.name) !== -1
      return { [metric.name]: isWebVital ? round(metric.value, metric.name === 'CLS' ? 4 : 0) : metric.value }
    }

  /** @param {Metric} metric */
  const report = (metric) => {
    if (!isCalled) isCalled = true
    result = { ...result, ...mapMetric(metric, result) }
  }

  // should be the last call to capture latest CLS
  setTimeout(() => {
    // Safari does not fire "visibilitychange" on the tab close
    // So we have 2 options: loose Safari data, or loose LCP/CLS that depends on "visibilitychange" logic.
    // Current solution: if LCP/CLS supported, use `onHidden` otherwise, use `pagehide` to fire the callback in the end.
    //
    // More details: https://github.com/treosh/web-vitals-reporter/issues/3
    const supportedEntryTypes = (PerformanceObserver && PerformanceObserver.supportedEntryTypes) || []
    const isLatestVisibilityChangeSupported = supportedEntryTypes.indexOf('layout-shift') !== -1

    if (isLatestVisibilityChangeSupported) {
      const onVisibilityChange = () => {
        if (document.visibilityState === 'hidden') {
          sendValues()
          removeEventListener('visibilitychange', onVisibilityChange, true)
        }
      }
      addEventListener('visibilitychange', onVisibilityChange, true)
    } else {
      addEventListener('pagehide', sendValues, { capture: true, once: true })
    }
  })

  return report
}

/**
 * Get device information.
 * - Effective connection type: https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation
 * - Device memory: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/deviceMemory
 */

function getDeviceInfo() {
  const nav = /** @type {null | (Navigator & { deviceMemory: number, connection: NetworkInformation })} */ (typeof navigator ===
  'undefined'
    ? null
    : navigator)
  const conn = nav && nav.connection ? nav.connection : null
  return {
    url: location ? location.href : null,
    referrer: document ? document.referrer : null,
    userAgent: nav ? nav.userAgent : null,
    memory: nav ? nav.deviceMemory : undefined,
    cpus: nav ? nav.hardwareConcurrency : undefined,
    connection: conn ? { effectiveType: conn.effectiveType, rtt: conn.rtt, downlink: conn.downlink } : undefined,
  }
}

/**
 * Get time since a session started.
 */

function now() {
  const perf = typeof performance === 'undefined' ? null : performance
  return perf && perf.now ? round(perf.now()) : null
}

/**
 * Round, source: https://stackoverflow.com/a/18358056
 *
 * @param {number} val
 * @param {number} [precision]
 * @return {number}
 */

function round(val, precision = 0) {
  // @ts-ignore
  return +(Math.round(`${val}e+${precision}`) + `e-${precision}`)
}

/**
 * Generate a unique id, copied from:
 * https://github.com/GoogleChrome/web-vitals/blob/master/src/lib/generateUniqueID.ts
 */

function generateUniqueId() {
  return `v1-${Date.now()}-${Math.floor(Math.random() * (9e12 - 1)) + 1e12}`
}


/***/ }),

/***/ "./node_modules/web-vitals/dist/web-vitals.js":
/*!****************************************************!*\
  !*** ./node_modules/web-vitals/dist/web-vitals.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CLSThresholds": () => (/* binding */ w),
/* harmony export */   "FCPThresholds": () => (/* binding */ L),
/* harmony export */   "FIDThresholds": () => (/* binding */ D),
/* harmony export */   "INPThresholds": () => (/* binding */ j),
/* harmony export */   "LCPThresholds": () => (/* binding */ U),
/* harmony export */   "TTFBThresholds": () => (/* binding */ X),
/* harmony export */   "getCLS": () => (/* binding */ S),
/* harmony export */   "getFCP": () => (/* binding */ b),
/* harmony export */   "getFID": () => (/* binding */ x),
/* harmony export */   "getINP": () => (/* binding */ Q),
/* harmony export */   "getLCP": () => (/* binding */ W),
/* harmony export */   "getTTFB": () => (/* binding */ Z),
/* harmony export */   "onCLS": () => (/* binding */ S),
/* harmony export */   "onFCP": () => (/* binding */ b),
/* harmony export */   "onFID": () => (/* binding */ x),
/* harmony export */   "onINP": () => (/* binding */ Q),
/* harmony export */   "onLCP": () => (/* binding */ W),
/* harmony export */   "onTTFB": () => (/* binding */ Z)
/* harmony export */ });
var e,n,t,r,i,a=-1,o=function(e){addEventListener("pageshow",(function(n){n.persisted&&(a=n.timeStamp,e(n))}),!0)},c=function(){return window.performance&&performance.getEntriesByType&&performance.getEntriesByType("navigation")[0]},u=function(){var e=c();return e&&e.activationStart||0},f=function(e,n){var t=c(),r="navigate";return a>=0?r="back-forward-cache":t&&(r=document.prerendering||u()>0?"prerender":document.wasDiscarded?"restore":t.type.replace(/_/g,"-")),{name:e,value:void 0===n?-1:n,rating:"good",delta:0,entries:[],id:"v3-".concat(Date.now(),"-").concat(Math.floor(8999999999999*Math.random())+1e12),navigationType:r}},s=function(e,n,t){try{if(PerformanceObserver.supportedEntryTypes.includes(e)){var r=new PerformanceObserver((function(e){Promise.resolve().then((function(){n(e.getEntries())}))}));return r.observe(Object.assign({type:e,buffered:!0},t||{})),r}}catch(e){}},d=function(e,n,t,r){var i,a;return function(o){n.value>=0&&(o||r)&&((a=n.value-(i||0))||void 0===i)&&(i=n.value,n.delta=a,n.rating=function(e,n){return e>n[1]?"poor":e>n[0]?"needs-improvement":"good"}(n.value,t),e(n))}},l=function(e){requestAnimationFrame((function(){return requestAnimationFrame((function(){return e()}))}))},p=function(e){var n=function(n){"pagehide"!==n.type&&"hidden"!==document.visibilityState||e(n)};addEventListener("visibilitychange",n,!0),addEventListener("pagehide",n,!0)},v=function(e){var n=!1;return function(t){n||(e(t),n=!0)}},m=-1,h=function(){return"hidden"!==document.visibilityState||document.prerendering?1/0:0},g=function(e){"hidden"===document.visibilityState&&m>-1&&(m="visibilitychange"===e.type?e.timeStamp:0,T())},y=function(){addEventListener("visibilitychange",g,!0),addEventListener("prerenderingchange",g,!0)},T=function(){removeEventListener("visibilitychange",g,!0),removeEventListener("prerenderingchange",g,!0)},E=function(){return m<0&&(m=h(),y(),o((function(){setTimeout((function(){m=h(),y()}),0)}))),{get firstHiddenTime(){return m}}},C=function(e){document.prerendering?addEventListener("prerenderingchange",(function(){return e()}),!0):e()},L=[1800,3e3],b=function(e,n){n=n||{},C((function(){var t,r=E(),i=f("FCP"),a=s("paint",(function(e){e.forEach((function(e){"first-contentful-paint"===e.name&&(a.disconnect(),e.startTime<r.firstHiddenTime&&(i.value=Math.max(e.startTime-u(),0),i.entries.push(e),t(!0)))}))}));a&&(t=d(e,i,L,n.reportAllChanges),o((function(r){i=f("FCP"),t=d(e,i,L,n.reportAllChanges),l((function(){i.value=performance.now()-r.timeStamp,t(!0)}))})))}))},w=[.1,.25],S=function(e,n){n=n||{},b(v((function(){var t,r=f("CLS",0),i=0,a=[],c=function(e){e.forEach((function(e){if(!e.hadRecentInput){var n=a[0],t=a[a.length-1];i&&e.startTime-t.startTime<1e3&&e.startTime-n.startTime<5e3?(i+=e.value,a.push(e)):(i=e.value,a=[e])}})),i>r.value&&(r.value=i,r.entries=a,t())},u=s("layout-shift",c);u&&(t=d(e,r,w,n.reportAllChanges),p((function(){c(u.takeRecords()),t(!0)})),o((function(){i=0,r=f("CLS",0),t=d(e,r,w,n.reportAllChanges),l((function(){return t()}))})),setTimeout(t,0))})))},A={passive:!0,capture:!0},I=new Date,P=function(r,i){e||(e=i,n=r,t=new Date,k(removeEventListener),F())},F=function(){if(n>=0&&n<t-I){var i={entryType:"first-input",name:e.type,target:e.target,cancelable:e.cancelable,startTime:e.timeStamp,processingStart:e.timeStamp+n};r.forEach((function(e){e(i)})),r=[]}},M=function(e){if(e.cancelable){var n=(e.timeStamp>1e12?new Date:performance.now())-e.timeStamp;"pointerdown"==e.type?function(e,n){var t=function(){P(e,n),i()},r=function(){i()},i=function(){removeEventListener("pointerup",t,A),removeEventListener("pointercancel",r,A)};addEventListener("pointerup",t,A),addEventListener("pointercancel",r,A)}(n,e):P(n,e)}},k=function(e){["mousedown","keydown","touchstart","pointerdown"].forEach((function(n){return e(n,M,A)}))},D=[100,300],x=function(t,i){i=i||{},C((function(){var a,c=E(),u=f("FID"),l=function(e){e.startTime<c.firstHiddenTime&&(u.value=e.processingStart-e.startTime,u.entries.push(e),a(!0))},m=function(e){e.forEach(l)},h=s("first-input",m);a=d(t,u,D,i.reportAllChanges),h&&p(v((function(){m(h.takeRecords()),h.disconnect()}))),h&&o((function(){var o;u=f("FID"),a=d(t,u,D,i.reportAllChanges),r=[],n=-1,e=null,k(addEventListener),o=l,r.push(o),F()}))}))},B=0,R=1/0,H=0,N=function(e){e.forEach((function(e){e.interactionId&&(R=Math.min(R,e.interactionId),H=Math.max(H,e.interactionId),B=H?(H-R)/7+1:0)}))},O=function(){return i?B:performance.interactionCount||0},q=function(){"interactionCount"in performance||i||(i=s("event",N,{type:"event",buffered:!0,durationThreshold:0}))},j=[200,500],_=0,z=function(){return O()-_},G=[],J={},K=function(e){var n=G[G.length-1],t=J[e.interactionId];if(t||G.length<10||e.duration>n.latency){if(t)t.entries.push(e),t.latency=Math.max(t.latency,e.duration);else{var r={id:e.interactionId,latency:e.duration,entries:[e]};J[r.id]=r,G.push(r)}G.sort((function(e,n){return n.latency-e.latency})),G.splice(10).forEach((function(e){delete J[e.id]}))}},Q=function(e,n){n=n||{},C((function(){q();var t,r=f("INP"),i=function(e){e.forEach((function(e){(e.interactionId&&K(e),"first-input"===e.entryType)&&(!G.some((function(n){return n.entries.some((function(n){return e.duration===n.duration&&e.startTime===n.startTime}))}))&&K(e))}));var n,i=(n=Math.min(G.length-1,Math.floor(z()/50)),G[n]);i&&i.latency!==r.value&&(r.value=i.latency,r.entries=i.entries,t())},a=s("event",i,{durationThreshold:n.durationThreshold||40});t=d(e,r,j,n.reportAllChanges),a&&(a.observe({type:"first-input",buffered:!0}),p((function(){i(a.takeRecords()),r.value<0&&z()>0&&(r.value=0,r.entries=[]),t(!0)})),o((function(){G=[],_=O(),r=f("INP"),t=d(e,r,j,n.reportAllChanges)})))}))},U=[2500,4e3],V={},W=function(e,n){n=n||{},C((function(){var t,r=E(),i=f("LCP"),a=function(e){var n=e[e.length-1];n&&n.startTime<r.firstHiddenTime&&(i.value=Math.max(n.startTime-u(),0),i.entries=[n],t())},c=s("largest-contentful-paint",a);if(c){t=d(e,i,U,n.reportAllChanges);var m=v((function(){V[i.id]||(a(c.takeRecords()),c.disconnect(),V[i.id]=!0,t(!0))}));["keydown","click"].forEach((function(e){addEventListener(e,m,!0)})),p(m),o((function(r){i=f("LCP"),t=d(e,i,U,n.reportAllChanges),l((function(){i.value=performance.now()-r.timeStamp,V[i.id]=!0,t(!0)}))}))}}))},X=[800,1800],Y=function e(n){document.prerendering?C((function(){return e(n)})):"complete"!==document.readyState?addEventListener("load",(function(){return e(n)}),!0):setTimeout(n,0)},Z=function(e,n){n=n||{};var t=f("TTFB"),r=d(e,t,X,n.reportAllChanges);Y((function(){var i=c();if(i){var a=i.responseStart;if(a<=0||a>performance.now())return;t.value=Math.max(a-u(),0),t.entries=[i],r(!0),o((function(){t=f("TTFB",0),(r=d(e,t,X,n.reportAllChanges))(!0)}))}}))};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************************************!*\
  !*** ./src/extensions/contentScript.js ***!
  \*****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var web_vitals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! web-vitals */ "./node_modules/web-vitals/dist/web-vitals.js");
/* harmony import */ var web_vitals_reporter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! web-vitals-reporter */ "./node_modules/web-vitals-reporter/src/index.js");
/* eslint-disable */
// @ts-nocheck

/***
 * we are assuming webvitals package is installed from npm
 * To not use npm install:
 * <script type="module">
 *   import {onCLS, onFID, onLCP} from 'https://unpkg.com/web-vitals@3?module';
 * </script>
 */

//user device info

console.log((0,web_vitals_reporter__WEBPACK_IMPORTED_MODULE_1__.getDeviceInfo)());

let coreWebVitals = {};
function storeVitals() {
  //user need to interact with the page for FID to be reported
  (0,web_vitals__WEBPACK_IMPORTED_MODULE_0__.onFID)((metric) => {
    coreWebVitals.fid = Math.round(metric.value * 10000) / 10000;
    coreWebVitals.fidRating = metric.rating.toUpperCase();
  });

  //following metrics will not be reported if page was loaded in the background
  (0,web_vitals__WEBPACK_IMPORTED_MODULE_0__.onLCP)((metric) => {
    coreWebVitals.lcp = Math.round(metric.value * 10000) / 10000;
    coreWebVitals.lcpRating = metric.rating.toUpperCase();
  });
  //CLS
  (0,web_vitals__WEBPACK_IMPORTED_MODULE_0__.onCLS)((metric) => {
    coreWebVitals.cls = Math.round(metric.value * 10000) / 10000;
    coreWebVitals.clsRating = metric.rating.toUpperCase();
  });
  //FCP
  (0,web_vitals__WEBPACK_IMPORTED_MODULE_0__.onFCP)((metric) => {
    coreWebVitals.fcp = Math.round(metric.value * 10000) / 10000;
    coreWebVitals.fcpRating = metric.rating.toUpperCase();
  });
  //TTFB
  (0,web_vitals__WEBPACK_IMPORTED_MODULE_0__.onTTFB)((metric) => {
    coreWebVitals.ttfb = Math.round(metric.value * 10000) / 10000;
    coreWebVitals.ttfbRating = metric.rating.toUpperCase();
  });
  return coreWebVitals;
}
//storeVitals();

/**
 * @param {DOM node}
 * @return {treeWalker}
 */

const createWalker = (node) =>
  document.createTreeWalker(node, NodeFilter.SHOW_ELEMENT, walkerFilter);

const walkerFilter = {
  acceptNode(node) {
    if (
      node.nodeName.toLowerCase() === 'script' ||
      node.nodeName.toLowerCase() === 'noscript' ||
      node.nodeName.toLowerCase() === 'link' ||
      node.nodeName.toLowerCase() === 'style' ||
      node.nodeName.toLowerCase() === 'img' ||
      node.nodeName.toLowerCase() === 'iframe' ||
      node.nodeName.toLowerCase() === 'text' ||
      node.nodeName.toLowerCase() === 'tspan' ||
      node.tagName.toLowerCase() == 'svg'
    )
      return NodeFilter.FILTER_REJECT;
    else return NodeFilter.FILTER_ACCEPT;
  },
};

/**
 * Take properties of a DOM node and convert them to attributes for D3Node
 * @param {DOM node} DOM node
 * @return an object representing the attributes for D3Node.
 */
//TODO: decide what attributes to add to d3Node

function getAttributes(node) {
  return { type: node.className || node.nodeName };
}

/**
 * Get and return the children nodes of the node corresponding to a tree walker
 * @param {treeWalker} walker
 * @return an array of D3nodes that are children of the node corresponding to the walker
 */
function getChildren(walker) {
  let d3Children = []; //declare an array of d3nodes
  let childNode = walker.firstChild();

  //find all children of walker.currentNode
  while (childNode) {
    //convert walker to D3node
    let D3Node = createD3Node(walker);
    let childWalker = createWalker(walker.currentNode);
    //if the child node has children, recursively call the getChildren and assign the children to d3Node
    if (childNode.children.length > 0)
      D3Node.children = getChildren(childWalker);
    //add the newly created D3Node to the children array
    d3Children.push(D3Node);
    //walker move to the next sibling and reassign the childNode to the sibling node
    childNode = walker.nextSibling();
  }

  return d3Children;
}

/** Convert a walker to a D3 tree Node
 * @param {treeWalker} walker
 * @return {} node for D3 tree
 */
function createD3Node(walker) {
  //get the node corresponding to the walker object
  const node = walker.currentNode;
  //initialize and a new D3Node that will be returned later
  let D3Node = {};
  D3Node.name = node.nodeName;
  D3Node.attributes = getAttributes(node);
  return D3Node;
}

/** Traverse the DOM with the initial tree walker
 * @param {treeWalker} walker
 * @returns {} the root node of d3 Tree
 */
function grabData() {
  const root = document.body;
  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_ELEMENT,
    walkerFilter
  );
  const d3Node = createD3Node(walker);
  if (walker.currentNode.children.length > 0)
    d3Node.children = getChildren(walker);
  return d3Node;
}

//new 4.11
// function grabData() {
//   chrome.runtime.sendMessage({ type: 'getDOM' }, function (response) {
//     const root = response.dom;
//     const walker = createWalker(root);
//     const D3Node = createD3Node(walker);
//     D3Node.children = getChildren(walker);
//     // Call a function to display the D3 tree
//     displayD3Tree(D3Node);
//   });
// }

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   if (request.type === 'reload') {
//     grabData();
//   }
// });

// const root = document.getElementById(':root');
let d3Tree = grabData();
const treeData4 = JSON.stringify(d3Tree);
chrome.runtime.sendMessage({ tree: treeData4 });

const grabTree = new MutationObserver(() => {
  let updatedTree = grabData();
  chrome.runtime.sendMessage({ nestedObject: updatedTree });
  let updatedVitals = storeVitals();
  chrome.runtime.sendMessage({ storedVitals: updatedVitals });
});
const observerConfig = {
  attributes: true,
  childList: true,
  subtree: true,
};
grabTree.observe(document.documentElement, observerConfig);

//new
// grabTree.observe(document.documentElement, observerConfig);
// let visibilityHandler = () => {
//   if (document.hidden) {
//     grabTree.disconnect();
//   } else {
//     grabTree.observe(document.documentElement, observerConfig);
//   }
// };

// window.addEventListener('beforeunload', function () {
//   grabTree.disconnect();
// });

// window.addEventListener('visibilitychange', visibilityHandler);
//new
// const port = chrome.runtime.connect({ name: 'knockknock' });
// port.postMessage({ joke: 'Knock knock' });
// console.log(port.name);
// port.onMessage.addListener(function (msg) {
//   console.log('msg in content.js', msg);
//   if (msg.question === "Who's there?")
//     port.postMessage({ treeData: treeData4 });
//   else if (msg.question === 'Madame who?')
//     port.postMessage({ answer: 'Madame... Bovary' });
// });

})();

/******/ })()
;
//# sourceMappingURL=content.bundle.js.map