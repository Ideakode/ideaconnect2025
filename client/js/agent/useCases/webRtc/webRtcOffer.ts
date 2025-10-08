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
