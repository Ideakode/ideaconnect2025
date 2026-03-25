/**
 * @file services.ts
 *
 * @description
 * Barrel that re-exports all four stranger services under short aliases
 * used throughout the use cases and event handlers:
 * - socketSSvc  — socketStrangerService
 * - storeSSvc   — storeStrangerService
 * - uiSSvc      — uiStrangerService
 * - webRtcSSvc  — webRTCStrangerService
 */
export { socketStrangerService as socketSSvc } from "./socketStranger.service.js";
export { storeStrangerService as storeSSvc } from "./storeStranger.service.js";
export { default as uiSSvc } from "./uiStranger.service.js";
export { default as webRtcSSvc } from "./webRtcStranger.service.js";
