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
