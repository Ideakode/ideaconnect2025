import * as constants from "../../constants/constants.js";
import { socketSS } from "../../services/services.js";
import { logger } from "../../logs/logs.js";
import { parserHelper, validatorHelper } from "../../helpers/helpers.js";
import { useCaseErrors } from "../useCaseErrors.js";

export class webRtcSignaling {
  public static execute(
    cParamsData: unknown /* ICommonParams.commonParams */,
    socketData: unknown /* Socket */,
    wSigdata: unknown //webRTCSignalingInterface: IWebRtcSignaling.webRtcSignaling
  ) {
    const className = "webRtcSignaling";
    logger.log(className, "UseCase - " + className);

    try {
      const cParams = parserHelper.parseCommonParamsInterface(cParamsData);
      const io = cParams.io;
      const storeA = cParams.storeAgent;
      const peerA = constants.peerTypes.AGENT;
      const wSig = parserHelper.parseWebRTCSignalingInterface(wSigdata);
      const agentId = wSig.routeTo.id;
      validatorHelper.checkIO(io);
      validatorHelper.checkStore(storeA, peerA);
      validatorHelper.checkPeerInStore(agentId, peerA, storeA);
      socketSS.sendWebRTCSignalingMessage(io, peerA, agentId, false, wSig);
    } catch (error: unknown) {
      const wSig = parserHelper.parseWebRTCSignalingInterface(wSigdata);
      const callSig = parserHelper.parseCallSignalingInterface(
        wSig.callDetails
      );
      const method = "execute";
      useCaseErrors.replyNotFoundIfNeeded(
        className,
        method,
        error,
        cParamsData,
        socketData,
        callSig
      );
    }
  }
  /* 
  public static handleError(
    error: unknown,
    cParams: unknown /* ICommonParams.commonParams 
    socket: unknown /* Socket 
    wSig: unknown /* IWebRtcSignaling.webRtcSignaling
  ) {
    if (
      error instanceof validatorErrorClass &&
      error.name === errorBuilder._error_peerA_not_in_store
    ) {
      useCases.webRtcSignaling.replyNotFound(cParams, socket, wSig);
    } else {
      const method = this.handleError.name;
      errorHandler.wrapErrorUseCase(this.name, error, method);
    }
  }
 */

  /* 
  public static replyNotFound(
    cParamsData: unknown /* ICommonParams.commonParams,
    socketData: unknown /* Socket ,
    wSigData: unknown /* IWebRtcSignaling.webRtcSignaling 
  ) {
    try {
      const peerS = constants.peerTypes.STRANGER;
      const cParams = parserHelper.parseCommonParamsInterface(cParamsData);
      const socket = parserHelper.parseSocket(socketData);
      const wSig = parserHelper.parseWebRTCSignalingInterface(wSigData);
      const io = cParams.io;
      validatorHelper.checkIO(io);

      wSig.routeTo.id = socket.id;
      const notfound = constants.webRTC.signaling.NOT_FOUND;
      wSig.callStatus.status = notfound;
      socketSS.sendCallSignalingMessage(io, peerS, wSig);
    } catch (error: unknown) {
      const method = this.replyNotFound.name;
      errorHandler.wrapErrorUseCase(this.name, error, method);
    }
  } */
}
