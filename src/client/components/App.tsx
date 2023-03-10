/* eslint-disable prefer-arrow-callback */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable vars-on-top */
/* eslint-disable func-names */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// @ts-nocheck
import React, { useState } from 'react';
import { Message } from 'types';
import './App.css';

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

  chrome.storage.local.get(['treeData'], (result) => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    console.log(`User is ${result.treeData}`);
    // you can use the variable or set to any state variable from here
  });

  const port = chrome.runtime.connect({name: "knockknock"});
  port.postMessage({joke: "Knock knock"});
  console.log(port.name);
  port.onMessage.addListener(function(msg) {
    console.log(msg.question);
    if (msg.question === "Who's there?")
      port.postMessage({answer: "Madame"});
    else if (msg.question === "Madame who?")
      port.postMessage({answer: "Madame... Bovary"});
  });

  return (
    <div className="App">
      <h1>Hello from the frontend!</h1>
      <button type="button" onClick={updateMessageHandler}>
        Update Message
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
