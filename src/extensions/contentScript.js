/* eslint-disable */
// @ts-nocheck
//alert('content script running');
import * as d3 from 'd3';
import Tree from 'react-d3-tree';
import './custom-tree.css';
import React from 'react';

function grabTreeFromBrowser() {
  const root = document.getElementById('root');
  // const root = document.documentElement;
  // const root = document.querySelector(':root');

  //create tree walker
  const tree = document.createTreeWalker(root);
  const node = tree.currentNode;
  const nodeObj = {};
  const levels = [];

  //BFS
  const queue = [{ domNode: node, context: nodeObj, level: 1 }];
  while (queue.length > 0) {
    //context aka pointer to layer of object
    const { domNode, context, level } = queue.shift();
    console.log(level);
    context.innerHTML = domNode.innerHTML;
    if (level > levels.length) {
      levels.push(['']);
    } else {
      levels[level - 1].push('');
    }

    const height = level;
    const width = levels[level - 1].length;
    context.id = { height: height, width: width };
    context.width = levels[level - 1].length;
    //add keys to object
    if (!context.attributes) context.attributes = {};
    if (!context.name) context.name = '';

    //add name and text to object
    if (domNode.nodeName) context.name = domNode.nodeName;
    if (
      domNode.nodeName === '#text' &&
      domNode.textContent !== null &&
      domNode.textContent !== undefined
    ) {
      context.attributes.content = domNode.textContent;
    }

    // //check hydration status of memoized react fiber
    // if (Object.keys(domNode).length > 0 && domNode[Object.keys(domNode)[0]]) {
    //   let fiber = domNode[Object.keys(domNode)[0]];
    //   if (fiber.memoizedState !== null && fiber.memoizedState !== undefined) {
    //     if (
    //       fiber.memoizedState.isDehydrated !== null &&
    //       fiber.memoizedState.isDehydrated !== undefined
    //     ) {
    //       context.attributes.hydrated = !fiber.memoizedState.isDehydrated;
    //     }
    //   }
    // }
    const keys = Object.keys(domNode);
    if (keys.length > 1 && keys[1].includes('__reactProps')) {
      const propKeys = Object.keys(domNode[keys[1]]);
      for (let i = 0; i < propKeys.length; i++) {
        if (propKeys[i].includes('on')) {
          context.attributes[propKeys[i]] = domNode[keys[1]][propKeys[i]];
        }
      }
    }

    //push node onto queue with correct pointer
    if (domNode.childNodes !== null && domNode.childNodes.length > 0) {
      for (let i = 0; i < domNode.childNodes.length; i++) {
        context.children
          ? context.children.push({})
          : (context.children = [{}]);
        queue.push({
          domNode: domNode.childNodes[i],
          context: context.children[i],
          level: level + 1,
        });
      }
    }
  }
  console.log(nodeObj);
  return nodeObj;
}
const treeNodes = grabTreeFromBrowser();
export default treeNodes;

// export default function OrgChartTree() {
//   return (
//     // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
//     <div id="treeWrapper" style={{ width: '50em', height: '20em' }}>
//       <Tree data={treeNodes} />
//     </div>
//   );
// }
