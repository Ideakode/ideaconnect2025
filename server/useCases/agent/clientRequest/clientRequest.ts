/**
 * @file clientRequest.ts
 * @class clientRequest
 *
 * @description
 * Dispatcher use case for client-request events from agents. Parses the
 * incoming request, verifies the agent is in the store, then routes to
 * the appropriate sub-use-case based on request type.
 *
 * Supported types:
 * - TOTAL_STRANGERS → totalStrangersRequest.execute
 *
 * @staticMethods
 * - execute(cParamsData, socketData, reqData)  Main handler, called by socketEventHandler.
 *
 * @see totalStrangersRequest — handles TOTAL_STRANGERS requests
 */
import * as constants from "../../../constants/constants.js";
import { parserHelper, validatorHelper } from "../../../helpers/helpers.js";
import { logger } from "../../../logs/logs.js";
import { totalStrangersRequest } from "./totalStrangers.request.js";
import { useCaseErrors } from "../../useCaseErrors.js";

export class clientRequest {
  public static execute(
    cParamsData: unknown /* ICommonParams.commonParams */,
    socketData: unknown /* Socket */,
    reqData: unknown /* IClientRequest.clientRequest */
  ) {
    const className = "clientRequest";
    logger.log(className, "UseCase - " + className);

    try {
      const peerA = constants.peerTypes.AGENT;
      const cParams = parserHelper.parseCommonParamsInterface(cParamsData);
      const socket = parserHelper.parseSocket(socketData);
      const req = parserHelper.parseClientRequestInterface(reqData);
      validatorHelper.checkStore(cParams.storeAgent, peerA);
      const storeA = cParams.storeAgent;
      validatorHelper.checkPeerInStore(socket.id, peerA, storeA);

      const totStrangers = constants.clientRequestTypes.TOTAL_STRANGERS;
      switch (req.requestType) {
        case totStrangers: {
          totalStrangersRequest.execute(cParams, socket);
          break;
        }
        default:
          logger.log(this.name, "Nothing to execute!", [req]);
      }
    } catch (error: unknown) {
      const method = "execute";
      useCaseErrors.executeDefault(className, method, error);
    }
  }

  /*  public static handleError(error: unknown) {
    const method = this.handleError.name;
    errorHandler.wrapErrorUseCase(this.name, error, method);
  } */
}
