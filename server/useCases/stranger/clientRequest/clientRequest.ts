/**
 * @file clientRequest.ts  (stranger)
 * @class clientRequest
 *
 * @description
 * Dispatcher use case for client-request events from strangers. Parses the
 * incoming request, verifies the stranger is in the store, then routes to
 * the appropriate sub-use-case based on request type.
 *
 * Supported types:
 * - AVAILABLE_AGENTS → availableAgentsRequest.execute
 *
 * @staticMethods
 * - execute(cParamsData, socketData, reqData)  Main handler, called by socketEventHandler.
 *
 * @see availableAgentsRequest — handles AVAILABLE_AGENTS requests
 */
import * as constants from "../../../constants/constants.js";
import { logger } from "../../../logs/logs.js";
import { parserHelper, validatorHelper } from "../../../helpers/helpers.js";
import { useCaseErrors } from "../../useCaseErrors.js";
import { availableAgentsRequest } from "./availableAgents.request.js";

export class clientRequest {
  public static execute(
    cParamsData: unknown /* ICommonParams.commonParams */,
    socketData: unknown /* Socket */,
    reqData: unknown /* IClientRequest.clientRequest */
  ) {
    const className = "clientRequest";
    logger.log(className, "UseCase - " + className);
    try {
      const peerS = constants.peerTypes.STRANGER;
      const peerA = constants.peerTypes.AGENT;
      const cParams = parserHelper.parseCommonParamsInterface(cParamsData);
      const socket = parserHelper.parseSocket(socketData);
      const req = parserHelper.parseClientRequestInterface(reqData);
      const io = cParams.io;
      const storeS = cParams.storeStranger;
      const storeA = cParams.storeAgent;
      validatorHelper.checkIO(io);
      validatorHelper.checkStore(storeS, peerS);
      validatorHelper.checkStore(storeA, peerA);
      validatorHelper.checkPeerInStore(socket.id, peerS, storeS);

      switch (req.requestType) {
        case constants.clientRequestTypes.AVAILABLE_AGENTS:
          availableAgentsRequest.execute(cParams, socket);
          break;
        default:
          logger.log(this.name, "Nothing to be executed!", [reqData]);
      }
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
