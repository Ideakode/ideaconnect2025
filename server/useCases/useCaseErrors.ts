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
