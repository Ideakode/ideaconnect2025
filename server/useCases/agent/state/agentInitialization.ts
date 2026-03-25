/**
 * @file agentInitialization.ts
 * @class agentInitialization
 *
 * @description
 * Server-side initialisation use case for the agent namespace. Called once
 * during server bootstrap (from server/index.ts). Validates commonParams and
 * delegates to socketAgentService.initAgent to register the connect listener
 * on the /AGENT namespace, making the server ready to accept agent connections.
 *
 * @staticMethods
 * - execute(cParams)  Validates commonParams and calls socketAS.initAgent.
 *
 * @see socketAgentService    — called by execute to initialise the namespace
 * @see socketEventMapAgent   — the events map passed to initAgent
 */
import { socketAS } from "../../../services/services.js";
import { ICommonParams } from "../../../interfaces/interfaces.js";
import { socketEventMapAgent as evsMap } from "../../../eventHandlers/eventHandlers.js";
import { validatorHelper } from "../../../helpers/validator.helper.js";
import { logger } from "../../../logs/logs.js";
import { useCaseErrors } from "../../useCaseErrors.js";

//Inits the IO server to be ready for Socket connections
export class agentInitialization {
  public static execute(cParams: ICommonParams.commonParams) {
    const className = "agentInitialization";
    logger.log(className, "UseCase - " + className);

    try {
      validatorHelper.checkCommonParamsInterface(cParams);
      socketAS.initAgent(cParams, evsMap);
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
