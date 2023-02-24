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
