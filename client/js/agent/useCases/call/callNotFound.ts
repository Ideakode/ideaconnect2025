/**
 * @file callNotFound.ts
 * @class callNotFound
 *
 * @description
 * Use case triggered when the server returns a NOT_FOUND signaling status,
 * meaning the called stranger's socket is no longer connected. Closes any open
 * call dialog, displays a brief info notification, then resets call state when
 * the notification closes.
 *
 * @flow
 * callSignaling (NOT_FOUND) → callNotFound.execute(cParams, cDetails)
 *   1. Validates commonParams and callDetails (callId match)
 *   2. uiAgentService.closeIncomingCallDialog()    — close dialog if open
 *   3. uiAgentService.openInfoDialog(NOT_FOUND, storeASvc.resetCall, 3s, store)
 *      — shows "Peer Not Found" notification; resets call state on close
 *
 * @errorHandling  useCaseErrors.executeDefault (logs, does not rethrow)
 *
 * @see callSignaling — dispatches to this on NOT_FOUND status
 * @see uiAgentService.openInfoDialog — handles the timed notification + callback
 */
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
