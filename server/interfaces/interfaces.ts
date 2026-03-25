/**
 * @file interfaces.ts  (server/interfaces)
 *
 * @description
 * Barrel re-export for all server interfaces. Re-exports from
 * shared/interfaces/interfaces.ts (all shared interface namespaces) and
 * locally exposes ICommonParams from commonParams.interface.ts.
 */
export * from "../shared/interfaces/interfaces.js";
/* export * as IPeers from "./peers.interface.js"; */
export * as ICommonParams from "./commonParams.interface.js";
