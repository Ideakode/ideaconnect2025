/**
 * @file index.ts (agent)
 *
 * @description
 * Entry point for the agent client bundle. Bootstraps the entire agent-side application
 * by calling agentInitialization.execute(), which creates the store, initializes the UI,
 * and establishes the Socket.IO connection.
 * Any uncaught error from initialization is logged via logErrors and swallowed so the
 * browser does not display an unhandled exception.
 *
 * @see agentInitialization  - (useCases/state/agentInitialization.ts) the bootstrap use case
 */
import { logErrors } from "./logs/logs.js";
import { agentInitialization } from "./useCases/state/state.js";

try {
  agentInitialization.execute();
} catch (error: unknown) {
  logErrors.send("index.ts", error);
}

export default "";
