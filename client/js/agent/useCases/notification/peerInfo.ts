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
