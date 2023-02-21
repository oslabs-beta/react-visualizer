import React, { useState } from 'react';
import './App.css';
import { Message } from 'types';

function App(): JSX.Element {
  const [message, setMessage] = useState<Message>('');

  const updateMessageHandler = async (): Promise<void> => {
    try {
      const response = await fetch('/api');
      const message = await response.text();
      setMessage(message);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="App">
      <p>Hello from the frontend!</p>
      <button onClick={updateMessageHandler}>Update Message</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
