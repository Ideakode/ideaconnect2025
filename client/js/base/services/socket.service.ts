/**
 * @file socket.service.ts
 * @class socketService
 *
 * @description
 * Manages the Socket.IO connection lifecycle and all outbound socket emissions.
 * The service is static-only; state is held in the peer's store, not here.
 *
 * @staticMethods
 * - createSocket(nspc, peerType): Socket | null
 *     Validates that namespace and peerType are consistent, then calls window.io(nspc)
 *     to create the Socket.IO client socket. Used during initialization.
 *
 * - initService(cParams, socketEM, namespace, peerType): void
 *     High-level bootstrap: creates the socket, saves it to the store via storeService,
 *     then calls socketEventHandler.registerEvents to bind all listeners.
 *
 * Outbound emit methods (each validates socket & payload before emitting):
 * - sendClientRequest(socket, data)       → emits CLIENT_REQUEST event
 * - sendClientNotification(socket, data)  → emits CLIENT_NOTIFICATION event
 * - sendCallSignaling(socket, data)       → emits CALL_SIGNALING event
 * - sendWebRTCSignaling(socket, data)     → emits WEBRTC_SIGNALING event
 *
 * @globalAugmentation
 * Declares Window.io as the Socket.IO client factory injected by the static HTML page
 * (via <script src="/socket.io/socket.io.js">).
 *
 * @see socketEventHandler  - registers all inbound socket listeners after initService
 * @see storeService        - saves the created socket to the peer store
 * @see messageBuilder      - builds the typed messages passed to the emit methods
 */
import { Socket } from "socket.io-client";
import { errorHandler } from "../errors/errors.js";
import { validatorHelper, parserHelper } from "../helpers/helpers.js";
import { logger } from "../logs/logs.js";
import { storeSvc } from "./services.js";
import * as constants from "../constants/constants.js";
import {
  ICommonParams,
  ICallSignaling,
  IClientRequest,
  IEventsMap,
  INotification,
  IWebRtcSignaling,
} from "../interfaces/interfaces.js";
import { socketEventHandler } from "../eventHandlers/eventHandlers.js";

declare global {
  interface Window {
    io: (namespace: string) => Socket;
  }
}

export class socketService {
  public static sendClientRequest(
    socket: Socket,
    data: IClientRequest.clientRequest
  ) {
    logger.log(this.name, "sendClientRequest | ", [data]);
    try {
      validatorHelper.checkSocket(socket);
      const ifData = parserHelper.parseClientRequestInterface(data);
      const ev = constants.socketIO.events.CLIENT_REQUEST;
      socket.emit(ev, ifData);
    } catch (error: unknown) {
      const method = this.sendClientRequest.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }
  public static sendClientNotification(
    socket: Socket,
    data: INotification.notification
  ) {
    logger.log(this.name, "sendClientNotification | ", [data]);
    try {
      const parser = parserHelper;
      const validator = validatorHelper;
      validator.checkSocket(socket);
      const ifData = parser.parseNotificationInterface(data);
      const ev = constants.socketIO.events.CLIENT_NOTIFICATION;
      socket.emit(ev, ifData);
    } catch (error: unknown) {
      const method = this.sendClientNotification.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }

  public static sendCallSignaling(
    socket: Socket,
    data: ICallSignaling.callSignaling
  ) {
    logger.log(this.name, "sendCallSignaling | ", [data]);
    try {
      const parser = parserHelper;
      const validator = validatorHelper;
      validator.checkSocket(socket);
      const ifData = parser.parseCallSignalingInterface(data);
      const ev = constants.socketIO.events.CALL_SIGNALING;
      socket.emit(ev, ifData);
    } catch (error: unknown) {
      const method = this.sendCallSignaling.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }

  public static sendWebRTCSignaling(
    socket: Socket,
    data: IWebRtcSignaling.webRtcSignaling
  ) {
    logger.log(this.name, "sendWebRTCSignaling | ", [data]);
    try {
      const parser = parserHelper;
      const validator = validatorHelper;
      validator.checkSocket(socket);
      const ifData = parser.parseWebRTCSignalingInterface(data);
      const ev = constants.socketIO.events.WEBRTC_SIGNALING;
      socket.emit(ev, ifData);
    } catch (error: unknown) {
      const method = this.sendWebRTCSignaling.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }

  public static createSocket(nspc: string, peerType: string): Socket | null {
    let mySocket: Socket | null = null;

    try {
      //const peerType = miscHelper.getTypeOfConnectedPeerBasedonURL();
      const validator = validatorHelper;
      validator.checkPeerUrlNamespace(nspc, peerType);
      mySocket = window.io(nspc) as Socket;
      return mySocket;
    } catch (error: unknown) {
      const method = this.createSocket.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }

  public static initService(
    cParams: ICommonParams.commonParams,

    socketEM: IEventsMap.eventsMap,
    namespace: string,
    peerType: string
  ): void {
    try {
      const socket = this.createSocket(namespace, peerType);
      // save socket in store if successfully created
      if (socket !== null) {
        storeSvc.setSocket(socket, cParams.store);
        const socketEvH = socketEventHandler;
        socketEvH.registerEvents(cParams, socketEM);
      }
    } catch (error: unknown) {
      const method = this.initService.name;
      errorHandler.propagateErrorService(this.name, error, method);
    }
  }
}
