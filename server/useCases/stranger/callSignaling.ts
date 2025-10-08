import { socketSS } from "../../services/services.js";
import * as constants from "../../constants/constants.js";
import { parserHelper, validatorHelper } from "../../helpers/helpers.js";
import { logger } from "../../logs/logs.js";
import { useCaseErrors } from "../useCaseErrors.js";

export class callSignaling {
  public static execute(
    cParamsData: unknown /* ICommonParams.commonParams */,
    socketData: unknown /* Socket */,
    sigData: unknown /* ICallSignaling.callSignaling */
  ) {
    const className = "callSignaling";
    logger.log(className, "UseCase - " + className);
    try {
      const peerA = constants.peerTypes.AGENT;
      const cParams = parserHelper.parseCommonParamsInterface(cParamsData);
      const sig = parserHelper.parseCallSignalingInterface(sigData);
      const io = cParams.io;
      const storeA = cParams.storeAgent;
      const idAgent = sig.routeTo.id;
      validatorHelper.checkIO(io);
      validatorHelper.checkStore(storeA, peerA);
      validatorHelper.checkPeerInStore(idAgent, peerA, storeA);
      socketSS.sendCallSignalingMessage(io, peerA, sig);
    } catch (error: unknown) {
      const method = "execute";
      useCaseErrors.replyNotFoundIfNeeded(
        className,
        method,
        error,
        cParamsData,
        socketData,
        sigData
      );
      /* useCases.callSignaling.handleError(
        error,
        cParamsData,
        socketData,
        sigData
      ); */
    }
  }

  /*  public static replyNotFound(
    cParamsData: unknown /* ICommonParams.commonParams ,
    socketData: unknown /* Socket 
    sigData: unknown /* ICallSignaling.callSignaling 
  ) {
    try {
      const peerS = constants.peerTypes.STRANGER;
      const cParams = parserHelper.parseCommonParamsInterface(cParamsData);
      const socket = parserHelper.parseSocket(socketData);
      const sig = parserHelper.parseCallSignalingInterface(sigData);
      const io = cParams.io;
      validatorHelper.checkIO(io);

      sig.routeTo.id = socket.id;
      sig.callStatus.status = constants.callSignaling.NOT_FOUND;
      socketSS.sendCallSignalingMessage(io, peerS, sig);
    } catch (error: unknown) {
      const method = this.replyNotFound.name;
      errorHandler.wrapErrorUseCase(this.name, error, method);
    }
  } */
}
