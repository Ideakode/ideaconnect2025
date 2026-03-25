/**
 * @file index.ts
 *
 * @description
 * Server entry point. Bootstraps all server components in sequence:
 * 1. Creates the HTTP/HTTPS web server and begins listening.
 * 2. Instantiates the in-memory agent store (storeA) and stranger store (storeS).
 * 3. Creates the Socket.IO server, wrapping the HTTP server instance.
 * 4. Builds the shared commonParams context object from the IO server and both stores.
 * 5. Executes agentInitialization to register the /AGENT namespace and begin accepting agents.
 * 6. Executes strangerInitialization to register the /STRANGER namespace and begin accepting strangers.
 *
 * All errors thrown during bootstrap are caught and logged to the console.
 *
 * @see webServerClass     — Express + HTTP/HTTPS server
 * @see socketServerClass  — Socket.IO server wrapper
 * @see storeAgentClass    — In-memory agent store
 * @see storeStrangerClass — In-memory stranger store
 * @see ICommonParams      — Shared context object
 * @see agentInitialization
 * @see strangerInitialization
 */
import { storeS, storeA, webServer, socketServer } from "./classes/classes.js";
import { agentInitialization } from "./useCases/agent/state/agentInitialization.js";
import { strangerInitialization } from "./useCases/stranger/state/strangerInitialization.js";
import { logger } from "./logs/logs.js";
import { ICommonParams } from "./interfaces/interfaces.js";

try {
  // Create HTTP Server
  const myHttpServer = new webServer();

  myHttpServer.listen((port) => {
    logger.log("", `Server is listening on http://localhost:${port}`);
  });

  //Create stores
  const storeAgents = new storeA();
  const storeStrangers = new storeS();

  const mysocketIOServer = new socketServer(
    myHttpServer.getWebServerInstance()
  );

  const commonParams = ICommonParams.getCommonParams(
    mysocketIOServer.io,
    storeAgents,
    storeStrangers
  );
  agentInitialization.execute(commonParams);
  strangerInitialization.execute(commonParams);
} catch (e) {
  console.error("Not created server error was catched", e);
}
