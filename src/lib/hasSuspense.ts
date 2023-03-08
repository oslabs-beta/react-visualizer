import { FiberTags } from 'enums';
import { OpaqueHandleAlias } from 'interfaces';

const hasSuspense = (internalInstanceHandle: OpaqueHandleAlias): boolean => {
  let fiber = internalInstanceHandle;
  let traversalCount = 0;
  const traversalLimit = 5;

  while (fiber && traversalCount < traversalLimit) {
    if (fiber.tag === FiberTags.suspense) {
      return true;
    }

    fiber = fiber.return as OpaqueHandleAlias;
    traversalCount += 1;
  }

  return false;
};

export default hasSuspense;
