/**
 * @file serverNotification.ts
 * @class serverNotification
 *
 * @description
 * Dispatcher use case for all inbound SERVER_NOTIFICATION socket events.
 * Parses the raw notification envelope, then routes to the appropriate
 * sub-use-case based on the notification type.
 *
 * @flow
 * SERVER_NOTIFICATION → serverNotification.execute(cParams, data)
 *   - TOTAL_STRANGERS → totalStrangers.execute(cParams, ITotal.total)
 *   - PEER_INFO       → peerInfo.execute(cParams, IPeer.peer)
 *   - default         → logs "Nothing to execute"
 *
 * @errorHandling  useCaseErrors.executeDefault (logs, does not rethrow)
 *
 * @see socketEventMapping — registers this as the SERVER_NOTIFICATION callback
 * @see totalStrangers     — updates the stranger count display
 * @see peerInfo           — updates the agent name in the dashboard
 */
import * as constants from "../../constants/constants.js";
import { useCaseErrors } from "../usesCases.js";
import { logger } from "../../logs/logs.js";
import { parserAHelper, validatorAHelper } from "../../helpers/helpers.js";
import { totalStrangers } from "./notification.js";
import { peerInfo } from "./peerInfo.js";

export class serverNotification {
  public static execute(
    cParamsData: unknown /* ICommonParams.commonParams */,
    data: unknown //interfaces.
  ) {
    const className = "serverNotification";
    logger.log(className, "UseCase - " + className);
    try {
      const parser = parserAHelper;
      const validator = validatorAHelper;

      const cParams = parser.parseCommonParamsInterface(cParamsData);
      const notif = parser.parseNotificationInterface(data);
      const store = parser.parseStoreAgent(cParams.store);
      validator.checkStoreAgent(store);

      const totalSNotif = constants.notificationTypes.server.TOTAL_STRANGERS;
      const peerInfoNoif = constants.notificationTypes.server.PEER_INFO;
      switch (notif.type) {
        case totalSNotif: {
          const totIf = parser.parseTotalInterface(notif.data);
          totalStrangers.execute(cParams, totIf);
          break;
        }
        case peerInfoNoif: {
          const agent = parser.parsePeerInterface(notif.data);
          peerInfo.execute(cParams, agent);
          break;
        }
        default:
          logger.log(
            this.name,
            "UseCase - serverNotification | Nothing to execute"
          );
      }
    } catch (error: unknown) {
      const method = "execute";
      useCaseErrors.executeDefault(className, method, error);
    }
  }

  /*   public static handleError(error: unknown) {
    const method = this.handleError.name;
    errorHandler.wrapErrorUseCase(this.name, error, method);
  } */
}
