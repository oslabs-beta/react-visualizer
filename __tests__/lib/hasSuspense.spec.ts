import { FiberTags } from 'enums';
import { OpaqueHandleInterface } from 'interfaces';
import hasSuspense from '../../src/lib/hasSuspense';

describe('hasSuspense', () => {
  it('should return true if a fiber tag for suspense is found', () => {
    const fakeInternalInstanceHandle: OpaqueHandleInterface = {
      tag: FiberTags.suspense,
      lane: 8,
      return: null,
    };

    const foundSuspense = hasSuspense(fakeInternalInstanceHandle);
    expect(foundSuspense).toBe(true);
  });

  it('should return false if a fiber tag for suspense is not found', () => {
    const nonSuspenseFiberTag = 0;

    const fakeInternalInstanceHandle: OpaqueHandleInterface = {
      tag: nonSuspenseFiberTag,
      lane: 8,
      return: null,
    };

    const foundSuspense = hasSuspense(fakeInternalInstanceHandle);
    expect(foundSuspense).toBe(false);
  });
});
