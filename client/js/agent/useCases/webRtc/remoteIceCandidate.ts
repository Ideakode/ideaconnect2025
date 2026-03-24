/**
 * @file remoteIceCandidate.ts
 * @class remoteIceCandidate
 *
 * @description
 * Use case triggered when a remote ICE candidate is received via the
 * WEBRTC_SIGNALING socket event. Passes the candidate to the local
 * RTCPeerConnection so the browser can attempt to establish connectivity
 * on that network path.
 *
 * @flow
 * webRtcSignaling (ICE_CANDIDATE) → remoteIceCandidate.execute(cParamsData, data)
 *   1. Validates callId match and peerConnection presence
 *   2. pc.addIceCandidate(wSig.data as RTCIceCandidate)   — async, awaited
 *
 * @note
 * The explicit parseRtcIceCandidate call is commented out; the candidate is cast
 * directly from wSig.data. Consider adding typed parsing if candidate validation
 * is needed in future.
 *
 * @errorHandling  useCaseErrors.executeDefault (logs, does not rethrow)
 *
 * @see webRtcSignaling    — dispatches to this on ICE_CANDIDATE type
 * @see localIceCandidate  — the counterpart that sends local candidates to the remote peer
 */
import { useCaseErrors } from "../usesCases.js";
import { logger } from "../../logs/logs.js";
import { parserAHelper, validatorAHelper } from "../../helpers/helpers.js";

export class remoteIceCandidate {
  public static async execute(
    cParamsData: unknown /* ICommonParams.commonParams */,
    data: unknown /* IWebRtcSignaling.webRtcSignaling */
  ) {
    const className = "remoteIceCandidate";
    logger.log(className, "UseCase - " + className);
    try {
      const parser = parserAHelper;
      const validator = validatorAHelper;

      const cParams = parser.parseCommonParamsInterface(cParamsData);
      const wSig = parser.parseWebRTCSignalingInterface(data);
      const store = parser.parseStoreAgent(cParams.store);
      const cDetails = parser.parseCallDetailsInterface(wSig.callDetails);
      validator.checkCall(store, cDetails);
      validator.checkRTCPeerConnection(store.peerConnection);
      //const candidate = parser.parseRtcIceCandidate(wSig.data);
      const pc = parser.parseRTCPeerConnection(store.peerConnection);
      await pc.addIceCandidate(wSig.data as RTCIceCandidate);
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
