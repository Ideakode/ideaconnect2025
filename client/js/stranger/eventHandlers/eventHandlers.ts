/**
 * @file eventHandlers.ts
 *
 * @description
 * Barrel that aggregates all event map exports for the stranger module:
 * - socketEventMapping  — socket.io event → use case bindings
 * - webRtcEventMapping  — WebRTC event → use case bindings
 * - base eventHandlers  — shared IEventMap / IEventsMap factory helpers
 */
export * from "./socketEventMapping.js";
export * from "./webRtcEventMapping.js";
export * from "../../base/eventHandlers/eventHandlers.js";
