/**
 * @file callAccepted.ts
 * @class callAccepted
 *
 * @description
 * Use case triggered when the agent clicks Accept in the incoming call dialog.
 * Sends a CALL_ACCEPTED signaling message back to the calling stranger, then switches
 * the UI to the appropriate call view based on call type.
 *
 * @flow
 * callDialog (Accept button) → callAccepted.execute(cParams, data)
 *   1. Validates store, call details (callId match)
 *   2. Sends CALL_ACCEPTED to callingPartyId via socketAgentService.sendCallSignaling
 *   3. Switches view based on callType:
 *      - CHAT  → (uiASvc.switchToChatView — currently commented out, TODO)
 *      - AUDIO → TODO
 *      - VIDEO → TODO
 *
 * @note
 * The chat view switch is commented out pending view management implementation.
 * sendChatMessage and callEnded are referenced but not yet fully wired.
 *
 * @errorHandling  useCaseErrors.executeDefault (logs, does not rethrow)
 *
 * @see callDialog (base/ui) - the accept button triggers this
 * @see uiAgentService       - will handle view switching when implemented
 */
import { storeASvc, socketASvc,uiASvc } from "../../services/services.js";
import { useCaseErrors } from "../usesCases.js";
import { logger } from "../../logs/logs.js";
import {
  parserAHelper,
  validatorAHelper,
  messageBuilder,
} from "../../helpers/helpers.js";
import * as constants from "../../constants/constants.js";
import { sendChatMessage } from "../webRtc/webRtc.js";
import { callEnded } from "./call.js";


export class callAccepted {
  public static execute(
    cParamsData: unknown /* ICommonParams.commonParams */,
    data: unknown /* ICallDetails.callDetails */
  ) {
    const className = "callAccepted";
    logger.log(className, "UseCase - " + className);

    try {
      const parser = parserAHelper;
      const validator = validatorAHelper;

      const cParams = parser.parseCommonParamsInterface(cParamsData);
      const cDetails = parser.parseCallDetailsInterface(data);
      const store = parser.parseStoreAgent(cParams.store);
      validator.checkCall(store, cDetails);
      const socket = parser.parseSocket(storeASvc.getSocket(store));
      const routeTo = cDetails.callingPartyId;
      const msg = messageBuilder.buildCallSignalingAccept(cDetails, routeTo);
      socketASvc.sendCallSignaling(socket, msg);

      switch (cDetails.callType) {
        case constants.callType.CHAT: {
          const fnSendMsg = sendChatMessage.execute;
          const fnEndCall = callEnded.execute;
         /*  uiASvc.switchToChatView(
            cParams,
            cDetailsToAttach,
            fnSendMsg,
            fnEndCall
          ); */
          break;
        }

        case constants.callType.AUDIO:
          //To Do
          break;
        case constants.callType.VIDEO:
          //To Do
          break;
      }
    } catch (error: unknown) {
      const method = "execute";
      useCaseErrors.executeDefault(className, method, error);
    }
  }
}
