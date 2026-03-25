/**
 * @file strangerInitialization.ts
 * @class strangerInitialization
 *
 * @description
 * Server-side initialisation use case for the stranger namespace. Called once
 * during server bootstrap (from server/index.ts). Validates commonParams and
 * delegates to socketStrangerService.initStranger to register the connect listener
 * on the /STRANGER namespace, making the server ready to accept stranger connections.
 *
 * @staticMethods
 * - execute(cParams)  Validates commonParams and calls socketSS.initStranger.
 *
 * @see socketStrangerService   — called by execute to initialise the namespace
 * @see socketEventMapStranger  — the events map passed to initStranger
 */
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
