# C-React

## Custom Renderer & Visualizer for Modern React

C-React is an open-source tool that visualizes DOM components as a tree, marks rendering patterns on web pages, and displays performance metrics.

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

<br>
<br>

## C-React Chrome DevTool

### Option 1: Install C-React DevTool from the Chrome Web Store

1. Open your React application, or any website

2. Open Chrome Developer Tools and click on the C-React panel

3. Watch the tree update dynamically as you navigate through your web page

4. Click on tree nodes to see corresponding element highted on your web page, if using our custom renderer

### Option 2: Install C-React DevTool locally

1. Clone this repo onto your local machine

2. Go to Chrome Extensions for manual installation (chrome://extensions/)

3. Click on Load unpacked

4. Select react-visualizer/chrome-extension/build/ to load this extension

https://github.com/oslabs-beta/react-visualizer/assets/110554407/1b87bcb1-8c9b-4335-833b-99363ba7e27a

