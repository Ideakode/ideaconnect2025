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
