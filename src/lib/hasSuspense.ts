import { FiberTags } from '../types/enums';
import { OpaqueHandleInterface } from '../types/interfaces';

const hasSuspense = (
  internalInstanceHandle: OpaqueHandleInterface
): boolean => {
  let fiber = internalInstanceHandle;
  let traversalCount = 0;
  const traversalLimit = 5;

  while (fiber && traversalCount < traversalLimit) {
    if (fiber.tag === FiberTags.suspense) {
      return true;
    }

    fiber = fiber.return as unknown as OpaqueHandleInterface;
    traversalCount += 1;
  }

  return false;
};

export default hasSuspense;
