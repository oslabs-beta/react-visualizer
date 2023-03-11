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
  // console.log(nodeObj);
  chrome.runtime.onConnect.addListener(function (port) {
    console.assert(port.name === 'knockknock');
    port.onMessage.addListener(function (msg) {
      if (msg.joke === 'Knock knock')
        port.postMessage({ question: "Who's there?" });
      else if (msg.answer === 'Madame')
        port.postMessage({ question: 'Madame who?' });
      else if (msg.answer === 'Madame... Bovary')
        port.postMessage({ node: JSON.stringify(nodeObj) });
    });
  });

  return nodeObj;
}
const treeNodes = grabTreeFromBrowser();
console.log('logging tree nodes outside function ');
console.log(treeNodes);
export default treeNodes;

var port = chrome.runtime.connect({ name: 'knockknock' });
port.postMessage({ joke: 'Knock knock' });
console.log(port);
port.onMessage.addListener(function (msg) {
  console.log('msg is ');
  console.log(msg);
  //alert('msg from content script');
  if (msg.question === "Who's there?") port.postMessage({ answer: 'Madame' });
  else if (msg.question === 'Madame who?')
    port.postMessage({ answer: 'Madame... Bovary' });
});

chrome.runtime.onMessage.addListener(function (request, sender) {
  // If we get the request from the Background script
  if (request.line == 'countparas') {
    // Select all `<p>` elements in the document body
    var paras = document.body.querySelectorAll('p');
    // If the number of `<p>` elements is greater than zero
    if (paras.length > 0) {
      // Assigning that number to a variable called 'theCount'
      // and convert it to a string format
      var theCount = paras.length + '';
      // Send the count back to the background script
      chrome.runtime.sendMessage({ count: theCount });
    } else {
      alert('There does not seem to be any `<p>` elements in this page!');
    }
  }
});

// //new 3/11
// document.addEventListener('click', (event) => {
//   chrome.runtime.sendMessage(
//     {
//       click: true,
//       xPosition: event.clientX + document.body.scrollLeft,
//       yPosition: event.clientY + document.body.scrollTop,
//     },
//     (response) => {
//       console.log('Received response', response);
//     }
//   );
// });
