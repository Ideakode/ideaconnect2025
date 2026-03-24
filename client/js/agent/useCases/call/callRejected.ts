/**
 * @file callRejected.ts
 * @class callRejected
 *
 * @description
 * Use case triggered when the agent clicks Reject in the incoming call dialog.
 * Resets the agent's call state, sends a CALL_REJECTED signaling message to the caller,
 * and closes the call dialog.
 *
 * @flow
 * callDialog (Reject button) → callRejected.execute(cParams, data)
 *   1. Validates store and call (callId match)
 *   2. storeAgentService.resetCall(store)    — clears callDetails, sets callState=IDLE
 *   3. Sends CALL_REJECTED to callingPartyId via socketAgentService.sendCallSignaling
 *   4. uiAgentService.closeIncomingCallDialog() — removes dialog from DOM
 *
 * @errorHandling  useCaseErrors.executeDefault (logs, does not rethrow)
 *
 * @see callDialog (base/ui) - the reject button triggers this
 */
import { storeASvc, socketASvc, uiASvc } from "../../services/services.js";
import { useCaseErrors } from "../usesCases.js";
import { logger } from "../../logs/logs.js";
import {
  parserAHelper,
  validatorAHelper,
  messageBuilder,
} from "../../helpers/helpers.js";

export class callRejected {
  public static execute(
    cParamsData: unknown /* ICommonParams.commonParams */,
    data: unknown /* ICallDetails.callDetails */
  ) {
    const className = "callRejected";
    logger.log(className, "UseCase - " + className);
    try {
      const parser = parserAHelper;
      const validator = validatorAHelper;

      const cParams = parser.parseCommonParamsInterface(cParamsData);
      const callDetails = parser.parseCallDetailsInterface(data);
      const routeTo = callDetails.callingPartyId;
      const store = parser.parseStoreAgent(cParams.store);
      const socket = parser.parseSocket(storeASvc.getSocket(store));
      validator.checkCall(store, callDetails);
      storeASvc.resetCall(store); //reset ongoing call details in store
      //send rejection back
      const msg = messageBuilder.buildCallSignalingReject(callDetails, routeTo);
      socketASvc.sendCallSignaling(socket, msg);
      uiASvc.closeIncomingCallDialog(); //always close call dialog
    } catch (error: unknown) {
      const method = "execute";
      useCaseErrors.executeDefault(className, method, error);
    }
  }

  /* public static handleError(error: unknown) {
    const method = this.handleError.name;
    errorHandler.wrapErrorUseCase(this.name, error, method);
  }
 */
}
