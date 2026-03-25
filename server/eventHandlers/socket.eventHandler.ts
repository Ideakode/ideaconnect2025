/**
 * @file socket.eventHandler.ts
 * @class socketEventHandler
 *
 * @description
 * Core event binding engine for both the agent and stranger namespaces.
 * Handles two distinct phases of socket lifecycle:
 *
 * 1. Namespace initialisation (init / setReadyForConnections):
 *    Registers the `connect` listener on the given Socket.IO namespace so the
 *    server is ready to accept incoming connections.
 *
 * 2. Per-socket event binding (registerPeerSocketEvents / bindSocketEvents):
 *    Called after a peer connects; iterates the eventsMap and binds each
 *    non-connect event to its corresponding use case execute function via buildCallback.
 *
 * @staticMethods
 * - init(cParams, eventsMap, namespace)
 *     Public entry point for namespace initialisation. Validates inputs and
 *     delegates to setReadyForConnections.
 *
 * - registerPeerSocketEvents(cParams, socket, eventsMap)
 *     Public entry point for per-socket binding. Validates inputs and
 *     delegates to bindSocketEvents.
 *
 * - buildCallback(cParams, mySocket, eventMap)  [private]
 *     Wraps a use case execute function into a Socket.IO-compatible callback.
 *     CONNECT callbacks receive (cParams, socketData); all others receive
 *     (cParams, socket, data).
 *
 * - setReadyForConnections(namespace, cParams, evs)  [private]
 *     Resolves the CONNECT entry from the events map, builds its callback,
 *     and registers it on the namespace.
 *
 * - bindSocketEvents(cParams, socket, eventsCallbacks)  [private]
 *     Iterates every event in the map (CONNECT is re-bound here but effectively
 *     handled as a no-op since it fires on the namespace, not the socket),
 *     builds a callback for each, and calls socket.on.
 *
 * @see socketAgentService   — calls init via initAgent
 * @see socketStrangerService — calls init via initStranger
 * @see socketService        — calls registerPeerSocketEvents via registerSocketEvents
 */
import type { Socket } from "socket.io";
import * as constants from "../constants/constants.js";
import {
  ICommonParams,
  IEventMap,
  IEventsMap,
} from "../interfaces/interfaces.js";
import { logger } from "../logs/logs.js";
import { fnVoidAnyArguments, fnVoidNoArguments } from "../types/types.js";
import { validatorHelper } from "../helpers/helpers.js";
import { errorHandler } from "../errors/errors.js";

export class socketEventHandler {
  public static init(
    cParams: ICommonParams.commonParams,
    eventsMap: IEventsMap.eventsMap,
    namespace: string
  ) {
    try {
      //Peer Connected event
      validatorHelper.checkCommonParamsInterface(cParams);
      validatorHelper.checkNamespace(namespace);
      this.setReadyForConnections(namespace, cParams, eventsMap);
    } catch (error: unknown) {
      const method = this.init.name;
      errorHandler.propagateErrorEventHandler(this.name, error, method);
    }
  }

  public static registerPeerSocketEvents(
    cParams: ICommonParams.commonParams,
    socket: Socket,
    eventsMap: IEventsMap.eventsMap
  ) {
    try {
      validatorHelper.checkCommonParamsInterface(cParams);
      validatorHelper.checkSocket(socket);
      this.bindSocketEvents(cParams, socket, eventsMap);
    } catch (error: unknown) {
      const method = this.registerPeerSocketEvents.name;
      errorHandler.propagateErrorEventHandler(this.name, error, method);
    }
  }

  private static setReadyForConnections(
    namespace: string,
    cParams: ICommonParams.commonParams,
    evs: IEventsMap.eventsMap
  ) {
    try {
      validatorHelper.checkCommonParamsInterface(cParams);
      validatorHelper.checkNamespace(namespace);
      const io = cParams.io;
      console.log("EVENT NAMES START");
      console.log(io.eventNames());
      console.log("EVENT NAMES START");
      validatorHelper.checkIO(io);
      const con = constants.socketIO.events.CONNECT;
      const clbk = this.getCallBack(con, evs);

      if (clbk) {
        const evClbk: fnVoidAnyArguments = this.buildCallback(
          cParams,
          null,
          clbk
        );
        io.of(namespace).on(con, evClbk);
        logger.log(this.name, "readyForConnections! Namespace: " + namespace);
      } else {
        logger.log(
          this.name,
          "setReadyForConnections - ConnectCallBack not defined!!"
        );
      }
    } catch (error: unknown) {
      const method = this.setReadyForConnections.name;
      errorHandler.propagateErrorEventHandler(this.name, error, method);
    }
  }

  private static bindSocketEvents(
    cParams: ICommonParams.commonParams,
    socket: Socket,
    eventsCallbacks: IEventsMap.eventsMap
  ) {
    try {
      const evs: string[] = [];
      validatorHelper.checkCommonParamsInterface(cParams);
      validatorHelper.checkSocket(socket);
      eventsCallbacks.events.forEach((event) => {
        const callback = this.buildCallback(cParams, socket, event);
        socket.on(event.eventName, callback);
        evs.push(event.eventName);
      });
      logger.log(this.name, "Events Registered:  " + evs.toString());
    } catch (error: unknown) {
      const method = this.bindSocketEvents.name;
      errorHandler.propagateErrorEventHandler(this.name, error, method);
    }
  }

  private static buildCallback(
    cParams: ICommonParams.commonParams,
    mySocket: Socket | null = null,
    eventMap: IEventMap.eventMap
  ): fnVoidAnyArguments {
    let myCallback: fnVoidAnyArguments = this.getNotDefinedCallback();
    try {
      //const eventCallback = this.getCallBack(event, eventsMap);
      validatorHelper.checkCommonParamsInterface(cParams);

      const eventName = eventMap.eventName;
      const eventClback = eventMap.eventCallback;

      if (eventClback) {
        switch (eventName) {
          case constants.socketIO.events.CONNECT:
            myCallback = (data: unknown) => {
              eventClback(cParams, data);
            };
            break;

          default:
            if (mySocket) {
              myCallback = (data: unknown) => {
                logger.log(this.name, eventName, [mySocket.id, data]);
                eventClback(cParams, mySocket, data);
              };
            }
            break;
        }
      }
    } catch (error: unknown) {
      const method = this.buildCallback.name;
      errorHandler.propagateErrorEventHandler(this.name, error, method);
    }
    return myCallback;
  }

  private static getCallBack(
    eventName: string,
    eventsmap: IEventsMap.eventsMap
  ): IEventMap.eventMap | null {
    const callbackevent = eventsmap.events.find((eventmap) => {
      return eventmap.eventName === eventName;
    });
    return callbackevent ? callbackevent : null;
  }

  private static getNotDefinedCallback(): fnVoidNoArguments {
    const callback = () => {
      logger.log(this.name, "Call Back not defined");
    };
    return callback;
  }
}
