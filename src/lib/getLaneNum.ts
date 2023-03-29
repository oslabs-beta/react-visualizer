import { OpaqueHandleInterface } from 'interfaces';

const getLaneNum = (internalInstanceHandle: OpaqueHandleInterface): number => {
  let count = 0;
  let fiber = internalInstanceHandle;
  while (fiber && count < 10) {
    if (fiber.lanes !== null) {
      const laneNum = Math.log2(fiber.lanes);
      if (laneNum > -Infinity) {
        return laneNum;
      }
    }
    fiber = fiber.return as OpaqueHandleInterface;
    count += 1;
  }
  return 0;
};

export default getLaneNum;
