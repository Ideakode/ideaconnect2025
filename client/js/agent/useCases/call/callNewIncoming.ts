/**
 * @file callNewIncoming.ts
 * @class callNewIncoming
 *
 * @description
 * Use case for handling a new incoming call INVITE from a stranger.
 * Validates that the agent is idle and available before accepting the call into state,
 * then opens the incoming call dialog for the agent to accept or reject.
 *
 * @flow
 * callSignaling (INVITE) → callNewIncoming.execute(cParams, data)
 *   1. validatorAgentHelper.canAgentReceiveCall(store)
 *      — confirms callState=IDLE, callDetails=null, availableForClients=true
 *   2. storeAgentService.setCallInProgress(store, cDetails)
 *      — saves callDetails and sets callState=IN_PROGRESS
 *   3. uiAgentService.openIncomingCallDialog(cParams, cDetails)
 *      — shows dialog with Accept (callAccepted) and Reject (callRejected) buttons
 *
 * @errorHandling
 * useCaseErrors.sendBusyIfNeeded — if the agent cannot take the call (not idle, not
 * available, or call already active), automatically sends CALL_BUSY back to the caller.
 *
 * @see callAccepted   - wired as fnAccept in the dialog
 * @see callRejected   - wired as fnReject in the dialog
 * @see useCaseErrors.sendBusyIfNeeded
 */
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
