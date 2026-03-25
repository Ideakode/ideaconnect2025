/**
 * @file remoteIceCandidate.ts
 * @class remoteIceCandidate
 *
 * @description
 * Use case triggered when an ICE_CANDIDATE signaling message arrives from
 * the remote peer via the server. Adds the candidate to the local
 * RTCPeerConnection so NAT traversal can complete.
 *
 * @staticMethods
 * - execute(cParamsData, data)  [async]
 *     1. Parses cParams and the webRtcSignaling message
 *     2. Validates the call and peer connection
 *     3. Calls pc.addIceCandidate(wSig.data as RTCIceCandidate)
 *
 * @see webRtcSignaling — dispatcher (ICE_CANDIDATE path)
 */
import { useCaseErrors } from "../usesCases.js";
import { logger } from "../../logs/logs.js";
import { parserSHelper, validatorSHelper } from "../../helpers/helpers.js";

export class remoteIceCandidate {
  public static async execute(
    cParamsData: unknown /* ICommonParams.commonParams */,
    data: unknown /* IWebRtcSignaling.webRtcSignaling */
  ) {
    const className = "remoteIceCandidate";
    logger.log(className, "UseCase - " + className);
    try {
      const parser = parserSHelper;
      const validator = validatorSHelper;

      const cParams = parser.parseCommonParamsInterface(cParamsData);
      const wSig = parser.parseWebRTCSignalingInterface(data);
      const store = parser.parseStoreStranger(cParams.store);
      const cDetails = parser.parseCallDetailsInterface(wSig.callDetails);
      validator.checkCall(store, cDetails);
      validator.checkRTCPeerConnection(store.peerConnection);
      //const candidate = parser.parseRtcIceCandidate(wSig.data);
      const pc = parser.parseRTCPeerConnection(store.peerConnection);
      await pc.addIceCandidate(wSig.data as RTCIceCandidate);
    } catch (error) {
      const method = "execute";
      useCaseErrors.executeDefault(className, method, error);
    }
  }

  /*  public static handleError(error: unknown) {
    const method = this.handleError.name;
    errorHandler.wrapErrorUseCase(this.name, error, method);
  } */
}
