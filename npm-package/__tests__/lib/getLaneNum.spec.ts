import { OpaqueHandleInterface } from 'interfaces';
import getLaneNum from '../../src/lib/getLaneNum';

describe('getLaneNum', () => {
  it('should get the correct lane number', () => {
    const fakeInternalInstanceHandle: OpaqueHandleInterface = {
      tag: 0,
      lanes: 0,
      return: null,
    };

    const fakeInternalInstanceHandle2: OpaqueHandleInterface = {
      tag: 0,
      lanes: 0,
      return: {
        tag: 0,
        lanes: 256,
        return: null,
      },
    };

    expect(getLaneNum(fakeInternalInstanceHandle)).toEqual(0);
    expect(getLaneNum(fakeInternalInstanceHandle2)).toEqual(8);
  });
});
