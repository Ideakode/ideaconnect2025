import { errorHandler } from "./errors/errors.js";
import { strangerInitialization } from "./useCases/state/state.js";

try {
  strangerInitialization.execute();
} catch (error: unknown) {
  const index = "index.ts";
  errorHandler.wrapErrorBase(index, error, "index");
}
export default "";
