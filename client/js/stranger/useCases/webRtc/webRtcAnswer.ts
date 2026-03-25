/**
 * @file webRtcAnswer.ts
 * @class webRtcAnswer
 *
 * @description
 * Use case triggered when the remote peer sends back the WebRTC SDP answer
 * (ANSWER type in the webRTC signaling envelope).
 * Sets the answer as the remote description on the stored RTCPeerConnection.
 *
 * @staticMethods
 * - execute(cParamsData, data)  [async]
 *     1. Parses cParams and the webRtcSignaling data
 *     2. Validates the active call and peer connection
 *     3. Calls pc.setRemoteDescription(wSig.data as RTCSessionDescriptionInit)
 *
 * @see webRtcSignaling  — dispatcher
 * @see webRtcEventMapping  — also has ANSWER mapped here directly
 */
import { useCaseErrors } from "../usesCases.js";
import { logger } from "../../logs/logs.js";
import { parserSHelper, validatorSHelper } from "../../helpers/helpers.js";

export class webRtcAnswer {
  public static async execute(
    cParamsData: unknown /* ICommonParams.commonParams */,
    data: unknown /* IWebRtcSignaling.webRtcSignaling */
  ) {
    const className = "webRtcAnswer";
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
      const pc = parser.parseRTCPeerConnection(store.peerConnection);
      //const sdp = parser.parseRtcSDP(wSig.data)
      await pc.setRemoteDescription(wSig.data as RTCSessionDescriptionInit);
    } catch (error) {
      const method = "execute";
      useCaseErrors.executeDefault(className, method, error);
    }
  }

  /* public static handleError(error: unknown) {
    const method = this.handleError.name;
    errorHandler.wrapErrorUseCase(this.name, error, method);
  } */
}
