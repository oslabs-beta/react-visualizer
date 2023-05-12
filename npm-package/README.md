# C-React

## Custom Renderer & Visualizer for Modern React

C-React is an open-source tool that marks and visualizes concurrent rendering patterns on web pages, differentiates between server-side rendered and client-side rendered components, and displays performance metrics.

### Getting Started

#### Download NPM Package

1. Install `creact-visualizer` via NPM:

```sh
npm install creact-visualizer
```

2. Import `cRender` into your root file:

```js
import cRender from 'creact-visualizer';
```

3. Render your root component using the `cRender`:

```js
import React from 'react';
import App from './App';
import cRender from 'creact-visualizer';

const root = document.getElementById('root');

cRender(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  root
);
```
