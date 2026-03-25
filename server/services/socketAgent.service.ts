/**
 * @file socketAgent.service.ts
 * @class socketAgentService  (exported as socketAS)
 *
 * @description
 * Agent-specific socket service. Extends socketService with three methods
 * that are only relevant to the agent namespace (/AGENT).
 *
 * @staticMethods
 * - initAgent(cParams, eventsMap)
 *     Delegates to socketEventHandler.init to register the connect listener
 *     on the /AGENT namespace using the provided events map.
 *
 * - notifyTotalStrangers(io, toId, strangers, broadcast)
 *     Builds a TOTAL_STRANGERS SERVER_NOTIFICATION and sends it to a specific
 *     agent socket or broadcasts it to all agents.
 *
 * - replyNotFound(cParamsData, socketData, sigData, toPeerType)
 *     Sets the call-signaling status to NOT_FOUND, routes back to the caller's
 *     socket ID, and emits the CALL_SIGNALING event. Used when a target peer
 *     is not found in the store.
 *
 * @see socketService          — base class
 * @see socketEventHandler     — used by initAgent
 * @see agentInitialization    — calls initAgent
 * @see useCaseErrors          — calls replyNotFound for error recovery
 */
import { Server as IOServer } from "socket.io";
import { socketEventHandler } from "../eventHandlers/eventHandlers.js";
import * as constants from "../constants/constants.js";
import {
  ICommonParams,
  IEventsMap,
  INotification,
  ITotal,
} from "../interfaces/interfaces.js";
import { socketService } from "./socket.service.js";
import { errorHandler } from "../errors/errors.js";
import { parserHelper, validatorHelper } from "../helpers/helpers.js";

export class socketAgentService extends socketService {
  public static initAgent(
    cParams: ICommonParams.commonParams,
    eventsMap: IEventsMap.eventsMap
  ): void {
    try {
      validatorHelper.checkCommonParamsInterface(cParams);
      const namespace = constants.socketIO.namespaces.AGENT;
      socketEventHandler.init(cParams, eventsMap, namespace);
    } catch (error: unknown) {
      const method = this.initAgent.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }

  public static notifyTotalStrangers(
    io: IOServer,
    toId: string = "",
    strangers: string,
    broadcast: boolean
  ) {
    try {
      validatorHelper.checkIO(io);
      const peerType = constants.peerTypes.AGENT;
      const notif = constants.notificationTypes.server.TOTAL_STRANGERS;
      const totalIF = ITotal.getTotal(strangers);
      const notifIF = INotification.getNotification(notif, totalIF);

      this.sendServerNotification(io, peerType, toId, broadcast, notifIF);
    } catch (error: unknown) {
      const method = this.notifyTotalStrangers.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }

  public static replyNotFound(
    cParamsData: unknown /* ICommonParams.commonParams */,
    socketData: unknown /* Socket */,
    sigData: unknown, // ICallSignaling.callSignaling,
    toPeerType: string
  ) {
    try {
      validatorHelper.checkPeerType(toPeerType);
      const cParams = parserHelper.parseCommonParamsInterface(cParamsData);
      const socket = parserHelper.parseSocket(socketData);
      const sig = parserHelper.parseCallSignalingInterface(sigData);
      const io = cParams.io;
      validatorHelper.checkIO(io);
      sig.routeTo.id = socket.id;
      sig.callStatus.status = constants.callSignaling.NOT_FOUND;
      this.sendCallSignalingMessage(io, toPeerType, sig);
    } catch (error: unknown) {
      const method = this.replyNotFound.name;
      errorHandler.wrapErrorUseCase(this.name, error, method);
    }
  }
}
