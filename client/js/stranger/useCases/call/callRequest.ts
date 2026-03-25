/**
 * @file callRequest.ts
 * @class callRequest
 *
 * @description
 * Use case triggered when the stranger clicks a call button in the agent listing.
 * Validates that the stranger is eligible to make a call (IDLE state), builds the
 * INVITE call-signaling message, marks the store as call-in-progress, opens the
 * outgoing call dialog, and sends the invitation to the server.
 *
 * @staticMethods
 * - execute(cParams, type, toId, toName)
 *     @param type    Call type (CHAT / AUDIO / VIDEO)
 *     @param toId    Socket ID of the target agent
 *     @param toName  Display name of the target agent
 *     1. Checks canPeerParticipateInCall (IDLE guard)
 *     2. Builds an INVITE callSignaling message
 *     3. storeSSvc.setCallInProgress + uiSSvc.openCallDialog
 *     4. socketSSvc.sendCallSignaling
 *
 * @see callHangedUp   — hang-up callback passed to the call dialog
 * @see listingAgentsEventHandler — click handler that calls this
 */
import { useCaseErrors } from "../usesCases.js";
import { logger } from "../../logs/logs.js";
import {
  parserSHelper,
  validatorSHelper,
  messageBuilder,
} from "../../helpers/helpers.js";
import { callHangedUp } from "./callHangedUp.js";
import { ICommonParams } from "../../interfaces/interfaces.js";
import { storeSSvc, uiSSvc, socketSSvc } from "../../services/services.js";

export class callRequest {
  public static execute(
    cParams: ICommonParams.commonParams,
    type: string,
    toId: string,
    toName: string
  ) {
    const className = "callRequest";
    logger.log(className, "UseCase - " + className);

    try {
      const parser = parserSHelper;
      const validator = validatorSHelper;
      const store = parser.parseStoreStranger(cParams.store);
      const socket = parser.parseSocket(storeSSvc.getSocket(store));
      const fromId = socket.id;
      validator.canPeerParticipateInCall(store);
      //prepare message to be sent
      const msg = messageBuilder.buildCallSignalingInvite(
        type,
        fromId!,
        toId,
        toId,
        "Client",
        toName
      );
      const cDetails = msg.callDetails;
      const fnHangup = callHangedUp.execute;
      storeSSvc.setCallInProgress(store, cDetails);
      uiSSvc.openCallDialog(cParams, cDetails, toName, fnHangup);
      socketSSvc.sendCallSignaling(socket, msg);
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
