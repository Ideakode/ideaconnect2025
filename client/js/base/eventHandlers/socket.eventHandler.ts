/**
 * @file socket.eventHandler.ts
 * @class socketEventHandler
 *
 * @description
 * Registers Socket.IO event listeners on the peer's socket, mapping each event name to the
 * corresponding use case callback supplied in the eventsMap. Called once during peer
 * initialization (via socketService.initService) after the socket has been created and stored.
 *
 * @staticMethods
 * - registerEvents(cParams, evsMap)
 *     Entry point. Retrieves the socket from the store, then calls bindEvents.
 * - bindEvents(cParams, socket, evsMap)       [private]
 *     Iterates the eventsMap and registers each (eventName → callback) pair on the socket.
 * - buildCallback(cParams, evMap)             [private]
 *     Returns an appropriately-typed closure for the specific socket event:
 *     - CONNECT       — calls callback(cParams)
 *     - DISCONNECT    — calls callback(cParams, { reason, details })
 *     - CONNECT_ERROR — logs the error then calls callback(cParams, error)
 *     - default       — logs the data then calls callback(cParams, data)
 * - getNotDefinedCallback()                   [private]
 *     Returns a no-op closure used when no callback is defined for an event.
 *
 * @param cParams  - commonParams carrying the peer's store
 * @param evsMap   - eventsMap where each entry pairs an eventName with an eventCallback
 *
 * @see socketService.initService - creates the socket then calls this handler
 * @see IEventsMap / IEventMap    - (client/js/base/.../interfaces.ts) event map shape
 */
import { Socket } from "socket.io-client";
import { errorHandler } from "../errors/errors.js";
import {
  ICommonParams,
  IEventsMap,
  IEventMap,
} from "../interfaces/interfaces.js";
import * as constants from "../constants/constants.js";
import { parserHelper } from "../helpers/helpers.js";
import { store } from "../classes/classes.js";
import { logger } from "../logs/logs.js";
import { storeSvc } from "../services/services.js";
import { fnVoidAnyArguments, fnVoidNoArguments } from "../types/types.js";

export class socketEventHandler {
  public static registerEvents(
    cParams: ICommonParams.commonParams,
    evsMap: IEventsMap.eventsMap
  ) {
    try {
      const parser = parserHelper;
      const store = parser.parseStore(cParams.store) as store;
      const socket = storeSvc.getSocket(store);
      if (socket !== null) {
        //const clbks = this.getGeneralEventCallbacks(cParams, evMap);
        this.bindEvents(cParams, socket, evsMap);
      }
    } catch (error: unknown) {
      const method = this.registerEvents.name;
      errorHandler.propagateErrorEventHandler(this.name, error, method);
    }
  }

  private static bindEvents(
    cParams: ICommonParams.commonParams,
    socket: Socket,
    evsMap: IEventsMap.eventsMap
  ) {
    try {
      const registeredEvents: string[] = [];
      evsMap.events.forEach((evMap) => {
        const clback = this.buildCallback(cParams, evMap);
        socket.on(evMap.eventName, clback);
        registeredEvents.push(evMap.eventName);
      });
      logger.log(this.name, "Binded Events  | " + registeredEvents.toString());
    } catch (error: unknown) {
      const method = this.bindEvents.name;
      errorHandler.propagateErrorEventHandler(this.name, error, method);
    }
  }

  private static getNotDefinedCallback(): fnVoidNoArguments {
    const callback = () => {
      logger.log(this.name, "CallBack not defined");
    };
    return callback;
  }

  private static buildCallback(
    cParams: ICommonParams.commonParams,
    evMap: IEventMap.eventMap
  ): fnVoidAnyArguments {
    //const eventCallback = this.getCallBack(event, eventsMap);
    let myCallback: fnVoidAnyArguments = this.getNotDefinedCallback();
    const evName = evMap.eventName;
    const evClback = evMap.eventCallback;

    try {
      if (evClback) {
        switch (evName) {
          case constants.socketIO.events.CONNECT:
            myCallback = () => {
              evClback(cParams);
            };
            break;
          case constants.socketIO.events.DISCONNECT:
            myCallback = (reason: unknown, details: unknown) => {
              const data = { reason, details };
              evClback(cParams, data);
            };
            break;
          case constants.socketIO.events.CONNECT_ERROR:
            myCallback = (error: unknown) => {
              logger.log(this.name, "Socket Error | ", [error]);
              evClback(cParams, error);
            };
            break;

          default:
            myCallback = (data: unknown) => {
              logger.log(this.name, evName, [data]);
              evClback(cParams, data);
            };
            break;
        }
      }
    } catch (error: unknown) {
      const method = this.buildCallback.name;
      errorHandler.propagateErrorEventHandler(this.name, error, method);
    }
    return myCallback;
  }
}
