/**
 * @file peerInfo.ts
 * @class peerInfo
 *
 * @description
 * Use case triggered when the server sends a PEER_INFO server notification,
 * which delivers the agent's own profile data (name) after connection.
 * Updates the agent name displayed in the dashboard.
 *
 * @flow
 * serverNotification (PEER_INFO) → peerInfo.execute(cParams, IPeer.peer)
 *   1. Validates commonParams and storeAgent
 *   2. parserAHelper.parsePeerInterface(data)  — typed IPeer.peer
 *   3. uiAgentService.setAgentName(peerInfo.peerName)  — updates dashboard label
 *
 * @errorHandling  useCaseErrors.executeDefault (logs, does not rethrow)
 *
 * @see serverNotification — dispatches to this on PEER_INFO type
 * @see uiAgentService.setAgentName — updates the name display in the dashboard
 */
import { IPeer, ICommonParams } from "../../interfaces/interfaces.js";
import { uiASvc } from "../../services/services.js";
import { useCaseErrors } from "../usesCases.js";
import { logger } from "../../logs/logs.js";
import { parserAHelper, validatorAHelper } from "../../helpers/helpers.js";

//Agent received a notification of Total Strangers Connected to the Site
export class peerInfo {
  public static execute(cParams: ICommonParams.commonParams, data: IPeer.peer) {
    const className = "peerInfo";
    logger.log(className, "UseCase - " + className);

    try {
      const parser = parserAHelper;
      const validator = validatorAHelper;

      validator.checkCommonParamsInterface(cParams);
      validator.checkStoreAgent(cParams.store);

      const peerInfo = parser.parsePeerInterface(data);
      uiASvc.setAgentName(peerInfo.peerName);
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
