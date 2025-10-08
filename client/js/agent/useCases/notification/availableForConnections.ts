import { ICommonParams } from "../../interfaces/interfaces.js";
import { storeASvc, socketASvc, uiASvc } from "../../services/services.js";
import { useCaseErrors } from "../usesCases.js";
import { logger } from "../../logs/logs.js";
import { parserAHelper, validatorAHelper } from "../../helpers/helpers.js";

//Agent toggled his available for Connection Flag
export class availableForConnections {
  public static execute(cParams: ICommonParams.commonParams, forPeer: string) {
    const className = "availableForConnections";
    logger.log(className, "UseCase - " + className);
    try {
      const parser = parserAHelper;
      const validator = validatorAHelper;

      validator.checkCommonParamsInterface(cParams);
      const store = parser.parseStoreAgent(cParams.store);
      const socket = parser.parseSocket(storeASvc.getSocket(store));
      const allow = storeASvc.getAllowConnectionStatus(forPeer, store);

      //update ui
      uiASvc.refreshAvailableForConnections(forPeer, !allow);
      //update store
      storeASvc.setAllowConnectionStatus(forPeer, !allow, store);
      //notify Server
      socketASvc.notifyAgentAvailable(socket, !allow, forPeer);
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
