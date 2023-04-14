/* eslint-disable */
// @ts-nocheck
/* eslint-disable  @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
// import { Tabs, Storage } from 'chrome';
import './App.css';

// import treeNodes from '../../extensions/contentScript.js';

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
  let currentTab;
  const [nodes, setNodes] = useState({});
  // instantiate to store web-vital stats passed from contentScript.js
  const [coreVitals, setCoreVitals] = useState<CoreVitals>({});

  // beg of example
  // let currentTab;
  // instantiate to store web-vital stats passed from contentScript.js
  // new 4.11
  // chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  //   currentTab = tabs[0].id;
  //   console.log(`logging tab from app.tsx ${currentTab}`);
  //   // chrome.storage.local.get(['key']).then((result) => {
  //   //   if (currentTab !== undefined) {
  //   //     setNodes(result.key[currentTab]);
  //   //     console.log('this is nodes ' + result.key[currentTab]);
  //   //   }
  //   // });
  // });

  // listening to background.js connection
  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      currentTab = tabs[0].id;
      console.log(`logging tab from app.tsx ${currentTab}`);
      chrome.runtime.onMessage.addListener((request) => {
        if (request.fromBGtree1) {
          console.log('lets log ' + request.fromBGtree1);
          // treeObj[currentTab] = request.fromBGtree1[currentTab];
          setNodes(request.fromBGtree1.currentTab);
          // }
        }
        // if (request.fromBGtree1) {
        //   console.log('lets log ' + request.fromBGtree1);
        //   setNodes(request.fromBGtree1[currentTab]);
        //   // setNodes(request.fromBGtree1.currentTab);
        //   // }
        // }
        // if (request.fromBGtree2) {
        //   setNodes(request.fromBGtree2[currentTab]);
        // }
        if (request.storedVitalsfromBG) {
          setCoreVitals(request.storedVitalsfromBG);
        }
      });
      //listen for changes in chrome storage
      chrome.storage.onChanged.addListener((changes, namespace) => {
        for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
          if (currentTab !== undefined) {
            console.log(changes.key.newValue[currentTab]);
            changes.key.newValue[currentTab];
            // let newTree = {};
            // newTree[currentTab] = changes.key.newValue[currentTab];
            //Update the D3.js tree in App.tsx with the updated nested object
            setNodes(changes.key.newValue[currentTab]);
          }
        }
      });
    });
  }, [nodes]);

  const straightPathFunc = (linkDatum: object, orientation: string) => {
    const { source, target } = linkDatum;
    return (orientation = 'vertical');
    // ? `M${source.y},${source.x}L${target.y},${target.x}`
    // : `M${source.x},${source.y}L${target.x},${target.y}`;
  };
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
