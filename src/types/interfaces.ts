import { OpaqueHandle } from 'react-reconciler';

export interface OpaqueHandleInterface extends OpaqueHandle {
  return: OpaqueHandleInterface | null;
  tag: number | null;
  lanes: number | null;
}
