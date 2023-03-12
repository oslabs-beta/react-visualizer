import { Fiber, OpaqueHandle } from 'react-reconciler';

export interface OpaqueHandleInterface extends OpaqueHandle {
  return: Fiber | null;
  tag: number | null;
  lane: number | null;
}

export interface HTMLElementInterface extends HTMLElement {
  placeholder?: string;
  src?: string;
}
