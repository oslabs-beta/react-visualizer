import { OpaqueHandle } from 'react-reconciler';

export interface OpaqueHandleInterface extends OpaqueHandle {
  return: OpaqueHandleInterface | null;
  tag: number | null;
  lanes: number | null;
}

export interface HTMLElementInterface extends HTMLElement {
  placeholder?: string;
  src?: string;
}
