import { ICommonParams, ICallDetails } from "../../interfaces/interfaces.js";
import { storeASvc, uiASvc } from "../../services/services.js";
import { useCaseErrors } from "../usesCases.js";
import { logger } from "../../logs/logs.js";
import { parserAHelper, validatorAHelper } from "../../helpers/helpers.js";

export class callNewIncoming {
  public static execute(
    cParams: ICommonParams.commonParams,
    data: ICallDetails.callDetails
  ) {
    const className = "callNewIncoming";
    logger.log(className, "UseCase - " + className);

    try {
      const parser = parserAHelper;
      const validator = validatorAHelper;
      validator.checkCommonParamsInterface(cParams);
      const storeA = parser.parseStoreAgent(cParams.store);
      const cDetails = parser.parseCallDetailsInterface(data);
      validator.canAgentReceiveCall(storeA);
      //save call details in store and change callState
      storeASvc.setCallInProgress(storeA, cDetails);
      //open call dialog
      uiASvc.openIncomingCallDialog(cParams, cDetails);
    } catch (error: unknown) {
      const method = "execute";
      useCaseErrors.sendBusyIfNeeded(className, method, error, cParams, data);
    }
  }

  /* public static handleError(
    error: unknown,
    cParams: ICommonParams.commonParams,
    data: ICallDetails.callDetails
  ) {
    const method = this.handleError.name;
    const parser = parserAHelper;
    errorHandler.wrapErrorUseCase(this.name, error, method);

    if (error instanceof errors.classes.validatorErrorClass) {
      const cDetails = parser.parseCallDetailsInterface(data);
      switch (error.name) {
        case errors.errorBuilder._error_peer_not_idle:
        case errors.errorBuilder._error_peer_not_available_calls:
        case errors.errorBuilder._error_callDetails_not_null:
          useCases.call.callBusy.execute(cParams, cDetails);
          break;
      }
    }
  } */
}
