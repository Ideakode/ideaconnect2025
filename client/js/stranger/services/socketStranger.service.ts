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
