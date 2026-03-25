/**
 * @file index.ts
 *
 * @description
 * Entry point for the Stranger module. Bootstraps the stranger experience
 * by calling strangerInitialization.execute(), which sets up the store,
 * initializes the UI, and connects the socket to the stranger namespace.
 * Any uncaught error is wrapped by errorHandler.wrapErrorBase.
 */
import { errorHandler } from "./errors/errors.js";
import { strangerInitialization } from "./useCases/state/state.js";

try {
  strangerInitialization.execute();
} catch (error: unknown) {
  const index = "index.ts";
  errorHandler.wrapErrorBase(index, error, "index");
}
export default "";
