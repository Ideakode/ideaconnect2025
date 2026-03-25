/**
 * @file socket.service.ts
 * @class socketService
 *
 * @description
 * Base socket service providing shared emit helpers used by both the agent
 * and stranger socket services. All methods are static. Validates inputs
 * via validatorHelper and parses interfaces via parserHelper before emitting.
 *
 * @staticMethods
 * - notifyPeers(io, peerTypeToNotify, event, data, peerId, broadcast)
 *     Core emit primitive. Resolves the correct Socket.IO namespace from peerType,
 *     then either broadcasts to all peers or emits to a specific socket ID.
 *
 * - sendCallSignalingMessage(io, toPeerType, sigData)
 *     Parses the call-signaling interface and emits a CALL_SIGNALING event
 *     to the destination socket ID specified in sigData.routeTo.id.
 *
 * - sendCallSignalingNotFound(cParamsData, socketData, sigData, toPeerType)
 *     Mutates sigData to set status NOT_FOUND and routeTo.id to the caller's
 *     socket ID, then sends the signaling message back to the caller.
 *
 * - sendServerNotification(io, toPeerType, peerId, broadcast, notifData)
 *     Wraps a SERVER_NOTIFICATION event emit, targeting a specific peer or
 *     broadcasting to the entire namespace.
 *
 * - sendWebRTCSignalingMessage(io, toPeerType, peerId, broadcast, wSigData)
 *     Wraps a WEBRTC_SIGNALING event emit.
 *
 * - registerSocketEvents(cParams, socket, eventsMap)
 *     Delegates to socketEventHandler.registerPeerSocketEvents to bind
 *     all non-connect events on an individual socket.
 *
 * @see socketAgentService   — extends this with agent-specific methods
 * @see socketStrangerService — extends this with stranger-specific methods
 * @see socketEventHandler   — used by registerSocketEvents
 */
import { Server as IOServer, Socket } from "socket.io";
import * as constants from "../constants/constants.js";
import {
  ICommonParams,
  ICallSignaling,
  IEventsMap,
  INotification,
  IWebRtcSignaling,
} from "../interfaces/interfaces.js";
import { logger } from "../logs/logs.js";
import { socketEventHandler } from "../eventHandlers/eventHandlers.js";
import { validatorHelper, parserHelper } from "../helpers/helpers.js";
import { errorHandler } from "../errors/errors.js";

export class socketService {
  public static notifyPeers(
    io: IOServer,
    peerTypeToNotify: string,
    event: string,
    data: unknown,
    peerId: string = "",
    broadcast: boolean
  ) {
    try {
      validatorHelper.checkIO(io);
      validatorHelper.checkPeerType(peerTypeToNotify);
      //setup namespace
      let namespace: string = "";
      if (peerTypeToNotify === constants.peerTypes.AGENT) {
        namespace = constants.socketIO.namespaces.AGENT;
      } else if (peerTypeToNotify === constants.peerTypes.STRANGER) {
        namespace = constants.socketIO.namespaces.STRANGER;
      }
      validatorHelper.checkNamespace(namespace);
      //send notification event
      if (broadcast) {
        io.of(namespace).emit(event, data);
        const objToLog = { event, broadcast, peerTypeToNotify, data };
        this.log("notifyPeers - executed", objToLog);
      } else {
        io.of(namespace).to(peerId).emit(event, data);
        const objToLog = { event, broadcast, peerId, peerTypeToNotify, data };
        this.log("notifyPeers - executed", objToLog);
      }
    } catch (error: unknown) {
      const method = this.notifyPeers.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }

  public static sendCallSignalingMessage(
    io: IOServer,
    toPeerType: string,
    sigData: ICallSignaling.callSignaling
  ) {
    try {
      validatorHelper.checkIO(io);
      validatorHelper.checkPeerType(toPeerType);
      const sig = parserHelper.parseCallSignalingInterface(sigData);
      const evSig = constants.socketIO.events.CALL_SIGNALING;
      const toId = sig.routeTo.id;
      this.notifyPeers(io, toPeerType, evSig, sig, toId, false);
    } catch (error: unknown) {
      const method = this.sendCallSignalingMessage.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }

  public static sendCallSignalingNotFound(
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
      sig.routeTo.id = socket.id;
      sig.callStatus.status = constants.callSignaling.NOT_FOUND;
      this.sendCallSignalingMessage(io, toPeerType, sig);
    } catch (error: unknown) {
      const method = this.sendCallSignalingNotFound.name;
      errorHandler.wrapErrorUseCase(this.name, error, method);
    }
  }

  public static sendServerNotification(
    io: IOServer,
    toPeerType: string,
    peerId: string,
    broadcast: boolean,
    notifData: INotification.notification
  ) {
    try {
      validatorHelper.checkIO(io);
      validatorHelper.checkPeerType(toPeerType);
      const notif = parserHelper.parseNotificationInterface(notifData);
      const evNotif = constants.socketIO.events.SERVER_NOTIFICATION;
      this.notifyPeers(io, toPeerType, evNotif, notif, peerId, broadcast);
    } catch (error: unknown) {
      const method = this.sendServerNotification.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }

  public static sendWebRTCSignalingMessage(
    io: IOServer,
    toPeerType: string,
    peerId: string,
    broadcast: boolean,
    wSigData: IWebRtcSignaling.webRtcSignaling
  ) {
    try {
      validatorHelper.checkIO(io);
      validatorHelper.checkPeerType(toPeerType);
      const wSig = parserHelper.parseWebRTCSignalingInterface(wSigData);
      const ev = constants.socketIO.events.WEBRTC_SIGNALING;
      this.notifyPeers(io, toPeerType, ev, wSig, peerId, broadcast);
    } catch (error: unknown) {
      const method = this.sendWebRTCSignalingMessage.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }

  public static registerSocketEvents(
    cParams: ICommonParams.commonParams,
    socket: Socket,
    eventsMap: IEventsMap.eventsMap
  ) {
    try {
      validatorHelper.checkCommonParamsInterface(cParams);
      validatorHelper.checkSocket(socket);
      socketEventHandler.registerPeerSocketEvents(cParams, socket, eventsMap);
    } catch (error: unknown) {
      const method = this.registerSocketEvents.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }

  private static log(text: string, object: unknown) {
    logger.log(this.name, text, [object]);
  }
}
