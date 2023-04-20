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

function App(): JSX.Element {
  const [nodes, setNodes] = useState({});
  // instantiate to store web-vital stats passed from contentScript.js
  const [coreVitals, setCoreVitals] = useState<CoreVitals>({});

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      let currentTab: number = tabs[0].id;
      // listening to background.js connection
      chrome.runtime.onMessage.addListener((request) => {
        // if (request.domTreeObj) {
        //   //set first render of tree
        //   setNodes(request.domTreeObj.currentTab);
        // }
        // if (request.updatedTree) {
        //   setNodes(request.updatedTree[currentTab]);
        // }
        if (request.storedVitalsfromBG) {
          setCoreVitals(request.storedVitalsfromBG);
        }
      });
      // listen for changes in chrome storage
      chrome.storage.onChanged.addListener((changes) => {
        if (currentTab !== undefined) {
          changes.key.newValue[currentTab];
          // newTree[currentTab] = changes.key.newValue[currentTab];
          // Update the D3.js tree in App.tsx with the updated nested object
          setNodes(changes.key.newValue[currentTab]);
        }
      });
    });
  }, [nodes]);
  //size of nodes in Dom Tree
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

  const nodeSize = { x: 150, y: 50 };
  const renderCustomNodeElement = ({ nodeDatum, toggleNode }) => {
    console.log(nodeDatum);
    const circleProps = {
      r: 10,
      fill: nodeColors[nodeDatum.attributes?.lane.toString()], // Set fill color based on the node's color attribute
    };

    return (
      <g onClick={toggleNode}>
        <circle {...circleProps} />
        <text>{nodeDatum.name}</text>
      </g>
    );
  };
  return (
    <div className="App">
      <div id="webVitals">
        <div className="coreVitals">
          <li>
            Cumulative Layout Shift (CLS): {coreVitals.cls}{' '}
            {coreVitals.clsRating}
          </li>
          <li>
            First Input Delay (FID): {coreVitals.fid} {coreVitals.fidRating}{' '}
          </li>
          <li>
            Largest Contentful Paint (LCP): {coreVitals.lcp}{' '}
            {coreVitals.lcpRating}{' '}
          </li>
        </div>
        <div className="otherVitals">
          <li>
            First Contentful Paint (FCP): {coreVitals.fcp}{' '}
            {coreVitals.fcpRating}
          </li>
          <li>
            Time to First Byte (TTFB): {coreVitals.ttfb} {coreVitals.ttfbRating}
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
          // rootNodeClassName="node__root"
          // branchNodeClassName="node__branch"
          // leafNodeClassName="node__leaf"
          renderCustomNodeElement={renderCustomNodeElement}
        />
      </div>
    </div>
  );
}

export default App;
