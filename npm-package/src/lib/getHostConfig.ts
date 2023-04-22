/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { HostConfig } from 'react-reconciler';
import { DefaultEventPriority } from 'react-reconciler/constants';
import createDOMElements, { setStyles, isEvent } from './createDOMElements';
import { Props } from '../types/types';

// eslint-disable-next-line consistent-return
function shallowDiff(oldProps, newProps): Props[] {
  // Return a diff between the new and the old object

  const uniqueProps = new Set([
    ...Object.keys(oldProps),
    ...Object.keys(newProps),
  ]);
  const changedProps = Array.from(uniqueProps).filter(
    // maybe add some logic to handle cases where the the probs are deeply identical

    (propName) => {
      if (
        typeof oldProps[propName] === 'function' &&
        typeof newProps[propName] === 'function'
      ) {
        return oldProps[propName].toString() !== newProps[propName].toString();
      }
      return oldProps[propName] !== newProps[propName];
    }
  );
  if (changedProps.length !== 0) return changedProps;
}

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
  ) => shallowDiff(oldProps, newProps),
  commitUpdate: (
    instance,
    updatePayload,
    type,
    oldProps,
    newProps,
    internalHandle
  ) => {
    updatePayload.forEach((propName) => {
      // children changes is done by the other methods like `commitTextUpdate`
      if (propName === 'children') {
        const propValue = newProps[propName];
        if (typeof propValue === 'string' || typeof propValue === 'number') {
          domElement.textContent = propValue;
        }
        return;
      }

      if (propName === 'style') {
        // Return a diff between the new and the old styles
        const styleDiffs = shallowDiff(oldProps.style, newProps.style);
        const finalStyles = styleDiffs.reduce((acc, styleName) => {
          if (!newProps.style[styleName]) acc[styleName] = '';
          else acc[styleName] = newProps.style[styleName];

          return acc;
        }, {});

        setStyles(domElement, finalStyles);
      } else if (newProps[propName] || typeof newProps[propName] === 'number') {
        if (isEvent(propName, domElement)) {
          const eventName = propName.toLowerCase().replace('on', '');
          domElement.removeEventListener(eventName, oldProps[propName]);
          domElement.addEventListener(eventName, newProps[propName]);
        } else {
          domElement.setAttribute(propName, newProps[propName]);
        }
      } else if (isEvent(propName, domElement)) {
        const eventName = propName.toLowerCase().replace('on', '');
        domElement.removeEventListener(eventName, oldProps[propName]);
      } else {
        domElement.removeAttribute(propName);
      }
    });
  },
  commitTextUpdate: (textInstance, oldText, newText) => {
    // eslint-disable-next-line no-param-reassign, @typescript-eslint/no-unsafe-assignment
    textInstance.nodeValue = newText;
  },
  finalizeInitialChildren: () => {},
  shouldDeprioritizeSubtree: (type, nextProps) => !nextProps.hidden,
  detachDeletedInstance: () => {},
  getPublicInstance: () => {},
  preparePortalMount: () => {},
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  getCurrentEventPriority: () => DefaultEventPriority,
  hideInstance: () => {},
  unhideInstance: () => {},
  commitMount: (instace, type, props, internalInstanceHandle) => {},
  supportsMutation: true,
});

export default getHostConfig;
