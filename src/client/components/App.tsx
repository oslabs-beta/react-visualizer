/* eslint-disable */
// @ts-nocheck
/* eslint-disable  @typescript-eslint/no-unused-vars */

import React, { useState, useEffect } from 'react';
import { Message } from 'types';
import './App.css';
// import treeNodes from '../../extensions/contentScript.js';

import Tree from 'react-d3-tree';

// console.log('this is treeNodes showing from app.tsx');

// const treeData = JSON.parse(chrome.storage.local.get(['treeData']));

// , (result) => {
//   // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
//   console.log(`User is ${result.treeData}`);
//   // you can use the variable or set to any state variable from here
// })
// );

// var port = chrome.tabs.connect({ name: 'knockknock' });
// // var port = chrome.runtime.connect({ name: 'knockknock' });
// port.postMessage({ question: "Who's there?" });
// port.onMessage.addListener(function (msg) {
//   if (msg.answer === 'Madame') port.postMessage({ question: 'Madame who?' });
//   else if (msg.question === 'Madame who?')
//     port.postMessage({ answer: 'Madame... Bovary' });
// });

// chrome.runtime.onConnect.addListener(function (port) {
//   console.assert(port.name === 'knockknock');
//   port.onMessage.addListener(function (msg) {
//     if (msg.joke === 'Knock knock')
//       port.postMessage({ question: "Who's there?" });
//     else if (msg.answer === 'Madame')
//       port.postMessage({ question: 'Madame who?' });
//     else if (msg.answer === 'Madame... Bovary')
//       port.postMessage({ question: "I don't get it." });
//   });
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

function App(): JSX.Element {
  //beg of example
  const [nodes, setNodes] = useState({});

  // React.useEffect(() => {
  //   /**
  //    * We can't use "chrome.runtime.sendMessage" for sending messages from React.
  //    * For sending messages from React we need to specify which tab to send it to.
  //    */
  //   chrome.tabs &&
  //     chrome.tabs.query(
  //       {
  //         active: true,
  //         currentWindow: true,
  //       },
  //       (tabs) => {
  //         /**
  //          * Sends a single message to the content script(s) in the specified tab,
  //          * with an optional callback to run when a response is sent back.
  //          *
  //          * The runtime.onMessage event is fired in each content script running
  //          * in the specified tab for the current extension.
  //          */
  //         chrome.tabs.sendMessage(
  //           tabs[0].id || 0,
  //           { type: 'GET_DOM' } as DOMMessage,
  //           (response: DOMMessageResponse) => {
  //             setNodes(treeNodes);
  //           }
  //         );
  //       }
  //     );
  // });
  //end of ex

  const [message, setMessage] = useState<Message>('');

  const updateMessageHandler = (): void => {
    fetch('/api')
      .then((response) => response.text())
      .then((newMessage) => {
        setMessage(newMessage);
      })
      .catch((error) => {
        throw error;
      });
  };

  // useEffect(() => {
  //   // only open port once
  //   // if (port) return;
  //   // open long-lived connection with background script
  //   const currentPort = chrome.runtime.connect();

  //   currentPort.onMessage.addListener(
  //     // parameter message is an object with following type script properties
  //     (message: {
  //       action: string;
  //       payload: Record<string, unknown>;
  //       sourceTab: number;
  //     }) => {
  //       const { action, payload, sourceTab } = message;
  //       let maxTab: number;
  //       if (!sourceTab) {
  //         const tabsArray: Array<string> = Object.keys(payload);
  //         const numTabsArray: number[] = tabsArray.map((tab) => Number(tab));
  //         maxTab = Math.max(...numTabsArray);
  //       }

  //       return true;
  //     }
  //   );

  //   currentPort.onDisconnect.addListener(() => {
  //     console.log('this port is disconnecting');
  //     // disconnecting
  //   });
  // });

  const straightPathFunc = (linkDatum, orientation) => {
    const { source, target } = linkDatum;
    return (orientation = 'vertical');
    // ? `M${source.y},${source.x}L${target.y},${target.x}`
    // : `M${source.x},${source.y}L${target.x},${target.y}`;
  };
  const nodeSize = { x: 150, y: 50 };
  console.log(nodes);
  return (
    <div className="App">
      {message && <p>{message}</p>}
      <div id="treeWrapper" style={{ width: '100em', height: '100em' }}>
        <Tree
          data={dummyData}
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
