/**
 * @file agentConnected.ts
 * @class agentConnected
 *
 * @description
 * Use case triggered by the Socket.IO CONNECT event. Handles the agent's post-connection
 * sync with the server, ensuring the server's view of this agent's availability matches
 * the locally stored flags (important for recovery after an abnormal disconnect).
 *
 * @flow
 * CONNECT → agentConnected.execute(cParams)
 *   1. Reads the current availableForClients flag from the store
 *   2. Emits AGENT_AVAILABLE for both STRANGER and AGENT peer types to re-sync with the server
 *   3. Emits TOTAL_STRANGERS request to get a fresh connected-strangers count
 *
 * @errorHandling  useCaseErrors.executeDefault (logs, does not rethrow)
 *
 * @see socketEventMapping      - registers this as the CONNECT callback
 * @see socketAgentService.notifyAgentAvailable
 * @see socketAgentService.requestTotalStrangers
 */
import * as constants from "../../constants/constants.js";
import { storeASvc, socketASvc } from "../../services/services.js";
import { useCaseErrors } from "../usesCases.js";
import { logger } from "../../logs/logs.js";
import { parserAHelper } from "../../helpers/helpers.js";

export class agentConnected {
  public static execute(cParamsData: unknown /*commonParamsInterface*/) {
    const className = "agentConnected";
    logger.log(className, "UseCase - " + className);
    try {
      const parser = parserAHelper;
      const peerA = constants.peerTypes.AGENT;
      const peerS = constants.peerTypes.STRANGER;

      const cParams = parser.parseCommonParamsInterface(cParamsData);
      const store = parser.parseStoreAgent(cParams.store);
      const socket = parser.parseSocket(storeASvc.getSocket(store));

      //Sync status with server (needed to fix sync issue when abnormal disconnect happens)
      const allow = storeASvc.getAllowConnectionStatus(peerS, store);
      socketASvc.notifyAgentAvailable(socket, allow, peerS);
      socketASvc.notifyAgentAvailable(socket, allow, peerA);
      //request fresh Total Strangers connected to the site
      socketASvc.requestTotalStrangers(socket);
    } catch (error: unknown) {
      const method = "execute";
      useCaseErrors.executeDefault(className, method, error);
    }
  }

  /* public static handleError(error: unknown) {
    const method = this.handleError.name;
    errorHandler.wrapErrorUseCase(this.name, error, method);
  } */
}
