/**
 * @file webRtcSignaling.ts
 * @class webRtcSignaling
 *
 * @description
 * Dispatcher use case for all inbound WEBRTC_SIGNALING socket events.
 * Parses the raw WebRTC signaling envelope, then routes to the appropriate
 * sub-use-case based on the signaling type.
 *
 * @flow
 * WEBRTC_SIGNALING → webRtcSignaling.execute(cParamsData, wSigData)
 *   - OFFER         → webRtcOffer.execute(cParams, wSig)
 *   - ICE_CANDIDATE → remoteIceCandidate.execute(cParams, wSig)
 *   - NOT_FOUND     → logs "NOT FOUND. To DO" (not yet implemented)
 *   - default       → logs "not executed"
 *
 * @errorHandling  useCaseErrors.executeDefault (logs, does not rethrow)
 *
 * @see socketEventMapping — registers this as the WEBRTC_SIGNALING callback
 * @see webRtcOffer        — handles the incoming SDP offer
 * @see remoteIceCandidate — adds the remote ICE candidate to the peer connection
 */
import * as constants from "../../constants/constants.js";
import { useCaseErrors } from "../usesCases.js";
import { logger } from "../../logs/logs.js";
import { parserAHelper } from "../../helpers/helpers.js";
import { webRtcOffer, remoteIceCandidate } from "./webRtc.js";

export class webRtcSignaling {
  public static execute(
    cParamsData: unknown /* ICommonParams.commonParams */,
    wSigData: unknown /* IWebRtcSignaling.webRtcSignaling */
  ) {
    const className = "webRtcSignaling";
    logger.log(className, "UseCase - " + className);

    try {
      const parser = parserAHelper;
      const cParams = parser.parseCommonParamsInterface(cParamsData);
      const wSig = parser.parseWebRTCSignalingInterface(wSigData);

      switch (wSig.type) {
        case constants.webRTC.signaling.OFFER:
          webRtcOffer.execute(cParams, wSig);
          break;
        case constants.webRTC.signaling.ICE_CANDIDATE:
          remoteIceCandidate.execute(cParams, wSig);
          break;
        case constants.webRTC.signaling.NOT_FOUND:
          logger.log(className, "UseCases - NOT FOUND. To DO");
          break;
        default:
          logger.log(className, "UseCases - not executed");
      }
    } catch (error: unknown) {
      const method = "execute";
      useCaseErrors.executeDefault(className, method, error);
    }
  }

  /*  public static handleError(error: unknown) {
    const method = this.handleError.name;
    errorHandler.wrapErrorUseCase(this.name, error, method);
  } */
}
