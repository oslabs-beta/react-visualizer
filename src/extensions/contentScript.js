/* eslint-disable */
// @ts-nocheck
//alert('content script running');
console.log('hello, content script is finally running');


console.log(document.body);
console.log(document.querySelector(':root'));
console.log(document.documentElement);
console.log(document.getElementsByTagName("html"))


const treeWalker = document.createTreeWalker(
    document.querySelector(':root'),
    NodeFilter.SHOW_ELEMENT,
    {
      acceptNode(node) {
        NodeFilter.FILTER_ACCEPT
      },
    }
);
  
const nodeList = [];
let currentNode = treeWalker.currentNode;

while (currentNode) {
    nodeList.push({
        "name":currentNode.tagName,
        "children":currentNode.firstChild
    });
    currentNode = treeWalker.nextNode();
}
console.log(nodeList);



// function grabTreeFromBrowser() {
//     const root = document.getElementById('root');
//     //create tree walker
//     console.log(root);
//     const tree = document.createTreeWalker(root);
//     const node = tree.currentNode;
//     const nodeObj = {};
//     const levels = [];
//     //BFS
//     const queue = [{ domNode: node, context: nodeObj, level: 1 }];
//     while (queue.length > 0) {
//       //context aka pointer to layer of object
//       const { domNode, context, level } = queue.shift();
//       console.log(level);
//       context.innerHTML = domNode.innerHTML;
//       if (level > levels.length) {
//         levels.push(['']);
//       } else {
//         levels[level - 1].push('');
//       }
//       const height = level;
//       const width = levels[level - 1].length;
//       context.id = { height: height, width: width };
//       context.width = levels[level - 1].length;
//       if (!context.attributes) context.attributes = {};
//       if (!context.name) context.name = '';
//       if (domNode.nodeName) context.name = domNode.nodeName;
//       if (
//         domNode.nodeName === '#text' &&
//         domNode.textContent !== null &&
//         domNode.textContent !== undefined
//       ) {
//         context.attributes.content = domNode.textContent;
//       }
//       const keys = Object.keys(domNode);
//       if (keys.length > 1 && keys[1].includes('__reactProps')) {
//         const propKeys = Object.keys(domNode[keys[1]]);
//         for (let i = 0; i < propKeys.length; i++) {
//           if (propKeys[i].includes('on')) {
//             context.attributes[propKeys[i]] = domNode[keys[1]][propKeys[i]];
//           }
//         }
//       }
//       if (domNode.childNodes !== null && domNode.childNodes.length > 0) {
//         for (let i = 0; i < domNode.childNodes.length; i++) {
//           context.children
//             ? context.children.push({})
//             : (context.children = [{}]);
//           queue.push({
//             domNode: domNode.childNodes[i],
//             context: context.children[i],
//             level: level + 1,
//           });
//         }
//       }
//     }
//     console.log(nodeObj);
//     return nodeObj;
//   }
//   grabTreeFromBrowser();