/**
 * @file agentInitialization.ts
 * @class agentInitialization
 *
 * @description
 * Bootstrap use case. The first and only use case called from index.ts.
 * Performs the complete startup sequence for the agent client in a single execute() call:
 *   1. Creates a fresh storeAgentClass instance via storeAgentService.createStore()
 *   2. Wraps it in a commonParams object
 *   3. Initializes the agent UI (root container + allowConnections checkboxes)
 *      via uiAgentService.initializeUI()
 *   4. Creates the Socket.IO socket on the /agent namespace and registers all
 *      socket event listeners via socketService.initService()
 *
 * @flow
 * index.ts → agentInitialization.execute()
 *   → storeAgentService.createStore()
 *   → uiAgentService.initializeUI(cParams)
 *   → socketAgentService.initService(cParams, socketEventMapping, "/agent", "agent")
 *     → socketEventHandler.registerEvents(cParams, socketEventMapping)
 *
 * @errorHandling  useCaseErrors.executeDefault (logs, does not rethrow)
 *
 * @see socketEventMapping  - the event map passed to initService
 * @see uiAgentService      - initializes the DOM
 */
import * as constants from "../../constants/constants.js";
import { ICommonParams } from "../../interfaces/interfaces.js";
import { storeASvc, socketASvc, uiASvc } from "../../services/services.js";
import { socketEventMapping } from "../../eventHandlers/eventHandlers.js";
import { useCaseErrors } from "../usesCases.js";
import { logger } from "../../logs/logs.js";

export class agentInitialization {
  public static execute() {
    const className = "agentInitialization";
    logger.log(className, "UseCase - " + className);
    try {
      const nspc = constants.socketIO.namespaces.AGENT;
      const peerType = constants.peerTypes.AGENT;
      const storeAgent = storeASvc.createStore();
      const cParams = ICommonParams.getCommonParams(storeAgent);
      const socketEvMap = socketEventMapping;
      //initalize the UI passing store instance
      uiASvc.initializeUI(cParams);
      //Initializes the Socket passing store, eventMapping and the type of Agent
      socketASvc.initService(cParams, socketEvMap, nspc, peerType);
    } catch (error: unknown) {
      const method = "execute";
      useCaseErrors.executeDefault(className, method, error);
    }
  }
}
