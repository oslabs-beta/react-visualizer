import React, { useState } from 'react';
import './App.css';
import { Message } from 'types';

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
      <p>Hello from the frontend!</p>
      <button type="button" onClick={updateMessageHandler}>
        Update Message
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
