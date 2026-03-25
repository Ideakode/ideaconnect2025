/**
 * @file usesCases.ts
 *
 * @description
 * Barrel that aggregates all use-case sub-module exports:
 * - call         — all call lifecycle use cases
 * - notification — server notification use cases
 * - state        — initialization and connection state use cases
 * - webRtc       — WebRTC signaling and data channel use cases
 * - useCaseErrors — shared error handler for use cases
 */
export * as call from "./call/call.js";
export * as notification from "./notification/notification.js";
export * as state from "./state/state.js";
export * as webRtc from "./webRtc/webRtc.js";
export * from "./useCaseErrors.js";
