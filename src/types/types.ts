import { Fiber, OpaqueHandle } from 'react-reconciler';

export type Message = string;

export interface OpaqueHandleAlias extends OpaqueHandle {
  return: Fiber | null;
  tag: number | null;
}

export enum FiberTags {
  suspense = 13,
}
