import { socketAS } from "../../services/services.js";
import * as constants from "../../constants/constants.js";
import { logger } from "../../logs/logs.js";
import { parserHelper, validatorHelper } from "../../helpers/helpers.js";
import { useCaseErrors } from "../useCaseErrors.js";

export class callSignaling {
  public static execute(
    cParamsData: unknown /* ICommonParams.commonParams */,
    socketData: unknown /* Socket */,
    sigData: unknown // ICallSignaling.callSignaling
  ) {
    const className = "callSignaling";
    logger.log(className, "UseCase - " + className);

    try {
      const peerS = constants.peerTypes.STRANGER;
      const peerA = constants.peerTypes.AGENT;
      const cParams = parserHelper.parseCommonParamsInterface(cParamsData);
      const io = cParams.io;
      const storeS = cParams.storeStranger;
      const storeA = cParams.storeAgent;
      validatorHelper.checkIO(io);
      validatorHelper.checkStore(storeS, peerS);
      validatorHelper.checkStore(storeA, peerA);
      const sig = parserHelper.parseCallSignalingInterface(sigData);
      const idStranger = sig.routeTo.id;
      validatorHelper.checkPeerInStore(idStranger, peerS, storeS);
      socketAS.sendCallSignalingMessage(io, peerS, sig);
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
    }
  }

  /* public static handleError(
    error: unknown,
    cParams: unknown, //  ICommonParams.commonParams
    socket: unknown, // Socket
    sigData: unknown // ICallSignaling.callSignaling
  ) {
    const method = this.handleError.name;
    errorHandler.wrapErrorUseCase(this.name, error, method);

    if (error instanceof validatorErrorClass) {
      const noStranger = errorBuilder._error_peerS_not_in_store;
      switch (error.name) {
        case noStranger:
          socketAS.replyNotFound(cParams, socket, sigData);
          break;
        default:
          break;
      }
    }
  } */
}
