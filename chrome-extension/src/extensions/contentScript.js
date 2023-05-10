/* eslint-disable */
// @ts-nocheck

/***
 * we are assuming webvitals package is installed from npm
 * To not use npm install:
 * <script type="module">
 *   import {onCLS, onFID, onLCP} from 'https://unpkg.com/web-vitals@3?module';
 * </script>
 */
import { onCLS, onFID, onLCP, onFCP, onTTFB, measure } from 'web-vitals';

let coreWebVitals = {};
function storeVitals() {
  //user need to interact with the page for FID to be reported
  onFID((metric) => {
    coreWebVitals.fid = Math.round(metric.value * 10000) / 10000;
    coreWebVitals.fidRating = metric.rating.toUpperCase();
  });

  //following metrics will not be reported if page was loaded in the background
  onLCP((metric) => {
    coreWebVitals.lcp = Math.round(metric.value * 10000) / 10000;
    coreWebVitals.lcpRating = metric.rating.toUpperCase();
  });
  //CLS
  onCLS((metric) => {
    coreWebVitals.cls = Math.round(metric.value * 10000) / 10000;
    coreWebVitals.clsRating = metric.rating.toUpperCase();
  });
  //FCP
  onFCP((metric) => {
    coreWebVitals.fcp = Math.round(metric.value * 10000) / 10000;
    coreWebVitals.fcpRating = metric.rating.toUpperCase();
  });
  //TTFB
  onTTFB((metric) => {
    coreWebVitals.ttfb = Math.round(metric.value * 10000) / 10000;
    coreWebVitals.ttfbRating = metric.rating.toUpperCase();
  });
  return coreWebVitals;
}
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

function getLane(node) {
  if (node.className.includes('TransitionLane')) {
    const lastTwo = node.className.slice(-2);
    const lastOne = node.className.slice(-1);
    if (!isNaN(lastTwo)) {
      return Number(lastTwo);
    } else if (!isNaN(lastOne)) return Number(lastOne);
  }
  return 0;
}

function getAttributes(node) {
  return {
    type: node.className || node.nodeName,
    lane: getLane(node),
    suspense: node.className.includes('Suspense'),
    loadtime: node.getAttribute('loadtime'),
    selector: node.getAttribute('name'),
    //new
  };
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
    //if the child node has children, recursively call the getChildren and assign the children to d3Node
    if (childNode.children.length > 0) {
      let childWalker = createWalker(walker.currentNode);
      D3Node.children = getChildren(childWalker);
      //add the newly created D3Node to the children array
    }
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
  D3Node.id = node.getAttribute('name');
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

let d3Tree = grabData();
const treeData4 = JSON.stringify(d3Tree);

//listen to changes in DOM tree
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

//create long-lived connection
const port = chrome.runtime.connect({ name: 'domTreeConnection' });
port.postMessage({ treeData: treeData4 });

let hasHighlightClass = false;

//highlight node in DOM page if clicked on in tree
const highlight = (node) => {
  const highlightClass = 'sparkle';
  console.log(node.classList);
  console.log(node);
  hasHighlightClass = node && node.classList.contains(highlightClass);
  if (hasHighlightClass) {
    console.log('we are removing highlight class');
    node.classList.remove(highlightClass);
  } else {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes bounce-animation {
        0% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0); }
      }
      .${highlightClass} {
        animation: bounce-animation 0.5s ease-in-out infinite,
        yellow-background 0.5s ease-in-out infinite;
      }

      @keyframes yellow-background {
        0% { background-color: yellow; }
        50% { background-color: transparent; }
        100% { background-color: yellow; }
      }
    `;

    document.head.appendChild(style);
    node.classList.add(highlightClass);
    hasHighlightClass = true;
  }
  return;
};
let target;
chrome.storage.onChanged.addListener((changes, namespace) => {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    console.log(changes);
    //check if the changed key is key2
    if (key === 'key2') {
      //iterate through keys in key2 & check if value has changed from oldValue
      for (let [specificKey, specificValue] of Object.entries(newValue)) {
        if (specificValue !== (oldValue && oldValue[specificKey])) {
          console.log(
            `"${specificKey}" changed from "${oldValue[specificKey]}" to "${specificValue}"`
          );
          target = document.getElementsByName(specificKey);
        }
      }
    }
  }
  highlight(target[0]);
  return;
});
