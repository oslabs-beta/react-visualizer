/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { HostConfig } from 'react-reconciler';
import { DefaultEventPriority } from 'react-reconciler/constants';
import createDOMElements from './createDOMElements';

const getHostConfig: HostConfig = () => ({
  createInstance: (
    type,
    props,
    rootContainerInstance,
    hostContext,
    internalInstanceHandle
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  ) => createDOMElements(type, props, internalInstanceHandle),

  createTextInstance: (
    text,
    rootContainerInstance,
    hostContext,
    internalInstanceHandle
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  ) => document.createTextNode(text),
  appendChildToContainer: (container, child) => {
    container.appendChild(child);
  },
  appendChild: (parent, child) => {
    parent.appendChild(child);
  },
  appendInitialChild: (parent, child) => {
    parent.appendChild(child);
  },
  insertBefore: (parentInstance, child, beforeChild) => {
    parentInstance.insertBefore(child, beforeChild);
  },
  insertInContainerBefore: (container, child, beforeChild) => {
    container.insertBefore(child, beforeChild);
  },
  removeChild: (parentInstance, child) => {
    parentInstance.removeChild(child);
  },
  removeChildFromContainer: (container, child) => {
    container.removeChild(child);
  },
  //
  now: Date.now,
  getRootHostContext: () => {},
  prepareForCommit: () => {},
  resetAfterCommit: () => {},
  getChildHostContext: () => {},
  shouldSetTextContent: () => {},
  clearContainer: () => {},
  prepareUpdate: (
    instance,
    type,
    oldProps,
    newProps,
    rootContainer,
    hostContext
  ) => {},
  commitUpdate: (
    instance,
    updatePayload,
    type,
    prevProps,
    nextProps,
    internalHandle
  ) => {
    if (isTransition(internalHandle)) {
      // eslint-disable-next-line no-param-reassign
      instance.style.backgroundColor = '#66ff99';
      instance.classList.add('c-Transition');
    }
  },
  commitTextUpdate: (textInstance, oldText, newText) => {
    // eslint-disable-next-line no-param-reassign, @typescript-eslint/no-unsafe-assignment
    textInstance.nodeValue = newText;
  },
  finalizeInitialChildren: () => {},
  shouldDeprioritizeSubtree: (type, nextProps) => !nextProps.hidden,
  detachDeletedInstance: () => {},
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  getCurrentEventPriority: () => DefaultEventPriority,
  hideInstance: () => {},
  unhideInstance: () => {},
  commitMount: (instace, type, props, internalInstanceHandle) => {},
  supportsMutation: true,
});

export default getHostConfig;
