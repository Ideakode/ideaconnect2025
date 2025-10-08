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
