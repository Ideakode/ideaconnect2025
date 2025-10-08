import * as constants from "../../constants/constants.js";
import { ICommonParams, ICallDetails } from "../../interfaces/interfaces.js";
import { storeASvc, uiASvc } from "../../services/services.js";
import { useCaseErrors } from "../usesCases.js";
import { logger } from "../../logs/logs.js";

import { parserAHelper, validatorAHelper } from "../../helpers/helpers.js";

export class callNotFound {
  public static execute(
    cParams: ICommonParams.commonParams,
    data: ICallDetails.callDetails
  ) {
    const className = "callNotFound";
    logger.log(className, "UseCase - " + className);

    try {
      const parser = parserAHelper;
      const validator = validatorAHelper;

      validator.checkCommonParamsInterface(cParams);
      const store = parser.parseStoreAgent(cParams.store);
      const cDetails = parser.parseCallDetailsInterface(data);
      validator.checkCall(store, cDetails);
      uiASvc.closeIncomingCallDialog(); //close call dialog if open
      const notfound = constants.callSignaling.NOT_FOUND;
      const clback = storeASvc.resetCall; //reset call after dialog closes
      uiASvc.openInfoDialog(notfound, clback, 3, store);
    } catch (error: unknown) {
      const method = "execute";
      useCaseErrors.executeDefault(className, method, error);
    }
  }

  /*  public static handleError(error: unknown) {
    const method = this.handleError.name;
    errorHandler.wrapErrorUseCase(this.name, error, method);
  } */
}
