import { Fiber, OpaqueHandle } from 'react-reconciler';

export interface OpaqueHandleAlias extends OpaqueHandle {
  return: Fiber | null;
  tag: number | null;
}
