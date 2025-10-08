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
