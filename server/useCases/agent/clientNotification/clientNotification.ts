/**
 * @file clientNotification.ts
 * @class clientNotification
 *
 * @description
 * Dispatcher use case for client-notification events from agents.
 * Parses the incoming notification, verifies the agent is in the store,
 * then routes to the appropriate sub-use-case based on notification type.
 *
 * Supported types:
 * - AGENT_AVAILABLE → availableForConnectionsNotification.execute
 *
 * @staticMethods
 * - execute(cParamsData, socketData, notifData)  Main handler, called by socketEventHandler.
 *
 * @see availableForConnectionsNotification — handles AGENT_AVAILABLE notifications
 */
import * as constants from "../../../constants/constants.js";
import { logger } from "../../../logs/logs.js";
import { parserHelper, validatorHelper } from "../../../helpers/helpers.js";
import { useCaseErrors } from "../../useCaseErrors.js";
import { availableForConnectionsNotification } from "./availableForConnections.notification.js";

export class clientNotification {
  public static execute(
    cParamsData: unknown /* ICommonParams.commonParams */,
    socketData: unknown /* Socket */,
    notifData: unknown // INotification.notification
  ) {
    const className = "clientNotification";
    logger.log(className, "UseCase - " + className);

    try {
      const peerA = constants.peerTypes.AGENT;
      const cParams = parserHelper.parseCommonParamsInterface(cParamsData);
      const socket = parserHelper.parseSocket(socketData);
      validatorHelper.checkStore(cParams.storeAgent, peerA);
      const storeA = cParams.storeAgent;
      const id = socket.id;
      validatorHelper.checkPeerInStore(id, peerA, storeA);
      const notif = parserHelper.parseNotificationInterface(notifData);
      const notifType = notif.type;
      const allowCon = constants.notificationTypes.client.AGENT_AVAILABLE;
      switch (notifType) {
        case allowCon: {
          const data = notif.data;
          availableForConnectionsNotification.execute(cParams, data);
          break;
        }
        default: {
          logger.log(this.name, "Nothing to execute", [notif]);
          break;
        }
      }
    } catch (error: unknown) {
      const method = "execute";
      useCaseErrors.executeDefault(className, method, error);
    }
  }

  /*   public static handleError(error: unknown) {
    const method = useCases.clientNotification.handleError.name;
    errorHandler.wrapErrorUseCase(this.name, error, method);
  }
 */
}
