import { socketSS } from "../../../services/services.js";
import { ICommonParams } from "../../../interfaces/interfaces.js";
import { socketEventMapStranger as evsMap } from "../../../eventHandlers/eventHandlers.js";
import { validatorHelper } from "../../../helpers/helpers.js";
import { logger } from "../../../logs/logs.js";
import { useCaseErrors } from "../../useCaseErrors.js";

//Inits the IO server to be ready for Socket connections
export class strangerInitialization {
  public static execute(cParams: ICommonParams.commonParams) {
    const className = "strangerInitialization";
    logger.log(className, "UseCase - " + className);
    try {
      validatorHelper.checkCommonParamsInterface(cParams);
      socketSS.initStranger(cParams, evsMap);
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
