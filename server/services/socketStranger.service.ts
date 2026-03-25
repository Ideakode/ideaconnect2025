/**
 * @file socketStranger.service.ts
 * @class socketStrangerService  (exported as socketSS)
 *
 * @description
 * Stranger-specific socket service. Extends socketService with two methods
 * that are only relevant to the stranger namespace (/STRANGER).
 *
 * @staticMethods
 * - initStranger(cParams, evsMap)
 *     Delegates to socketEventHandler.init to register the connect listener
 *     on the /STRANGER namespace using the provided events map.
 *
 * - notifyAvailableAgents(io, strangerId, agentsIF, broadcast)
 *     Builds an AVAILABLE_AGENTS SERVER_NOTIFICATION and sends it to a specific
 *     stranger socket or broadcasts it to all strangers.
 *
 * @see socketService          — base class
 * @see socketEventHandler     — used by initStranger
 * @see strangerInitialization — calls initStranger
 * @see availableAgentsRequest — calls notifyAvailableAgents
 */
import { Server as IOServer } from "socket.io";
import { socketEventHandler } from "../eventHandlers/eventHandlers.js";
import {
  ICommonParams,
  IPeers,
  IEventsMap,
  INotification,
} from "../interfaces/interfaces.js";
import * as constants from "../constants/constants.js";
import { socketService } from "./socket.service.js";
import { validatorHelper } from "../helpers/helpers.js";
import { errorHandler } from "../errors/errors.js";

export class socketStrangerService extends socketService {
  public static initStranger(
    cParams: ICommonParams.commonParams,
    evsMap: IEventsMap.eventsMap
  ) {
    try {
      validatorHelper.checkCommonParamsInterface(cParams);
      const namespace = constants.socketIO.namespaces.STRANGER;
      socketEventHandler.init(cParams, evsMap, namespace);
    } catch (error: unknown) {
      const method = this.initStranger.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }

  public static notifyAvailableAgents(
    io: IOServer,
    strangerId: string = "",
    agentsIF: IPeers.peers,
    broadcast: boolean
  ) {
    try {
      validatorHelper.checkIO(io);
      const notType = constants.notificationTypes.server.AVAILABLE_AGENTS;
      const notIF = INotification.getNotification(notType, agentsIF);
      const peerS = constants.peerTypes.STRANGER;
      this.sendServerNotification(io, peerS, strangerId, broadcast, notIF);
    } catch (error: unknown) {
      const method = this.notifyAvailableAgents.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }
}
