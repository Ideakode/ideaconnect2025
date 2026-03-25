/**
 * @file callFailed.ts
 * @class callFailed
 *
 * @description
 * Shared teardown use case for any call outcome other than ACCEPTED.
 * Closes the outgoing call dialog and opens an info dialog that auto-dismisses
 * after a delay, calling storeSSvc.resetCall when it closes.
 *
 * @staticMethods
 * - execute(cParams, data, reason)
 *     @param reason  One of CALL_REJECTED | CALL_BUSY | CANCEL | NOT_FOUND
 *     1. Validates cParams and call details
 *     2. Closes the call dialog via uiSSvc.closeCallDialog
 *     3. Opens an info dialog via uiSSvc.openInfoDialog with storeSSvc.resetCall
 *        as the close callback (3-second delay by default)
 *
 * @see callRejected, callBusy, callCancelled, callNotFound — callers
 */
import { storeSSvc, uiSSvc } from "../../services/services.js";
import { useCaseErrors } from "../usesCases.js";
import { logger } from "../../logs/logs.js";
import { parserSHelper, validatorSHelper } from "../../helpers/helpers.js";
import { ICommonParams, ICallDetails } from "../../interfaces/interfaces.js";

export class callFailed {
  public static execute(
    cParams: ICommonParams.commonParams,
    data: ICallDetails.callDetails,
    reason: string
  ) {
    const className = "callFailed";
    logger.log(className, "UseCase - " + className);

    try {
      const parser = parserSHelper;
      const validator = validatorSHelper;
      validator.checkCommonParamsInterface(cParams);
      const cDetails = parser.parseCallDetailsInterface(data);
      const store = parser.parseStoreStranger(cParams.store);
      validator.checkCall(store, cDetails);
      uiSSvc.closeCallDialog();
      const clbk = storeSSvc.resetCall;
      uiSSvc.openInfoDialog(reason, clbk, 3, store);
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
