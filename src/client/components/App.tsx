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
        if (request.domTreeObj) {
          //set first render of tree
          setNodes(request.domTreeObj.currentTab);
        }
        // if (request.fromBGtree2) {
        //   setNodes(request.fromBGtree2[currentTab]);
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
  const nodeSize = { x: 150, y: 50 };

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
        />
      </div>
    </div>
  );
}

export default App;
