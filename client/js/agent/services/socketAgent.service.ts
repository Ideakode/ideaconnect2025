import { Socket } from "socket.io-client";
import { socketSvc } from "../../base/services/services.js";
import { IAllowConnections } from "../interfaces/interfaces.js";
import * as constants from "../constants/constants.js";
import { errorHandler } from "../errors/errors.js";
import { validatorAHelper, messageBuilder } from "../helpers/helpers.js";

export default class socketAgentService extends socketSvc {
  public static notifyAgentAvailable(
    socket: Socket,
    avail: boolean,
    forPeer: string
  ) {
    try {
      validatorAHelper.checkSocket(socket);
      const nType = constants.notificationTypes.client.AGENT_AVAILABLE;
      /* const peerS = constants.peerTypes.STRANGER; */
      const id = socket.id !== undefined ? socket.id : "";
      const data = IAllowConnections.getAllowConnections(id, avail, forPeer);
      const msg = messageBuilder.buildClientNotification(nType, data);
      this.sendClientNotification(socket, msg);
    } catch (error: unknown) {
      const method = this.notifyAgentAvailable.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }

  public static requestTotalStrangers(socket: Socket) {
    try {
      const type = constants.clientRequestTypes.TOTAL_STRANGERS;
      const msg = messageBuilder.buildClientRequest(type);
      this.sendClientRequest(socket, msg);
    } catch (error: unknown) {
      const method = this.requestTotalStrangers.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }
}
