import * as constants from "../../constants/constants.js";
import { useCaseErrors } from "../usesCases.js";
import { logger } from "../../logs/logs.js";
import { parserSHelper } from "../../helpers/helpers.js";
import { availableAgents } from "./availableAgents.js";

export class serverNotification {
  public static execute(
    cParamsData: unknown /* ICommonParams.commonParams */,
    data: unknown //INotification.notification
  ) {
    const className = "serverNotification";
    logger.log(className, "UseCase - " + className);

    try {
      const parser = parserSHelper;

      const cParams = parser.parseCommonParamsInterface(cParamsData);
      const notif = parser.parseNotificationInterface(data);
      const avAgents = constants.notificationTypes.server.AVAILABLE_AGENTS;

      switch (notif.type) {
        case avAgents: {
          const agents = parser.parsePeersInterface(notif.data);
          availableAgents.execute(cParams, agents);
          break;
        }
        default:
          logger.log(this.name, "Nothing to Execute.");
          break;
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
