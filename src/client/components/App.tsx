/* eslint-disable */
// @ts-nocheck
/* eslint-disable  @typescript-eslint/no-unused-vars */

import React, { useState, useEffect } from 'react';
import { Message } from 'types';
import './App.css';
// import treeNodes from '../../extensions/contentScript.js';

import Tree from 'react-d3-tree';

// , (result) => {
//   // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
//   console.log(`User is ${result.treeData}`);
//   // you can use the variable or set to any state variable from here
// })
// );

// port.postMessage({ joke: 'Knock knock' });
// port.onMessage.addListener(function (msg) {
//   if (msg.question === "Who's there?") port.postMessage({ answer: 'Madame' });
//   else if (msg.question === 'Madame who?')
//     port.postMessage({ answer: 'Madame... Bovary' });
// });

const dummyData = {
  name: 'root',
  children: [
    {
      name: 'app',
      children: [
        {
          name: 'div',
          children: [
            {
              name: 'h1',
            },
          ],
        },
        {
          name: 'h3',
        },
        {
          name: 'Suspense',
          children: [
            {
              name: 'span',
            },
            {
              name: 'input',
            },
            {
              name: 'ul',
              children: [
                { name: 'li' },
                { name: 'li' },
                { name: 'li' },
                { name: 'li' },
                { name: 'li' },
                { name: 'li' },
                { name: 'li' },
                { name: 'li' },
                { name: 'li' },
                { name: 'li' },
                { name: 'li' },
                { name: 'li' },
                { name: 'li' },
                { name: 'li' },
                { name: 'li' },
                { name: 'li' },
                { name: 'li' },
                { name: 'li' },
                { name: 'li' },
                { name: 'li' },
                { name: 'li' },
                { name: 'li' },
                { name: 'li' },
                { name: 'li' },
                { name: 'li' },
                { name: 'li' },
                { name: 'li' },
                { name: 'li' },
                { name: 'li' },
                { name: 'li' },
              ],
            },
          ],
        },
      ],
    },
  ],
};

// const dummyData = {
//   name: 'App',
//   children: [
//     {
//       name: 'Button',
//       attributes: {
//         department: 'Production',
//       },
//       children: [
//         {
//           name: 'Worker',
//           attributes: {
//             department: 'button',
//           },
//           children: [
//             {
//               name: 'MuiStack-root',
//             },
//           ],
//         },
//         {
//           name: 'Dummy Data',
//           attributes: {
//             department: 'Assembly',
//           },
//           children: [
//             {
//               name: 'Worker',
//             },
//           ],
//         },
//       ],
//     },
//   ],
// };

type DOMMessage = {
  type: 'GET_DOM';
};

type DOMMessageResponse = {
  title: string;
  headlines: string[];
};
let loggingTree;
function App(): JSX.Element {
  //beg of example

  const [nodes, setNodes] = useState({});

  //listening to content script connection
  useEffect(() => {
    chrome.runtime.onConnect.addListener(function (port) {
      console.assert(port.name === 'knockknock');
      port.onMessage.addListener(function (msg) {
        if (msg.joke === 'Knock knock') {
          console.log(msg.joke);
          console.log(msg.answer);
          port.postMessage({ question: "Who's there?" });
        } else if (msg.treeData) {
          setNodes(JSON.parse(msg.treeData));
          console.log(nodes);
        } else if (msg.answer === 'Madame... Bovary') {
          port.postMessage({ question: "I don't get it." });
        }
      });
    });
  });
  console.log('logging tree global in app');
  console.log(nodes);
  // const blah = { name: 'App' };
  const straightPathFunc = (linkDatum, orientation) => {
    const { source, target } = linkDatum;
    return (orientation = 'vertical');
    // ? `M${source.y},${source.x}L${target.y},${target.x}`
    // : `M${source.x},${source.y}L${target.x},${target.y}`;
  };
  const nodeSize = { x: 150, y: 50 };
  return (
    <div className="App">
      <div id="treeWrapper" style={{ width: '100em', height: '100em' }}>
        <Tree
          data={nodes}
          nodeSize={nodeSize}
          // orientation="vertical"
          pathFunc="step"
          // collapsible="false"
        />
      </div>
    </div>
  );
}

export default App;
