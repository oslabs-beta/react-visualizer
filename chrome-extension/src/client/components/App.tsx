/* eslint-disable */

import React, { useState, useEffect } from 'react';
import './App.css';

import Tree from 'react-d3-tree';

type CoreVitals = {
  cls?: number;
  fid?: number;
  lcp?: number;
  fcp?: number;
  ttfb?: number;
  clsRating?: string;
  fidRating?: string;
  lcpRating?: string;
  fcpRating?: string;
  ttfbRating?: string;
};

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
const boolObj = {};

function App(): JSX.Element {
  const [nodes, setNodes] = useState({});
  // instantiate to store web-vital stats passed from contentScript.js
  const [coreVitals, setCoreVitals] = useState<CoreVitals>({});

  const renderCustomNodeElement = ({ nodeDatum, toggleNode }) => (
    <g
      onClick={() => {
        const selectedNode = nodeDatum.attributes.selector;
        if (boolObj[selectedNode] !== undefined) {
          boolObj[selectedNode] === true
            ? (boolObj[selectedNode] = false)
            : (boolObj[selectedNode] = true);
        } else if (boolObj[selectedNode] === undefined) {
          boolObj[selectedNode] = true;
        }
        chrome.storage.session
          .set({ key1: selectedNode, key2: boolObj })
          .then(() => {
            console.log(`this is key1 selectedNode ${selectedNode}`);
          });
        toggleNode();
      }}
    >
      <circle r="15" fill={nodeColors[nodeDatum.attributes?.lane.toString()]} />
      <text>{nodeDatum.name}</text>
      {nodeDatum.attributes?.lane && (
        <text x="20" dy="10" strokeWidth="1">
          Lane: {nodeDatum.attributes.lane}
        </text>
      )}
      {nodeDatum.attributes?.suspense && (
        <text x="20" dy="10" strokeWidth="1">
          Suspense
        </text>
      )}
      {nodeDatum.attributes?.loadtime && (
        <text x="20" dy="22" strokeWidth="1">
          {`Loadingtime: ${nodeDatum.attributes.loadtime}ms`}
        </text>
      )}
    </g>
  );

  // listening to content script long-lived connection
  useEffect(() => {
    chrome.runtime.onConnect.addListener((port) => {
      console.assert(port.name === 'domTreeConnection'); // eslint-disable-line
      port.onMessage.addListener((msg) => {
        // render initial tree
        if (msg.treeData) setNodes(JSON.parse(msg.treeData));
      });
    });
    // listening to contentScript.js and background.js connection
    chrome.runtime.onMessage.addListener((request) => {
      if (request.storedVitals) {
        setCoreVitals(request.storedVitals);
      }
      // listening to contentScript.js and background.js connection
      if (request.nestedObject) {
        // Update the D3.js tree in App.tsx with the updated nested object
        setNodes(request.nestedObject);
      }
    });
  }, [nodes]);

  // setting size of nodes in tree
  const nodeSize = { x: 150, y: 50 };

  return (
    <div className="App">
      <div id="webVitals">
        <div className="coreVitals">
          <li>
            Cumulative Layout Shift (CLS): {coreVitals.cls}
            {coreVitals.clsRating}
          </li>
          <li>
            First Input Delay (FID): {coreVitals.fid} {coreVitals.fidRating}
          </li>
          <li>
            Largest Contentful Paint (LCP): {coreVitals.lcp}
            {coreVitals.lcpRating}
          </li>
        </div>
        <div className="otherVitals">
          <li>
            First Contentful Paint (FCP): {coreVitals.fcp}
            {coreVitals.fcpRating}
          </li>
          <li>
            Time to First Byte (TTFB): {coreVitals.ttfb}
            {coreVitals.ttfbRating}
          </li>
        </div>
      </div>
      <div id="treeWrapper" style={{ width: '100em', height: '100em' }}>
        <Tree
          // @ts-ignore
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
