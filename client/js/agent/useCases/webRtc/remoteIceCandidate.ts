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
