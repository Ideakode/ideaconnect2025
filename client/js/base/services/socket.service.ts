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
