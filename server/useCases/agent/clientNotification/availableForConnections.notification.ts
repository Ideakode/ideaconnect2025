import { storeAS, socketSS } from "../../../services/services.js";
import { ICommonParams } from "../../../interfaces/interfaces.js";
import * as constants from "../../../constants/constants.js";
import {
  interfaceHelper,
  parserHelper,
  validatorHelper,
} from "../../../helpers/helpers.js";
import { logger } from "../../../logs/logs.js";
import { useCaseErrors } from "../../useCaseErrors.js";

/**
 * @file availableForConnections.notification.ts
 * @class availableForConnectionsNotification
 *
 * @description
 * Handles the AGENT_AVAILABLE client-notification. Called by clientNotification
 * when an agent sends a notification to update their availability status.
 *
 * Sequence:
 * 1. Parses and validates the allowConnections interface from the notification data.
 * 2. Calls storeAgentService.setAvailbleStatus to update the agent's flag in storeA.
 * 3. If the update succeeded and peerType is STRANGER, fetches the updated available
 *    agent list and broadcasts it to all strangers via socketSS.notifyAvailableAgents.
 * 4. If peerType is AGENT, logs a TODO (agent-to-agent availability not yet implemented).
 *
 * @staticMethods
 * - execute(cParams, data)  Main handler, called by clientNotification.
 *
 * @see storeAgentService    — setAvailbleStatus, getAvailableAgents
 * @see socketStrangerService — notifyAvailableAgents (broadcast)
 * @see interfaceHelper      — transformToIPeers
 */

export class availableForConnectionsNotification {
  public static execute(
    cParams: ICommonParams.commonParams,
    data: unknown /* IAllowConnections.allowConnections */
  ) {
    const className = "availableForConnectionsNotification";
    logger.log(className, "UseCase - " + className);
    try {
      const peerA = constants.peerTypes.AGENT;
      const peerS = constants.peerTypes.STRANGER;
      validatorHelper.checkCommonParamsInterface(cParams);
      validatorHelper.checkIO(cParams.io);
      validatorHelper.checkStore(cParams.storeAgent, peerA);
      const allowIf = parserHelper.parseAllowConnectionsInterface(data);
      const io = cParams.io;
      const storeA = cParams.storeAgent;
      const id = allowIf.socketId;
      validatorHelper.checkPeerInStore(id, peerA, storeA);

      //updates agent allowconnection status in store.
      //If updated in store then notify connected peer based on connectedPeerTye
      const updated = storeAS.setAvailbleStatus(storeA, allowIf);

      if (updated && allowIf.peerType === peerS) {
        const agents = storeA.getAvailableAgents(peerS);
        const agentsIF = interfaceHelper.transformToIPeers(agents);
        socketSS.notifyAvailableAgents(io, "", agentsIF, true);
      } else if (updated && allowIf.peerType === peerA) {
        logger.log(
          this.name,
          "notifyAvailableAgents for PEER TYPE AGENT >>>> TO DO"
        );
      }
    } catch (error: unknown) {
      const method = "execute";
      useCaseErrors.executeDefault(className, method, error);
    }
  }
  /*   public static handleError(error: unknown) {
    const method = this.execute.name;
    errorHandler.wrapErrorUseCase(this.name, error, method);
  } */
}
