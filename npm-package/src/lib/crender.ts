/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import ReactReconciler from 'react-reconciler';
import getHostConfig from './getHostConfig';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const hostConfig = getHostConfig();
const reconciler = ReactReconciler(hostConfig);

const cRender = (element, container) => {
  console.log('testing');
  const fiberRoot = reconciler.createContainer(container, 1, true, true);
  reconciler.updateContainer(element, fiberRoot, null, null);
};

export default cRender;
