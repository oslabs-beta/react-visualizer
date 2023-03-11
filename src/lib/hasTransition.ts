import { FiberLanes } from 'enums';

const hasTransition = (laneNum: number): boolean =>
  laneNum >= FiberLanes.TransitionHyrdationLane &&
  laneNum <= FiberLanes.TransitionLane16;

export default hasTransition;
