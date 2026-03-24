/**
 * @file webRtcOffer.ts
 * @class webRtcOffer
 *
 * @description
 * Use case for handling an incoming WebRTC OFFER from the calling stranger.
 * The agent is always the answering party — it creates the RTCPeerConnection,
 * stores it, advances the call state to WEBRTC_PROGRESS, initialises the
 * WebRTC event mapping, then generates and sends back the SDP answer.
 *
 * @flow
 * webRtcSignaling (OFFER) → webRtcOffer.execute(cParamsData, data)
 *   1. Validates callState=IN_PROGRESS and callId match
 *   2. webRtcAgentService.createPeerConnection()         — new RTCPeerConnection
 *   3. storeAgentService.setPeerConnection(store, pc)    — save to store
 *   4. storeAgentService.setCallInRtcProgress(store)     — advance state to WEBRTC_PROGRESS
 *   5. webRtcAgentService.init(cParams, cDetails)        — register WebRTC event handlers
 *   6. webRtcAgentService.startWebRtcAnswer(store, offer) — setRemoteDescription + createAnswer + send
 *
 * @errorHandling  useCaseErrors.executeDefault (logs, does not rethrow)
 *
 * @see webRtcSignaling      — dispatches to this on OFFER type
 * @see webRtcAgentService   — createPeerConnection, init, startWebRtcAnswer
 * @see webRtcEventMapping   — event handlers registered by init()
 */
import { storeASvc, webRtcASvc } from "../../services/services.js";
import { useCaseErrors } from "../usesCases.js";
import { logger } from "../../logs/logs.js";
import { parserAHelper, validatorAHelper } from "../../helpers/helpers.js";

export class webRtcOffer {
  public static execute(
    cParamsData: unknown /*  ICommonParams.commonParams */,
    data: unknown /* IWebRtcSignaling.webRtcSignaling */
  ) {
    const className = "webRtcOffer";
    logger.log(className, "UseCase - " + className);

    try {
      const parser = parserAHelper;
      const validator = validatorAHelper;
      const cParams = parser.parseCommonParamsInterface(cParamsData);
      const wSig = parser.parseWebRTCSignalingInterface(data);
      const store = parser.parseStoreAgent(cParams.store);
      const cDetails = parser.parseCallDetailsInterface(wSig.callDetails);
      validator.checkCallInSignalingState(store);
      validator.checkCall(store, cDetails);
      const offer = wSig.data as RTCSessionDescriptionInit;
      const peerConn = webRtcASvc.createPeerConnection();
      storeASvc.setPeerConnection(store, peerConn);
      storeASvc.setCallInRtcProgress(store, cDetails);
      webRtcASvc.init(cParams, cDetails);
      webRtcASvc.startWebRtcAnswer(store, offer);
    } catch (error: unknown) {
      const method = "execute";
      useCaseErrors.executeDefault(className, method, error);
    }
  }

  /* public static handleError(error: unknown) {
    const method = this.handleError.name;
    errorHandler.wrapErrorUseCase(this.name, error, method);
  } */
}
