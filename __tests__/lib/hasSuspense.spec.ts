import { FiberTags } from 'enums';
import { OpaqueHandleAlias } from 'interfaces';
import hasSuspense from '../../src/lib/hasSuspense';

describe('hasSuspense', () => {
  it('should return true if a suspense fiber tag is found', () => {
    const fakeInternalInstanceHandle: OpaqueHandleAlias = {
      tag: FiberTags.suspense,
      return: null,
    };

    const foundSuspense = hasSuspense(fakeInternalInstanceHandle);
    expect(foundSuspense).toBe(true);
  });

  it('should return false if a suspense fiber tag is not found', () => {
    const fakeInternalInstanceHandle: OpaqueHandleAlias = {
      tag: 0,
      return: null,
    };

    const foundSuspense = hasSuspense(fakeInternalInstanceHandle);
    expect(foundSuspense).toBe(false);
  });
});
