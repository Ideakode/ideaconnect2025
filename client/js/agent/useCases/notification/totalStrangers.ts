/**
 * @file totalStrangers.ts
 * @class totalStrangers
 *
 * @description
 * Use case triggered when the server sends a TOTAL_STRANGERS notification,
 * carrying the current count of strangers connected to the site.
 * Updates the total strangers counter in the agent dashboard.
 *
 * @flow
 * serverNotification (TOTAL_STRANGERS) → totalStrangers.execute(cParams, ITotal.total)
 *   1. Validates commonParams and storeAgent
 *   2. parserAHelper.parseTotalInterface(data)  — typed ITotal.total
 *   3. uiAgentService.refreshTotalStrangers(total)  — updates the counter display
 *
 * @errorHandling  useCaseErrors.executeDefault (logs, does not rethrow)
 *
 * @see serverNotification — dispatches to this on TOTAL_STRANGERS type
 * @see uiAgentService.refreshTotalStrangers — updates the stranger count in the UI
 * @see agentConnected — requests a fresh count on reconnect via socketASvc.requestTotalStrangers
 */
import { ICommonParams, ITotal } from "../../interfaces/interfaces.js";
import { uiASvc } from "../../services/services.js";
import { useCaseErrors } from "../usesCases.js";
import { logger } from "../../logs/logs.js";
import { parserAHelper, validatorAHelper } from "../../helpers/helpers.js";

//Agent received a notification of Total Strangers Connected to the Site
export class totalStrangers {
  public static execute(
    cParams: ICommonParams.commonParams,
    data: ITotal.total
  ) {
    const className = "totalStrangers";
    logger.log(className, "UseCase - " + className);

    try {
      const parser = parserAHelper;
      const validator = validatorAHelper;

      validator.checkCommonParamsInterface(cParams);
      validator.checkStoreAgent(cParams.store);

      const totalIf = parser.parseTotalInterface(data);
      uiASvc.refreshTotalStrangers(totalIf.total);
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
