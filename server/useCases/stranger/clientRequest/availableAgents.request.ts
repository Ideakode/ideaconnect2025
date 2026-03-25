/**
 * @file availableAgents.request.ts
 * @class availableAgentsRequest
 *
 * @description
 * Handles a stranger's request for the current list of available agents.
 * Called by clientRequest (stranger) when the request type is AVAILABLE_AGENTS.
 *
 * Sequence:
 * 1. Validates commonParams, IO, both stores, and the requesting stranger's presence.
 * 2. Fetches available agents from storeAgentService.getAvailableAgentsForStranger.
 * 3. Transforms the result to IPeers via interfaceHelper.
 * 4. Sends an AVAILABLE_AGENTS SERVER_NOTIFICATION to the requesting stranger only.
 *
 * @staticMethods
 * - execute(cParams, socket)  Main handler, called by clientRequest (stranger).
 *
 * @see storeAgentService     — getAvailableAgentsForStranger
 * @see socketStrangerService — notifyAvailableAgents (unicast)
 * @see interfaceHelper       — transformToIPeers
 */
import * as constants from "../../../constants/constants.js";
import type { Socket } from "socket.io";
import { interfaceHelper, validatorHelper } from "../../../helpers/helpers.js";
import { socketSS, storeAS } from "../../../services/services.js";
import { ICommonParams } from "../../../interfaces/interfaces.js";
import { useCaseErrors } from "../../useCaseErrors.js";
import { logger } from "../../../logs/logs.js";

export class availableAgentsRequest {
  public static execute(cParams: ICommonParams.commonParams, socket: Socket) {
    const className = "availableAgentsRequest";
    logger.log(className, "UseCase - " + className);
    try {
      const peerS = constants.peerTypes.STRANGER;
      const peerA = constants.peerTypes.AGENT;
      validatorHelper.checkCommonParamsInterface(cParams);
      const io = cParams.io;
      const storeS = cParams.storeStranger;
      const storeA = cParams.storeAgent;
      validatorHelper.checkIO(io);
      validatorHelper.checkStore(storeA, peerA);
      validatorHelper.checkStore(storeS, peerS);
      validatorHelper.checkSocket(socket);
      validatorHelper.checkPeerInStore(socket.id, peerS, storeS);

      const agents = storeAS.getAvailableAgentsForStranger(storeA);
      const agentsIF = interfaceHelper.transformToIPeers(agents);
      socketSS.notifyAvailableAgents(io, socket.id, agentsIF, false);
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
