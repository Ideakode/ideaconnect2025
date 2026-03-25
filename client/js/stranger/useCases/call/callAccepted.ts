import * as constants from "../../constants/constants.js";
import { errorHandler } from "../../errors/errors.js";
import { storeSSvc, webRtcSSvc } from "../../services/services.js";
import { useCaseErrors } from "../usesCases.js";
import { logger } from "../../logs/logs.js";
import { parserSHelper, validatorSHelper } from "../../helpers/helpers.js";
import { uiSSvc } from "../../services/services.js";
import { ICommonParams, ICallDetails } from "../../interfaces/interfaces.js";
import { sendChatMessage } from "../webRtc/webRtc.js";
import { callEnded } from "../call/call.js";

/**
 * @file callAccepted.ts
 * @class callAccepted
 *
 * @description
 * Use case triggered when the remote agent accepts the stranger's call invitation.
 * Creates the RTCPeerConnection, initialises WebRTC services with the stranger's
 * event map, advances the store to RTC-in-progress state, starts the WebRTC offer,
 * and switches the UI to the appropriate view for the call type.
 *
 * @staticMethods
 * - execute(cParamsData, data)
 *     1. Validates cParams and call details
 *     2. Creates a peer connection via webRtcSSvc.createPeerConnection
 *     3. Stores it and calls webRtcSSvc.init + startWebRtcOffer
 *     4. For CHAT: switches to chat view wiring sendChatMessage and callEnded
 *        AUDIO / VIDEO: reserved (To Do)
 *
 * @see webRTCStrangerService.init
 * @see callSignaling  — dispatcher that triggers this
 */
export class callAccepted {
  public static execute(
    cParamsData: ICommonParams.commonParams,
    data: ICallDetails.callDetails
  ) {
    const className = "callAccepted";
    logger.log(className, "UseCase - " + className);

    try {
      const parser = parserSHelper;
      const validator = validatorSHelper;
      const cParams = parser.parseCommonParamsInterface(cParamsData);
      const store = parser.parseStoreStranger(cParams.store);
      const cDetailsToAttach = parser.parseCallDetailsInterface(data);

      validator.checkCall(store, cDetailsToAttach);

      /* creates the default peerconnection */
      const peerConn = webRtcSSvc.createPeerConnection();
      storeSSvc.setPeerConnection(store, peerConn); //stores peerConnection obj for this call
      webRtcSSvc.init(cParams, cDetailsToAttach);
      storeSSvc.setCallInRtcProgress(store, cDetailsToAttach);
      webRtcSSvc.startWebRtcOffer(store);

      switch (cDetailsToAttach.callType) {
        case constants.callType.CHAT: {
          const fnSendMsg = sendChatMessage.execute;
          const fnEndCall = callEnded.execute;
          uiSSvc.switchToChatView(
            cParams,
            cDetailsToAttach,
            fnSendMsg,
            fnEndCall
          );
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

  public static handleError(error: unknown) {
    const method = this.handleError.name;
    errorHandler.wrapErrorUseCase(this.name, error, method);
  }
}
