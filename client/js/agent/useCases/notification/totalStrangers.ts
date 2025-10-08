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
