/**
 * @file state.ts (useCases/state)
 *
 * @description
 * Barrel that re-exports the two state lifecycle use cases:
 * - strangerConnected      — handles the socket CONNECT event
 * - strangerInitialization — module bootstrap use case
 */
export * from "./strangerConnected.js";
export * from "./strangerInitialization.js";
