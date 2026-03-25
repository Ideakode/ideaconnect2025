/**
 * @file agentDisconnected.ts
 * @class agentDisconnected
 *
 * @description
 * Handles the agent disconnect socket event. Triggered by socketEventHandler
 * when a socket in the /AGENT namespace disconnects.
 *
 * Sequence:
 * 1. Parses commonParams and the disconnected socket.
 * 2. Verifies the agent exists in storeA (guards against double-disconnect).
 * 3. Removes the agent from storeA.
 * 4. If removal succeeded, fetches the updated list of agents available to
 *    strangers and broadcasts it to all connected strangers via socketSS.
 *
 * @staticMethods
 * - execute(cParamsData, socketData, reasonData)  Main handler, called by socketEventHandler.
 *
 * @see storeAgentService    — removeAgent, getAvailableAgentsForStranger
 * @see socketStrangerService — notifyAvailableAgents (broadcast)
 * @see interfaceHelper      — transformToIPeers
 */
import * as constants from "../../../constants/constants.js";
import { socketSS, storeAS } from "../../../services/services.js";
import {
  interfaceHelper,
  parserHelper,
  validatorHelper,
} from "../../../helpers/helpers.js";
import { logger } from "../../../logs/logs.js";
import { useCaseErrors } from "../../useCaseErrors.js";

export class agentDisconnected {
  public static execute(
    cParamsData: unknown /* ICommonParams.commonParams */,
    socketData: unknown /* Socket */,
    reasonData: unknown /* string */
  ) {
    const className = "agentDisconnected";
    logger.log(className, "UseCase - " + className);
    try {
      const reason = reasonData as string;
      logger.log(className, "Use Case - agentDisconnected. Reason: " + reason);
      const peerA = constants.peerTypes.AGENT;
      const cParams = parserHelper.parseCommonParamsInterface(cParamsData);
      const socket = parserHelper.parseSocket(socketData);
      validatorHelper.checkIO(cParams.io);
      validatorHelper.checkStore(cParams.storeAgent, peerA);
      const io = cParams.io;
      const storeA = cParams.storeAgent;
      validatorHelper.checkPeerInStore(socket.id, peerA, storeA);

      // remove from Store
      const removed = storeAS.removeAgent(socket.id, storeA);

      if (removed) {
        const agents = interfaceHelper.transformToIPeers(
          storeAS.getAvailableAgentsForStranger(storeA)
        );
        socketSS.notifyAvailableAgents(io, "", agents, true);
      }
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
