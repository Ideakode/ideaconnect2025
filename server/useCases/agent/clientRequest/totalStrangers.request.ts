import type { Socket } from "socket.io";
import { storeSS, socketAS } from "../../../services/services.js";
import { ICommonParams } from "../../../interfaces/interfaces.js";
import * as constants from "../../../constants/constants.js";
import { validatorHelper } from "../../../helpers/helpers.js";
import { logger } from "../../../logs/logs.js";
import { useCaseErrors } from "../../useCaseErrors.js";

/**
 * @file totalStrangers.request.ts
 * @class totalStrangersRequest
 *
 * @description
 * Handles an agent's request for the current total number of connected strangers.
 * Called by clientRequest when the request type is TOTAL_STRANGERS.
 *
 * Sequence:
 * 1. Validates commonParams, IO, socket, and both stores.
 * 2. Verifies the requesting agent is still in storeA.
 * 3. Gets the stranger count from storeStrangerService.
 * 4. Sends a TOTAL_STRANGERS SERVER_NOTIFICATION back to the requesting agent only.
 *
 * @staticMethods
 * - execute(cParams, socket)  Main handler, called by clientRequest.
 *
 * @see storeStrangerService — getTotalConnectedStrangers
 * @see socketAgentService  — notifyTotalStrangers
 */

export class totalStrangersRequest {
  public static execute(cParams: ICommonParams.commonParams, socket: Socket) {
    const className = "totalStrangersRequest";
    logger.log(className, "UseCase - " + className);

    try {
      const peerA = constants.peerTypes.AGENT;
      const peerS = constants.peerTypes.STRANGER;
      validatorHelper.checkCommonParamsInterface(cParams);
      validatorHelper.checkIO(cParams.io);
      validatorHelper.checkSocket(socket);
      const io = cParams.io;
      const storeS = cParams.storeStranger;
      const storeA = cParams.storeAgent;
      validatorHelper.checkStore(storeS, peerS);
      validatorHelper.checkStore(storeA, peerA);
      validatorHelper.checkPeerInStore(socket.id, peerA, storeA);

      const strangers = storeSS.getTotalConnectedStrangers(storeS).toString();
      socketAS.notifyTotalStrangers(io, socket.id, strangers, false);
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
