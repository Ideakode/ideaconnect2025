/**
 * @file webRtcSignaling.ts
 * @class webRtcSignaling
 *
 * @description
 * Dispatcher use case for incoming WEBRTC_SIGNALING socket events.
 * Parses the signaling envelope and routes to the appropriate child
 * use case based on the wSig.type field.
 *
 * Dispatched types:
 * - ICE_CANDIDATE → remoteIceCandidate.execute
 * - ANSWER        → webRtcAnswer.execute
 * - OFFER         → (reserved, not yet implemented)
 *
 * @staticMethods
 * - execute(cParamsData, data)
 *     Parses cParams and the webRTC signaling message, then dispatches on type.
 *
 * @see socketEventMapping  — registers this as the WEBRTC_SIGNALING listener
 */
import * as constants from "../../constants/constants.js";
import { logger } from "../../logs/logs.js";
import { parserSHelper } from "../../helpers/helpers.js";
import { remoteIceCandidate } from "./remoteIceCandidate.js";
import { webRtcAnswer } from "./webRtcAnswer.js";

export class webRtcSignaling {
  public static execute(
    cParamsData: unknown /* ICommonParams.commonParams */,
    data: unknown /* IWebRtcSignaling.webRtcSignaling */
  ) {
    const className = "webRtcSignaling";
    logger.log(className, "UseCase - " + className);

    const parser = parserSHelper;
    const cParams = parser.parseCommonParamsInterface(cParamsData);
    const wSig = parser.parseWebRTCSignalingInterface(data);
    switch (wSig.type) {
      case constants.webRTC.signaling.ICE_CANDIDATE:
        remoteIceCandidate.execute(cParams, wSig);
        break;
      case constants.webRTC.signaling.ANSWER:
        webRtcAnswer.execute(cParams, wSig);
        break;
      case constants.webRTC.signaling.OFFER:
        //useCases.webRtc.offer.execute(cParams, wSig);
        break;
      default:
        logger.log(this.name, "UseCases - not executed");
    }
  }

  /* public static handleError(error: unknown) {
    logErrors.send(this, error);
  } */
}
