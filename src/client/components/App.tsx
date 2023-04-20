/* eslint-disable */
// @ts-nocheck
/* eslint-disable  @typescript-eslint/no-unused-vars */

import React, { useState, useEffect } from 'react';
import { Message } from 'types';
import './App.css';
// import treeNodes from '../../extensions/contentScript.js';

import Tree from 'react-d3-tree';
import { node } from 'webpack';

// , (result) => {
//   // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
//   console.log(`User is ${result.treeData}`);
//   // you can use the variable or set to any state variable from here
// })
// );

const nodeColors = {
  0: '',
  6: '#99e2b4',
  7: '#88d4dB',
  8: '#9ff7cb',
  9: '#67b99a',
  10: '#56ab91',
  11: '#469d89',
  12: '#358f80',
  13: '#248277',
  14: '#14746f',
  15: '#036666',
  16: '#40916c',
  17: '#25a244',
  18: '#208b3a',
  19: '#1a7431',
  20: '#155d27',
  21: '#10451d',
  22: '#2d6a4f',
};

const renderCustomNodeElement = ({ nodeDatum, toggleNode }) => {
  
  return (
    <g onClick={toggleNode}>
      <circle r = '15' fill= {nodeColors[nodeDatum.attributes?.lane.toString()]} />
        <text>{nodeDatum.name}</text>
        {nodeDatum.attributes?.lane && (
        <text x="20" dy="10" strokeWidth ="1">
          Lane: {nodeDatum.attributes.lane}
        </text>
        )}
        {nodeDatum.attributes?.suspense && (
        <text x="20" dy="10" strokeWidth ="1">
          Suspense
        </text>
        )}
        {nodeDatum.attributes?.loadtime && (
        <text text x="20" dy="22" strokeWidth ="1"> 
          {'Loadingtime: ' + nodeDatum.attributes.loadtime + 'ms'}
        </text>
        )}
    </g>
  );
};

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
        } else if (msg.answer === 'Madame... Bovary') {
          port.postMessage({ question: "I don't get it." });
        }
      });
    });
    chrome.runtime.onMessage.addListener((request) => {
      setNodes(request.nestedObject);
      // Update the D3.js tree in App.tsx with the updated nested object
    });
  }, [nodes]);

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
          renderCustomNodeElement={renderCustomNodeElement}
        />
      </div>
    </div>
  );
}

export default App;
