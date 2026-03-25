/**
 * @file notification.ts (useCases/notification)
 *
 * @description
 * Barrel that re-exports the two server notification use cases:
 * - availableAgents    — updates the store and UI with the latest agent list
 * - serverNotification — dispatcher that routes incoming notifications by type
 */
export * from "./availableAgents.js";
export * from "./serverNotification.js";
