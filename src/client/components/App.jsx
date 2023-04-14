// import React, { useState, useEffect } from 'react';
// import './App.css';
// // import treeNodes from '../../extensions/contentScript.js';

// import Tree from 'react-d3-tree';

// // , (result) => {
// //   // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
// //   console.log(`User is ${result.treeData}`);
// //   // you can use the variable or set to any state variable from here
// // })
// // );

// function App() {
//   //beg of example
//   const [nodes, setNodes] = useState({});
//   let currentTab = '';
//   //instantiate to store web-vital stats passed from contentScript.js
//   const [coreVitals, setCoreVitals] = useState({});
//   //new 4.11

//   //listening to background.js connection
//   useEffect(() => {
//     //new
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//       currentTab = tabs[0].id;
//       console.log('logging tab from app.tsx ' + currentTab);
//       chrome.storage.local.get(['key']).then((result) => {
//         console.log('Value currently is ');
//         console.log(result.key[currentTab]);
//         setNodes(result.key[currentTab]);
//       });
//     });
//     // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     //   currentTab = tabs[0].id;
//     console.log('logging tab from app.tsx' + currentTab);
//     chrome.runtime.onMessage.addListener((request) => {
//       //   // if (request.nestedObject) {
//       //   //   setNodes(request.nestedObject);
//       //   if (request.fromBGtree1) {
//       //     console.log('lets log ' + request.fromBGtree1);
//       //     setNodes(JSON.parse(request.fromBGtree1[currentTab]));
//       //     // setNodes(JSON.parse(request.fromBGtree1.currentTab));
//       //   }
//       //   if (request.fromBGtree2) {
//       //     setNodes(request.fromBGtree2[currentTab]);
//       //   }
//       if (request.storedVitalsfromBG) {
//         setCoreVitals(request.storedVitalsfromBG);
//       }
//       //   //Update the D3.js tree in App.tsx with the updated nested object
//     });
//   }, [currentTab, nodes]);

//   // //new 4.11
//   // chrome.tabs.onActivated.addListener(function (activeInfo) {
//   //   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//   //     currentTab = tabs[0].id;
//   //     console.log('logging tab from app.tsx' + tabs[0].id);
//   //     if (tabs[0].id === activeTabId) {
//   //       chrome.tabs.sendMessage(activeTabId, { type: 'reload' });
//   //     }
//   //   });
//   // });
//   // //new
//   const straightPathFunc = (linkDatum, orientation) => {
//     const { source, target } = linkDatum;
//     return (orientation = 'vertical');
//     // ? `M${source.y},${source.x}L${target.y},${target.x}`
//     // : `M${source.x},${source.y}L${target.x},${target.y}`;
//   };
//   const nodeSize = { x: 150, y: 50 };

//   return (
//     <div className="App">
//       <div id="webVitals">
//         <div class="coreVitals">
//           <li>
//             Cumulative Layout Shift (CLS): {coreVitals.cls}{' '}
//             {coreVitals.clsRating}
//           </li>
//           <li>
//             First Input Delay (FID): {coreVitals.fid} {coreVitals.fidRating}{' '}
//           </li>
//           <li>
//             Largest Contentful Paint (LCP): {coreVitals.lcp}{' '}
//             {coreVitals.lcpRating}{' '}
//           </li>
//         </div>
//         <div class="otherVitals">
//           <li>
//             First Contentful Paint (FCP): {coreVitals.fcp}{' '}
//             {coreVitals.fcpRating}
//           </li>
//           <li>
//             Time to First Byte (TTFB): {coreVitals.ttfb} {coreVitals.ttfbRating}
//           </li>
//         </div>
//       </div>
//       <div id="treeWrapper" style={{ width: '100em', height: '100em' }}>
//         <Tree
//           data={nodes}
//           nodeSize={nodeSize}
//           // orientation="vertical"
//           pathFunc="step"
//           // collapsible="false"
//         />
//       </div>
//     </div>
//   );
// }

// export default App;
