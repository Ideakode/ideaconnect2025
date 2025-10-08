import { logErrors } from "./logs/logs.js";
import { agentInitialization } from "./useCases/state/state.js";

try {
  agentInitialization.execute();
} catch (error: unknown) {
  logErrors.send("index.ts", error);
}

export default "";
