/* eslint-disable */
// @ts-nocheck

// console.log(document.querySelector(':root'));
// console.log(document.documentElement);
// console.log(document.getElementsByTagName('html'));

// const treeFilter = {
//   acceptNode(node) {
//     return;
//     node.tagName == 'META' ||
//     node.tagName == 'SCRIPT' ||
//     node.tagName == 'LINK' ||
//     node.tagName == 'STYLE' ||
//     node.parentNode.tagName == 'svg'
//       ? NodeFilter.FILTER_REJECT
//       : NodeFilter.FILTER_ACCEPT;
//   },
// };

// const walkerFilter = {
//   acceptNode(node) {
//     return node.nodeName.toLowerCase() !== 'script'
//       ? NodeFilter.FILTER_ACCEPT
//       : NodeFilter.FILTER_REJECT;
//   },
// };

// // // let walker = document.createTreeWalker(
// // //   root,
// // //   NodeFilter.SHOW_ELEMENT,
// // //   walkerFilter
// // // );

// let nodeObj = {};

// const grabTree = new MutationObserver(() => {
//   nodeObj = {};
//   nodeObj = grabTreeFromBrowser();
//   chrome.runtime.sendMessage({ nestedObject: nodeObj });
// });

// const grabTreeFromBrowser = () => {
//   const root = document.body;
//   // const root = document.querySelector(':root');
//   // const root = document.getElementById(':root');

//   const tree = document.createTreeWalker(
//     root,
//     NodeFilter.SHOW_ELEMENT,
//     walkerFilter,
//     false
//   );
//   //create tree walker
//   const node = tree.currentNode;
//   const levels = [];
//   //BFS
//   //add nodes to build tree
//   const queue = [{ domNode: node, context: nodeObj, level: 1 }];
//   while (queue.length > 0) {
//     //context aka pointer to layer of object
//     const { domNode, context, level } = queue.shift();
//     console.log(level);
//     // context.innerHTML = domNode.innerHTML;
//     // if current level is greater than levels.length, push node in level. otherwise, create a new level in zero-indexed treeLevels arr
//     if (level > levels.length) {
//       levels.push(['']);
//     } else {
//       levels[level - 1].push('');
//     }
//     // const height = level;
//     // const width = levels[level - 1].length;
//     if (!context.attributes) context.attributes = {};
//     if (!context.name) context.name = '';
//     if (domNode.nodeName) context.name = domNode.nodeName;
//     if (
//       domNode.nodeName === '#text' &&
//       domNode.textContent !== null &&
//       domNode.textContent !== undefined
//     ) {
//       context.attributes.content = domNode.textContent;
//     }
//     //check if current node has children
//     if (domNode.childNodes !== null && domNode.childNodes.length > 0) {
//       for (let i = 0; i < domNode.childNodes.length; i++) {
//         context.children
//           ? context.children.push({})
//           : (context.children = [{}]);
//         queue.push({
//           domNode: domNode.childNodes[i],
//           context: context.children[i],
//           level: level + 1,
//         });
//       }
//     }
//   }
//   console.log(nodeObj);
//   return nodeObj;
// };

// const observerConfig = {
//   attributes: true,
//   childList: true,
//   subtree: true,
// };

// grabTree.observe(document.documentElement, observerConfig);
// grabTreeFromBrowser();

// const treeData4 = JSON.stringify(nodeObj);

// const port = chrome.runtime.connect({ name: 'knockknock' });
// port.postMessage({ joke: 'Knock knock' });
// console.log(port.name);
// port.onMessage.addListener(function (msg) {
//   console.log(msg);
//   if (msg.question === "Who's there?")
//     port.postMessage({ treeData: treeData4 });
//   else if (msg.question === 'Madame who?')
//     port.postMessage({ answer: 'Madame... Bovary' });
// });

//Pengbo's new code
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
    //walker move to the next sibling and reassign the childNode to the sibiling node
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
function traverse(walker) {
  let d3Node = createD3Node(walker);
  if (walker.currentNode.children.length > 0)
    d3Node.children = getChildren(walker);
  return d3Node;
}

// const root = document.getElementById(':root');
// const root = document.querySelector(':root');
const root = document.body;

let walker = document.createTreeWalker(
  root,
  NodeFilter.SHOW_ELEMENT,
  walkerFilter
);

let d3Tree = traverse(walker);
const treeData4 = JSON.stringify(d3Tree);

console.log('D3 tree is converted:', d3Tree);

//added this michelle
const grabTree = new MutationObserver(() => {
  d3Tree = {};
  d3Tree = traverse(walker);
  chrome.runtime.sendMessage({ nestedObject: d3Tree });
  return d3Tree;
});
const observerConfig = {
  attributes: true,
  childList: true,
  subtree: true,
};

grabTree.observe(document.documentElement, observerConfig);
// //michelle added this michelle

const port = chrome.runtime.connect({ name: 'knockknock' });
port.postMessage({ joke: 'Knock knock' });
console.log(port.name);
port.onMessage.addListener(function (msg) {
  console.log(msg);
  if (msg.question === "Who's there?")
    port.postMessage({ treeData: treeData4 });
  else if (msg.question === 'Madame who?')
    port.postMessage({ answer: 'Madame... Bovary' });
});
