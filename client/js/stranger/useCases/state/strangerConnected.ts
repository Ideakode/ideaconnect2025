import { storeSSvc, socketSSvc } from "../../services/services.js";
import { useCaseErrors } from "../usesCases.js";
import { logger } from "../../logs/logs.js";
import { parserSHelper } from "../../helpers/helpers.js";

export class strangerConnected {
  public static execute(cParamsData: unknown /* ICommonParams.commonParams */) {
    const className = "strangerConnected";
    logger.log(className, "UseCase - " + className);
    try {
      const parser = parserSHelper;
      const cParams = parser.parseCommonParamsInterface(cParamsData);
      const store = parser.parseStoreStranger(cParams.store);
      const socket = parser.parseSocket(storeSSvc.getSocket(store));
      // When Stranger socket gets connected request refresh of available Agents
      socketSSvc.requestAvailableAgents(socket!);
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
