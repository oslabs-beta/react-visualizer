*** React Fiber Rendering Priority ***

// Source code reference : https://github.com/facebook/react/blob/9212d994ba939f20a04220a61e9776b488381596/packages/react-reconciler/src/ReactFiberLane.new.js

New priority feature with lane, introduced with React 18:

// Lane values below should be kept in sync with getLabelsForLanes(), used by react-devtools-scheduling-profiler.
// If those values are changed that package should be rebuilt and redeployed.

export const TotalLanes = 31;

export const NoLanes: Lanes = /*       0                */ 0b0000000000000000000000000000000;
export const NoLane: Lane = /*         0                */ 0b0000000000000000000000000000000;

export const SyncLane: Lane = /*       1                */ 0b0000000000000000000000000000001;

export const InputContinuousHydrationLane: Lane = /*  2 */ 0b0000000000000000000000000000010;
export const InputContinuousLane: Lanes = /*   4        */ 0b0000000000000000000000000000100;

export const DefaultHydrationLane: Lane = /*   8        */ 0b0000000000000000000000000001000;
export const DefaultLane: Lanes = /*    16              */ 0b0000000000000000000000000010000;

const TransitionHydrationLane: Lane = /*   32           */ 0b0000000000000000000000000100000;
const TransitionLanes: Lanes = /*     4194240           */ 0b0000000001111111111111111000000;
const TransitionLane1: Lane = /*      64                */ 0b0000000000000000000000001000000;
const TransitionLane2: Lane = /*      128               */ 0b0000000000000000000000010000000;
const TransitionLane3: Lane = /*      256               */ 0b0000000000000000000000100000000;
const TransitionLane4: Lane = /*      512               */ 0b0000000000000000000001000000000;
const TransitionLane5: Lane = /*      1024              */ 0b0000000000000000000010000000000;
const TransitionLane6: Lane = /*      2048              */ 0b0000000000000000000100000000000;
const TransitionLane7: Lane = /*      4096              */ 0b0000000000000000001000000000000;
const TransitionLane8: Lane = /*      8192              */ 0b0000000000000000010000000000000;
const TransitionLane9: Lane = /*      16384             */ 0b0000000000000000100000000000000;
const TransitionLane10: Lane = /*     32768             */ 0b0000000000000001000000000000000;
const TransitionLane11: Lane = /*     65536             */ 0b0000000000000010000000000000000;
const TransitionLane12: Lane = /*     131072            */ 0b0000000000000100000000000000000;
const TransitionLane13: Lane = /*     262144            */ 0b0000000000001000000000000000000;
const TransitionLane14: Lane = /*     524288            */ 0b0000000000010000000000000000000;
const TransitionLane15: Lane = /*     1048576           */ 0b0000000000100000000000000000000;
const TransitionLane16: Lane = /*     2097152           */ 0b0000000001000000000000000000000;

const RetryLanes: Lanes = /*       130023424            */ 0b0000111110000000000000000000000;
const RetryLane1: Lane = /*        4194304              */ 0b0000000010000000000000000000000;
const RetryLane2: Lane = /*        8388608              */ 0b0000000100000000000000000000000;
const RetryLane3: Lane = /*        16777216             */ 0b0000001000000000000000000000000;
const RetryLane4: Lane = /*        33554432             */ 0b0000010000000000000000000000000;
const RetryLane5: Lane = /*        67108864            */ 0b0000100000000000000000000000000;

export const SomeRetryLane: Lane = RetryLane1;

export const SelectiveHydrationLane: Lane = /*134217728 */ 0b0001000000000000000000000000000;

const NonIdleLanes = /* 268435455                      */ 0b0001111111111111111111111111111;

export const IdleHydrationLane: Lane = /*268435456     */ 0b0010000000000000000000000000000;
export const IdleLane: Lanes = /* 536870912             */ 0b0100000000000000000000000000000;

export const OffscreenLane: Lane = /* 1073741824        */ 0b1000000000000000000000000000000;




https://github.com/facebook/react/blob/v18.2.0/packages/react-reconciler/src/ReactWorkTags.js

export const FunctionComponent = 0;
export const ClassComponent = 1;
export const IndeterminateComponent = 2; // Before we know whether it is function or class
export const HostRoot = 3; // Root of a host tree. Could be nested inside another node.
export const HostPortal = 4; // A subtree. Could be an entry point to a different renderer.
export const HostComponent = 5;
export const HostText = 6;
export const Fragment = 7;
export const Mode = 8;
export const ContextConsumer = 9;
export const ContextProvider = 10;
export const ForwardRef = 11;
export const Profiler = 12;
export const SuspenseComponent = 13;
export const MemoComponent = 14;
export const SimpleMemoComponent = 15;
export const LazyComponent = 16;
export const IncompleteClassComponent = 17;
export const DehydratedFragment = 18;
export const SuspenseListComponent = 19;
export const ScopeComponent = 21;
export const OffscreenComponent = 22;
export const LegacyHiddenComponent = 23;
export const CacheComponent = 24;
export const TracingMarkerComponent = 25;



https://github.com/facebook/react/pull/18796


export type RootTag = 0 | 1;


https://github.com/facebook/react/blob/v18.2.0/packages/react-reconciler/src/ReactRootTags.js

export const LegacyRoot = 0;
export const ConcurrentRoot = 1;

https://github.com/facebook/react/blob/v18.2.0/packages/react-reconciler/src/ReactTypeOfMode.js


export type TypeOfMode = number;

export const NoMode = /*                         */ 0b000000;   0
// TODO: Remove ConcurrentMode by reading from the root tag instead
export const ConcurrentMode = /*                 */ 0b000001;   1
export const ProfileMode = /*                    */ 0b000010;   2
export const DebugTracingMode = /*               */ 0b000100;   4
export const StrictLegacyMode = /*               */ 0b001000;   8
export const StrictEffectsMode = /*              */ 0b010000;   16
export const ConcurrentUpdatesByDefaultMode = /* */ 0b100000;   32