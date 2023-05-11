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
      try {
        if (propName === 'children') {
          const propValue = newProps[propName];
          if (typeof propValue === 'string' || typeof propValue === 'number') {
            // eslint-disable-next-line no-param-reassign
            instance.textContent = propValue;
          }
          return;
        }

        if (propName === 'style') {
          const styleDiffs = shallowDiff(oldProps.style, newProps.style);

          if (styleDiffs) {
            const finalStyles = styleDiffs.reduce((acc, styleName) => {
              if (!newProps.style[styleName]) acc[styleName] = '';
              else acc[styleName] = newProps.style[styleName];

              return acc;
            }, {});

            setStyles(instance, finalStyles);
            return;
          }
        }

        if (isEvent(propName, instance)) {
          const eventName = propName.toLowerCase().replace('on', '');
          if (typeof oldProps[propName] === 'function') {
            instance.removeEventListener(eventName, oldProps[propName]);
          }

          if (['focus', 'blur', 'focusin', 'focusout'].includes(eventName)) {
            if (typeof newProps[propName] === 'function') {
              instance.addEventListener(eventName, (e) => {
                newProps[propName](e);
              });
            }
          } else if (typeof newProps[propName] === 'function') {
            instance.addEventListener(eventName, newProps[propName]);
          }
        } else if (typeof newProps[propName] !== 'undefined') {
          instance.setAttribute(propName, newProps[propName]);
        } else {
          instance.removeAttribute(propName);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error in updatePayload');
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
  scheduleTimeout: () => {},
  supportsMutation: true,
});

export default getHostConfig;
