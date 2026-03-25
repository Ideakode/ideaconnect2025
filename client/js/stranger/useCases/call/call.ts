/**
 * @file call.ts (useCases/call)
 *
 * @description
 * Barrel that re-exports all call lifecycle use cases:
 * - callRequest    — stranger initiates an outgoing call
 * - callSignaling  — dispatcher for incoming call signaling events
 * - callAccepted   — remote agent accepted the call
 * - callRejected   — remote agent rejected the call
 * - callCancelled  — the calling party cancelled before answer
 * - callBusy       — remote agent is already in a call
 * - callNotFound   — target peer no longer exists on the server
 * - callHangedUp   — stranger hung up the outgoing call dialog
 * - callFailed     — shared teardown for any non-accepted call outcome
 * - callEnded      — stranger ends an active call
 */
export * from "./callAccepted.js";
export * from "./callBusy.js";
export * from "./callCancelled.js";
export * from "./callFailed.js";
export * from "./callHangedUp.js";
export * from "./callNotFound.js";
export * from "./callRejected.js";
export * from "./callRequest.js";
export * from "./callSignaling.js";
export * from "./callEnded.js";
