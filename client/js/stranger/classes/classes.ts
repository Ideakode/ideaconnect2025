/**
 * @file classes.ts
 *
 * @description
 * Barrel that re-exports the class tokens used across the stranger module.
 * - webRtc  — base WebRTC helper class from base/classes
 * - storeS  — storeStrangerClass (the stranger-specific store)
 */
export { webRtc } from "../../base/classes/classes.js";
export { storeStrangerClass as storeS } from "./storeStranger.class.js";
