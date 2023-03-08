*** React Fiber Rendering SideEffect Tags ***

//Source code reference : https://github.com/facebook/react/blob/v18.2.0/packages/react-reconciler/src/ReactFiberFlags.js



export const NoFlags = /*           0          */ 0b00000000000000000000000;
export const PerformedWork = /*     1          */ 0b00000000000000000000001;

// You can change the rest (and add more).
export const Placement = /*         2          */ 0b00000000000000000000010;
export const Update = /*            4          */ 0b00000000000000000000100;
export const PlacementAndUpdate = /*           */ Placement | Update;
export const Deletion = /*          8          */ 0b00000000000000000001000;
export const ChildDeletion = /*     16         */ 0b00000000000000000010000;
export const ContentReset = /*      32         */ 0b00000000000000000100000;
export const Callback = /*          64         */ 0b00000000000000001000000;
export const DidCapture = /*        128        */ 0b00000000000000010000000;
export const ForceClientRender = /* 256        */ 0b00000000000000100000000;
export const Ref = /*               512        */ 0b00000000000001000000000;
export const Snapshot = /*          1024       */ 0b00000000000010000000000;
export const Passive = /*           2048       */ 0b00000000000100000000000;
export const Hydrating = /*         4096       */ 0b00000000001000000000000;
export const HydratingAndUpdate = /*           */ Hydrating | Update;
export const Visibility = /*        8192       */ 0b00000000010000000000000;
export const StoreConsistency = /*  16384      */ 0b00000000100000000000000;

export const LifecycleEffectMask = Passive | Update | Callback | Ref | Snapshot;

// Union of all commit flags (flags with the lifetime of a particular commit)
export const HostEffectMask = /*               */ 0b00000000000111111111111111;  32767

// These are not really side effects, but we still reuse this field.
// These are not really side effects, but we still reuse this field.
export const Incomplete = /*                   */ 0b00000000001000000000000000;  32768
export const ShouldCapture = /*                */ 0b00000000010000000000000000;  65536
export const ForceUpdateForLegacySuspense = /* */ 0b00000000100000000000000000;  131072
export const DidPropagateContext = /*          */ 0b00000001000000000000000000;  262144
export const NeedsPropagation = /*             */ 0b00000010000000000000000000;  524288
export const Forked = /*                       */ 0b00000100000000000000000000;  1048576

// Static tags describe aspects of a fiber that are not specific to a render,
// e.g. a fiber uses a passive effect (even if there are no updates on this particular render).
// This enables us to defer more work in the unmount case,
// since we can defer traversing the tree during layout to look for Passive effects,
// and instead rely on the static flag as a signal that there may be cleanup work.
export const RefStatic = /*                    */ 0b00001000000000000000000000;  2097152
export const LayoutStatic = /*                 */ 0b00010000000000000000000000;  4194304
export const PassiveStatic = /*                */ 0b00100000000000000000000000;  8388608

// These flags allow us to traverse to fibers that have effects on mount
// without traversing the entire tree after every commit for
// double invoking
export const MountLayoutDev = /*               */ 0b01000000000000000000000000;  16777216
export const MountPassiveDev = /*              */ 0b10000000000000000000000000;  33554432


https://github.com/facebook/react/blob/v18.2.0/packages/react-reconciler/src/ReactHookEffectTags.js

export const NoFlags = /*   */ 0b0000;

// Represents whether effect should fire.
export const HasEffect = /* */ 0b0001;

// Represents the phase in which the effect (not the clean-up) fires.
export const Insertion = /*  */ 0b0010;
export const Layout = /*    */ 0b0100;
export const Passive = /*   */ 0b1000;
