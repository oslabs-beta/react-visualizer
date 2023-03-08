import { FiberTags } from 'enums';
import { OpaqueHandleAlias } from 'interfaces';
import hasSuspense from '../../src/lib/hasSuspense';

describe('hasSuspense', () => {
  it('should return true if a fiber tag for suspense is found', () => {
    const fakeInternalInstanceHandle: OpaqueHandleAlias = {
      tag: FiberTags.suspense,
      return: null,
    };

    const foundSuspense = hasSuspense(fakeInternalInstanceHandle);
    expect(foundSuspense).toBe(true);
  });

  it('should return false if a fiber tag for suspense is not found', () => {
    const nonSuspenseFiberTag = 0;

    const fakeInternalInstanceHandle: OpaqueHandleAlias = {
      tag: nonSuspenseFiberTag,
      return: null,
    };

    const foundSuspense = hasSuspense(fakeInternalInstanceHandle);
    expect(foundSuspense).toBe(false);
  });
});
