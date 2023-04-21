import {
  HTMLElementInterface,
  OpaqueHandleInterface,
  RenderElementsProps,
} from '../types/interfaces';
import { Type, Props } from '../types/types';
import getLaneNum from './getLaneNum';
import hasSuspense from './hasSuspense';
import hasTransition from './hasTransition';
import setTransitionColor from './setTransitionColor';

//helper functions 

export const setStyles = (props: Props, element: HTMLElement): void => {
  Object.keys(props.style).forEach((propName) => {
      (element.style as Record<string, any>)[propName.toLowerCase()] = props.style[propName];
  });
}

export const isEvent = (key:string, element:HTMLElement): boolean => {
  return key.startsWith("on") && (key.toLowerCase() in element) ; 
}


const createDOMElements = (
  type: Type,
  props: RenderElementsProps,
  internalInstanceHandle: OpaqueHandleInterface
): HTMLElementInterface => {


  const element = document.createElement(type);
      
  element.setAttribute("loadtime", internalInstanceHandle.actualDuration.toFixed(2).toString()); 

    for (const [propName, propValue] of Object.entries(props)) { 
        if (propName === "children") continue; 
        else if (propName === "style") {
            setStyles(props, element);
        } else if (propName === 'className') {
            element.setAttribute('class', propValue)
        } else if (isEvent(propName, element)) {
            const eventName = propName.toLowerCase().replace('on', '')
            element.addEventListener(eventName, propValue); 
            if (type === 'input' && propName === "onChange") element.addEventListener('input', propValue)
        }
        else if (propName in element) element.setAttribute(propName, propValue); 
    }

  if (hasSuspense(internalInstanceHandle)) {
    element.style.border = 'solid lightblue';
    element.classList.add('Suspense');
  }

  const laneNum = getLaneNum(internalInstanceHandle);

  if (hasTransition(laneNum)) {
    element.style.backgroundColor = setTransitionColor(laneNum);
    element.classList.add(`TransitionLane${laneNum - 6}`);
  }

  return element;
};

export default createDOMElements;
