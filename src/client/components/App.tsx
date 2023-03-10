/* eslint-disable spaced-comment */
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

  //listening to content script connection
  chrome.runtime.onConnect.addListener(function(port) {
    //console.assert(port.name === "knockknock");
    port.onMessage.addListener(function(msg) {
      console.log(msg.joke);
      console.log(msg.answer);
      if (msg.joke === "Knock knock")
        port.postMessage({question: "Who's there?"});
      else if (msg.answer === "Madame")
        port.postMessage({question: "Madame who?"});
      else if (msg.answer === "Madame... Bovary")
        port.postMessage({question: "I don't get it."});
    });
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
