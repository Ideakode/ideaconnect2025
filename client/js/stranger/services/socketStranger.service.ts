/**
 * @file socketStranger.service.ts
 * @class socketStrangerService  (exported as socketSSvc)
 *
 * @description
 * Extends the base socketSvc with a stranger-specific socket operation.
 * Provides the requestAvailableAgents method which emits a CLIENT_REQUEST
 * message of type AVAILABLE_AGENTS to the server, triggering the server to
 * broadcast the current agent list back to this stranger.
 *
 * @staticMethods
 * - requestAvailableAgents(socket)
 *     Validates the socket, builds a clientRequest message with type
 *     AVAILABLE_AGENTS and sends it via sendClientRequest.
 *     Called by strangerConnected upon socket connection.
 *
 * @see strangerConnected  — caller on socket connect event
 * @see messageBuilder.buildClientRequest
 */
import { Socket } from "socket.io-client";
import { socketSvc } from "../../base/services/services.js";
import { errorHandler } from "../errors/errors.js";
import * as constants from "../constants/constants.js";
import { validatorSHelper, messageBuilder } from "../helpers/helpers.js";

export class socketStrangerService extends socketSvc {
  public static requestAvailableAgents(socket: Socket) {
    try {
      const validator = validatorSHelper;
      validator.checkSocket(socket);
      const type = constants.clientRequestTypes.AVAILABLE_AGENTS;
      const msg = messageBuilder.buildClientRequest(type);
      this.sendClientRequest(socket, msg);
    } catch (error: unknown) {
      const method = this.requestAvailableAgents.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }
}
