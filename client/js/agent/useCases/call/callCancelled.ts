/**
 * @file callCancelled.ts
 * @class callCancelled
 *
 * @description
 * Use case triggered when the caller sends a CANCEL signaling message while the
 * agent's incoming call dialog is still open (caller hung up before agent responded).
 * Closes the incoming call dialog, shows a brief info notification, then resets
 * call state when the notification closes.
 *
 * @flow
 * callSignaling (CANCEL) → callCancelled.execute(cParams, cDetails)
 *   1. Validates commonParams and callDetails (callId match)
 *   2. uiAgentService.closeIncomingCallDialog()   — dismiss the ringing dialog
 *   3. uiAgentService.openInfoDialog(CANCEL, storeASvc.resetCall, 3s, store)
 *      — shows "Call Cancelled" notification; resets call state on close
 *
 * @errorHandling  useCaseErrors.executeDefault (logs, does not rethrow)
 *
 * @see callSignaling — dispatches to this on CANCEL status
 * @see uiAgentService.openInfoDialog — handles the timed notification + callback
 */
import * as constants from "../../constants/constants.js";
import { ICommonParams, ICallDetails } from "../../interfaces/interfaces.js";
import { storeASvc, uiASvc } from "../../services/services.js";
import { useCaseErrors } from "../usesCases.js";
import { logger } from "../../logs/logs.js";
import { parserAHelper, validatorAHelper } from "../../helpers/helpers.js";

export class callCancelled {
  public static execute(
    cParams: ICommonParams.commonParams,
    data: ICallDetails.callDetails
  ) {
    const className = "callCancelled";
    logger.log(className, "UseCase - " + className);

    try {
      const parser = parserAHelper;
      const validator = validatorAHelper;
      validator.checkCommonParamsInterface(cParams);
      const cDetails = parser.parseCallDetailsInterface(data);
      const store = parser.parseStoreAgent(cParams.store);
      const cancel = constants.callSignaling.CANCEL;
      validator.checkCall(store, cDetails);
      uiASvc.closeIncomingCallDialog(); //always close call dialog
      const clback = storeASvc.resetCall; //reset call after Info Dialog Closes
      uiASvc.openInfoDialog(cancel, clback, 3, store);
    } catch (error: unknown) {
      const method = "execute";
      useCaseErrors.executeDefault(className, method, error);
    }
  }
}
