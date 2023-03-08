/* eslint-disable */
// @ts-nocheck

import React, { useState } from 'react';
import { Message } from 'types';
import './App.css';
import treeNodes from '../../extensions/contentScript.js';
import Tree from 'react-d3-tree';

console.log('this is treeNodes showing from app.tsx');
console.log(treeNodes);

function App(): JSX.Element {
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

  return (
    <div className="App">
      <h1>Hello from the frontend!</h1>
      <button type="button" onClick={updateMessageHandler}>
        Update Message
      </button>
      {message && <p>{message}</p>}
      <div id="treeWrapper" style={{ width: '50em', height: '20em' }}>
        <Tree data={treeNodes} />
      </div>
    </div>
  );
}

export default App;
