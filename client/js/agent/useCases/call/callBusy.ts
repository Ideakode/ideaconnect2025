/**
 * @file callBusy.ts
 * @class callBusy
 *
 * @description
 * Use case for sending a CALL_BUSY signaling message back to the caller.
 * Triggered automatically by useCaseErrors.sendBusyIfNeeded when the agent is
 * unable to accept an incoming call (not idle, not available, or already in a call).
 * No call state is changed — the agent's store remains unmodified.
 *
 * @flow
 * useCaseErrors.sendBusyIfNeeded → callBusy.execute(cParams, cDetails)
 *   1. Validates commonParams and callDetails
 *   2. Builds CALL_BUSY signaling message routed to callingPartyId
 *   3. socketAgentService.sendCallSignaling(socket, msg)
 *
 * @errorHandling  useCaseErrors.executeDefault (logs, does not rethrow)
 *
 * @see useCaseErrors.sendBusyIfNeeded — the primary caller of this use case
 * @see callNewIncoming — triggers sendBusyIfNeeded on validation failure
 */
import { ICommonParams, ICallDetails } from "../../interfaces/interfaces.js";
import { storeASvc, socketASvc } from "../../services/services.js";
import { useCaseErrors } from "../usesCases.js";
import { logger } from "../../logs/logs.js";
import {
  parserAHelper,
  validatorAHelper,
  messageBuilder,
} from "../../helpers/helpers.js";

export class callBusy {
  public static execute(
    cParams: ICommonParams.commonParams,
    data: ICallDetails.callDetails
  ) {
    const className = "callBusy";
    logger.log(className, "UseCase - " + className);

    try {
      const parser = parserAHelper;
      const validator = validatorAHelper;
      validator.checkCommonParamsInterface(cParams);
      const cDetails = parser.parseCallDetailsInterface(data);
      const store = parser.parseStoreAgent(cParams.store);
      const socket = parser.parseSocket(storeASvc.getSocket(store));
      const routeTo = cDetails.callingPartyId;
      const msg = messageBuilder.buildCallSignalingBusy(cDetails, routeTo);
      socketASvc.sendCallSignaling(socket, msg);
    } catch (error: unknown) {
      const method = "execute";
      useCaseErrors.executeDefault(className, method, error);
    }
  }
}
