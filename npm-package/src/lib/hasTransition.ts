import { FiberLanes } from '../types/enums';

const hasTransition = (laneNum: number): boolean =>
  laneNum >= FiberLanes.TransitionHydrationLane &&
  laneNum <= FiberLanes.TransitionLane16;

export default hasTransition;
