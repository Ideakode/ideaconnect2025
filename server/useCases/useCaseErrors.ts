/**
 * @file useCaseErrors.ts
 * @const useCaseErrors
 *
 * @description
 * Shared error-handling utilities used in the catch blocks of every server use case.
 * Exported as a plain object with two functions so that use cases can call them
 * without importing a class.
 *
 * @functions
 * - executeDefault(by, method, error)
 *     Wraps any caught error via errorHandler.wrapErrorUseCase. Called in every
 *     use case catch block as the standard error logging step.
 *
 * - replyNotFoundIfNeeded(by, method, error, cParamsData, socketData, sigData)
 *     Calls executeDefault first, then inspects whether the error is a
 *     validatorErrorClass instance. If so, checks the error name:
 *       - peerS_not_in_store → sends a NOT_FOUND call-signaling message to the
 *         agent (via socketAS) routed back to the caller's socket ID.
 *       - peerA_not_in_store → sends a NOT_FOUND call-signaling message to the
 *         stranger (via socketSS) routed back to the caller's socket ID.
 *     This handles race conditions where a peer disconnects between the routing
 *     validation step and the actual emit.
 *
 * @see validatorHelper          — throws the validatorErrorClass errors caught here
 * @see callSignaling (agent)    — uses replyNotFoundIfNeeded
 * @see callSignaling (stranger) — uses replyNotFoundIfNeeded
 * @see webRtcSignaling (agent)  — uses replyNotFoundIfNeeded
 * @see webRtcSignaling (stranger) — uses replyNotFoundIfNeeded
 */
import * as constants from "../constants/constants.js";
import { errorBuilder, errorHandler } from "../errors/errors.js";
import { validatorErrorClass } from "../errors/classes/validator.error.js";
import { socketAS, socketSS } from "../services/services.js";
import { parserHelper } from "../helpers/parser.helper.js";
import { messageBuilder as mBuilder } from "../helpers/messageBuilder.js";

const executeDefault = (by: string, method: string, error: unknown) => {
  errorHandler.wrapErrorUseCase(by, error, method);
};

const replyNotFoundIfNeeded = (
  by: string,
  method: string,
  error: unknown,
  cParamsData: unknown /* ICommonParams.commonParams */,
  socketData: unknown /* Socket */,
  sigData: unknown /* ICallSignaling.callSignaling */
) => {
  executeDefault(by, method, error);
  try {
    if (error instanceof validatorErrorClass) {
      const noStranger = errorBuilder._error_peerS_not_in_store;
      const noAgent = errorBuilder._error_peerA_not_in_store;
      const cParams = parserHelper.parseCommonParamsInterface(cParamsData);
      const io = cParams.io;
      const socket = parserHelper.parseSocket(socketData);
      const sig = parserHelper.parseCallSignalingInterface(sigData);
      const cDetails = sig.callDetails;
      const routeTo = socket.id;
      const msg = mBuilder.callSignalingNotFound(cDetails, routeTo);
      switch (error.name) {
        case noStranger: {
          const peerA = constants.peerTypes.AGENT;
          socketAS.sendCallSignalingMessage(io, peerA, msg);
          break;
        }
        case noAgent: {
          const peerS = constants.peerTypes.STRANGER;
          socketSS.sendCallSignalingMessage(io, peerS, msg);
          break;
        }
        default:
          break;
      }
    }
  } catch (error: unknown) {
    const by = "useCaseErrors";
    const method = "replyNotFoundIfNeeded";
    executeDefault(by, method, error);
  }
};

export const useCaseErrors = {
  executeDefault,
  replyNotFoundIfNeeded,
};
