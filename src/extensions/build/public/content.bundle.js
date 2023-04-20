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
/*!*****************************************!*\
  !*** ./src/extensions/contentScript.js ***!
  \*****************************************/
__webpack_require__.r(__webpack_exports__);
/* eslint-disable */
// @ts-nocheck

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

// const root = document.getElementById(':root');

let d3Tree = grabData();
const treeData4 = JSON.stringify(d3Tree);

console.log('D3 tree is converted:', d3Tree);

const grabTree = new MutationObserver(() => {
  let updatedTree = grabData();
  chrome.runtime.sendMessage({ nestedObject: updatedTree });
});

const observerConfig = {
  attributes: true,
  childList: true,
  subtree: true,
};

grabTree.observe(document.documentElement, observerConfig);

const port = chrome.runtime.connect({ name: 'knockknock' });
port.postMessage({ joke: 'Knock knock' });
console.log(port.name);
port.onMessage.addListener(function (msg) {
  console.log('msg in content.js', msg);
  if (msg.question === "Who's there?")
    port.postMessage({ treeData: treeData4 });
  else if (msg.question === 'Madame who?')
    port.postMessage({ answer: 'Madame... Bovary' });
});

/******/ })()
;
//# sourceMappingURL=content.bundle.js.map