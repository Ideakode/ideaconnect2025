/**
 * @file callSignaling.ts  (stranger)
 * @class callSignaling
 *
 * @description
 * Handles call-signaling events originating from a stranger, routing them to
 * the target agent. Called by socketEventHandler for the /STRANGER namespace.
 *
 * Sequence:
 * 1. Parses commonParams and the call-signaling interface.
 * 2. Validates IO and the agent store.
 * 3. Verifies the target agent (sigData.routeTo.id) exists in storeA.
 * 4. Forwards the signaling message to the agent via socketSS.sendCallSignalingMessage.
 *
 * On any error, delegates to useCaseErrors.replyNotFoundIfNeeded which will
 * send a NOT_FOUND response back to the stranger if the error was a missing peer.
 *
 * @staticMethods
 * - execute(cParamsData, socketData, sigData)  Main handler, called by socketEventHandler.
 *
 * @see socketStrangerService — sendCallSignalingMessage
 * @see useCaseErrors         — replyNotFoundIfNeeded
 * @see validatorHelper       — checkPeerInStore
 */
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
