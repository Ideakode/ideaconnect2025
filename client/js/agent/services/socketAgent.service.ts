/**
 * @file socketAgent.service.ts
 * @class socketAgentService
 *
 * @description
 * Agent-specific socket service. Extends socketService with two additional outbound
 * emissions that are unique to the agent peer type. All base socket methods are inherited.
 *
 * @extends socketService  - (client/js/base/services/socket.service.ts)
 *
 * @staticMethods (agent-specific)
 * - notifyAgentAvailable(socket, avail, forPeer)
 *     Emits a CLIENT_NOTIFICATION of type AGENT_AVAILABLE, containing the agent's socket id,
 *     the new availability boolean, and the peer type it applies to (STRANGER or AGENT).
 *     Called by agentConnected (on reconnect sync) and availableForConnections (on toggle).
 *
 * - requestTotalStrangers(socket)
 *     Emits a CLIENT_REQUEST of type TOTAL_STRANGERS to ask the server for the current count
 *     of connected strangers. Called by agentConnected after each socket connection.
 *
 * @see socketService.sendClientNotification  - base emit used by notifyAgentAvailable
 * @see socketService.sendClientRequest       - base emit used by requestTotalStrangers
 * @see IAllowConnections                     - interface shape of the notification data
 */
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
